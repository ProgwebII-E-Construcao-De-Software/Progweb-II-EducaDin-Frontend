import {AfterViewInit, NgModule} from "@angular/core";
import {merge, Observable, of, startWith, switchMap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {BaseComponent} from "./base.component";
import {GenericDto} from "../../api/models/generic-dto";
import {HttpContext} from "@angular/common/http";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PageDto} from "./page-dto";
import {Pageable} from "../../api/models/pageable";
import {catchError, map} from "rxjs/operators";
import {SearchFieldValue} from "../../api/models/search-field-value";

export type BaseListComponentConfig<MODEL extends GenericDto> = {
  ENTITY_NAME_LABEL: string;
  UPDATE_ROLE: string,
  DELETE_ROLE: string,
  METHOD_LIST?: () => Observable<MODEL[]>,
  METHOD_LIST_PAGED?: (params: {page: Pageable}, context?: HttpContext) => Observable<PageDto<MODEL>>,
  METHOD_REMOVE: (params: { id: number }, context?: HttpContext) => Observable<MODEL>,
  USE_EXTERNAL_SOURCE?: boolean
};

@NgModule()
export abstract class BaseListComponent<MODEL extends GenericDto> extends BaseComponent<MODEL> implements AfterViewInit {

  dataSource: MatTableDataSource<MODEL> = new MatTableDataSource<MODEL>([]);

  public HAS_PERMISSION_UPDATE: boolean;
  public HAS_PERMISSION_DELETE: boolean;

  protected _entityNameLabel: string;
  protected _listMethod?: () => Observable<MODEL[]>;
  protected _listMethodPage?:  (params: {page: Pageable}, context?: HttpContext) => Observable<PageDto<MODEL>>;
  protected _removeMethod: (params: { id: number }, context?: HttpContext) => Observable<MODEL>;

  public setListMethodPage(method: (params: {page: Pageable}, context?: HttpContext) => Observable<PageDto<MODEL>>){
    this._listMethodPage = method ;
  }
  public setListMethod(method: () => Observable<MODEL[]>){
    this._listMethod = method;
  }

  abstract getComponentConfigs(): BaseListComponentConfig<MODEL>;


  protected _useBackendPagination: boolean = false;
  protected _useExternalSource: boolean = false;
  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];

  public abstract paginator: MatPaginator;

  public abstract tableSort: MatSort;


  ngAfterViewInit() {

    if(this.paginator == undefined){
      console.warn("Caso deseje utilizar paginação: Declare o atributo paginator na classe filha com  '@ViewChild(MatPaginator) paginator!: MatPaginator;'")
    }else{
      this.dataSource.paginator = this.paginator;
      this.initObservablePageGetData();
    }

    if(this.tableSort){
      this.dataSource.sort = this.tableSort;
    }else{
      console.warn("Caso deseje utilizar ordenação: Declare o atributo tableSort na classe filha com  '@ViewChild(MatSort) tableSort!: MatSort;'")
    }
  }

  showResult($event: any[]) {
    this.confDataResult($event);
  }

  pageChanged(event: PageEvent) {
    if(event){
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
    }
  }

  protected constructor(
  ) {
    super();
    let componentConfigs = this.getComponentConfigs();
    this._entityNameLabel = componentConfigs.ENTITY_NAME_LABEL;
    this.HAS_PERMISSION_DELETE = this.securityService.hasRoles(componentConfigs.DELETE_ROLE);
    this.HAS_PERMISSION_UPDATE = this.securityService.hasRoles(componentConfigs.UPDATE_ROLE);
    this._removeMethod = componentConfigs.METHOD_REMOVE;
    this._listMethod = componentConfigs.METHOD_LIST;
    this._listMethodPage = componentConfigs.METHOD_LIST_PAGED;
    this._useExternalSource = componentConfigs.USE_EXTERNAL_SOURCE ?? false;
    if(this._listMethodPage == undefined && this._listMethod == undefined && !this._useExternalSource){
      throw "Defina nas configurações do componente METHOD_LIST_PAGED ou METHOD_LIST ou USE_EXTERNAL_SOURCE=true";
    }
    if(this._listMethodPage != undefined){
      this._useBackendPagination = true;
    }
  }

  override ngOnInit() {
    super.ngOnInit();
    this.getData();
  }

  confirmDelete(categoryDto: MODEL) {
    this.messageService.addConfirmYesNo(`Confirmar a exclusão da ${this._entityNameLabel}?`,() => {
      this.remover(categoryDto);
    });
  }

  remover(model: MODEL) {
    this.removeModel(model)
      .subscribe({next: returnValue => {
          this.getData();
          this.messageService.addMsgSuccess(`${this._entityNameLabel} excluída com sucesso!!!`);
        }, error: error =>{
          if (error.status === 404) {
            this.messageService.addMsgInf(`${this._entityNameLabel} não existe mais.`);
          } else {
            this.messageService.addMsgDanger("Erro ao excluir: "+error.message);
          }
        }
      });
  }

  removeModel(model: MODEL):Observable<MODEL>{
    let id = model.id || 0;
    return this._removeMethod({id: id})
  };

  protected getData() {
    if(this._useExternalSource) { return; };
    this.getModelData().subscribe(data => {
      this.confDataResult(data || [])
    });
  }

  public getModelData():Observable<MODEL[]>{
    if(!this._useBackendPagination){
      if(this._listMethod != undefined){
        return this._listMethod();
      }
    }else{
      this.paginator.page.emit();
    }

    return of([]);
  }

  private confDataResult(data: any[] ) {

    this.totalRows = data?.length || 0;
    this.currentPage = 0;
    this.dataSource = new MatTableDataSource<MODEL>(data);
    this.dataSource.paginator = this.paginator;
    if(this.paginator){
      this.paginator.length = this.totalRows;
    }

    if(this.tableSort){
      this.dataSource.sort = this.tableSort;
      this.tableSort.disableClear = true;
    }
  }

  protected initObservablePageGetData() {
    if(this._listMethodPage != undefined){
      merge(this.paginator.page, this.tableSort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => {
            if(this._listMethodPage!=undefined && this._useBackendPagination){
              let sortData = this.tableSort?.active ? [this.tableSort.active,this.tableSort.direction ] : undefined;
              return this._listMethodPage({
                page: {
                  page: this.paginator.pageIndex,
                  size: this.paginator.pageSize,
                  sort: sortData
                },
              })
                .pipe(catchError(() => of(null)));
            }
            return of(null);
          }),
          map((data) => {
            if (data == null ) return [];

            this.totalRows = data.totalElements || 0;
            this.pageSize = data.size || 0;

            return data?.content;
          })
        )
        .subscribe((data) => {
          this.dataSource = new MatTableDataSource<MODEL>(data);
        });
    }

  }
}
