import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, merge, Observable, of, startWith, switchMap} from "rxjs";
import {SearchType, SearchTypeKey} from "../shared/search-type";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MessageService} from "../../message/message.service";
import {catchError, map} from "rxjs/operators";
import {SearchFieldValue} from "../../../api/models/search-field-value";
import {SearchField} from "../../../api/models/search-field";
import {ISearchFieldDataObject} from "../../../api/models/i-search-field-data-object";
import {MatPaginator} from "@angular/material/paginator";
import {HttpContext} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";


@Component({
    selector: 'app-search-component',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit, OnInit {

    @Input() controller: any;
    @Input() doSearch: boolean = true;
    @Input() paginator?: MatPaginator;
    @Input() matSort?: MatSort;
    @Output()
    onSearchResult: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output()
    onSearchClick: EventEmitter<SearchFieldValue[]> = new EventEmitter<SearchFieldValue[]>();
    innerWidth: number = window.innerWidth;
    flexDivAlinhar: string = 'row';
    enum!: [string, string][];


    searchFieldsActionMethod!: (params: { body: Array<SearchFieldValue> }, context?: HttpContext)
        => Observable<any>;

    searchFieldsListMethod!: (params: {}) => Observable<any>;

    searchFieldsActionPageMethod!: (params: {
        page?: number;
        size?: number;
        sort?: Array<string>;
        body: Array<SearchFieldValue>
    }, context?: HttpContext) => Observable<any>;

    formGroup!: FormGroup;

    searchFieldsParamters: SearchField[] = [];

    /*searchValue: string = '';
    searchParameter!: SearchField;
    searchConditionKey!: SearchTypeKey;*/
    searchParameterFiltered!: Observable<Array<ISearchFieldDataObject>>;


    searchConditionKeys: SearchTypeKey[] = Object.keys(SearchType).map((value: string) => value as SearchTypeKey);

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private _adapter: DateAdapter<any>,
        private dialog: MatDialog,
        private messageService: MessageService
    ) {
        this.createForm();
        this._adapter.setLocale('pt-br');
    }

    createForm() {
        this.formGroup = this.formBuilder.group({
            searchValue: [null, [Validators.required]],
            searchParameter: [null, Validators.required],
            searchConditionKey: ['EQUAL', Validators.required],
        });
        this.formGroup.controls['searchParameter'].valueChanges.subscribe(value => {
            this.cleanSearch();
        });
    }

    public handleError = (controlName: string, errorName: string) => {
        return this.formGroup.controls[controlName].hasError(errorName);
    }


    search() {
        if (!this.formGroup.valid) return;
        let searchValues = this.getSearchValueBody();
        this.onSearchClick.emit(searchValues);
        if (this.doSearch) {
            if (this.paginator == undefined) {
                this.searchFieldsActionMethod({body: searchValues})
                    .subscribe({
                        next: value => {
                            this.onSearchResult.emit(value);
                        },
                        error: () => this.onSearchResult.emit([])
                    });
            } else {
                this.initObservablePageGetData(false);
            }

        }
    }

    private getFieldSearchValue() {
        return this.formGroup.controls['searchValue'].value;
    }

    private getFieldSearchConditionKey() {
        return this.formGroup.controls['searchConditionKey'].value;
    }

    private getFieldSearchParameter() {
        return this.formGroup.controls['searchParameter'].value;
    }

    ngOnInit(): void {
        this.searchParameterFiltered = this.formGroup.controls['searchValue'].valueChanges.pipe(
            startWith(''),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(value => {
                const name = typeof value === 'string' ? value : value?.searchDescription;
                if (this.getFieldSearchParameter().autoComplete == true) {
                    return name ? this._filterService(name as string) : of([]);
                } else {
                    return name ? of(this._filter(name as string)) : of(this.getFieldSearchParameter()?.valueList?.slice());
                }
            }),
        );
    }

    private _filter(value: string): Array<ISearchFieldDataObject> {
        const filterValue = value.toLowerCase();
        return this.getFieldSearchParameter()?.valueList.filter((option: ISearchFieldDataObject) => option.searchDescription?.toLowerCase().includes(filterValue));
    }

    private _filterService(value: string): Observable<Array<ISearchFieldDataObject>> {
        const filterValue = value.toLowerCase();
        if (!this.formGroup.valid || !filterValue || filterValue.length < 3) return of([]);
        return this.searchFieldsActionMethod({
                body: [
                    {
                        name: this.getFieldSearchParameter().name,
                        searchType: 'BEGINS_WITH',
                        type: this.getFieldSearchParameter().type,
                        value: filterValue
                    }]
            }
        ).pipe(
            map(response => {
                    const result = response.map((value1: any) => {
                        return {
                            id: value1[this.getFieldSearchParameter().name],
                            searchDescription: value1[this.getFieldSearchParameter().name]
                        } as ISearchFieldDataObject
                    });
                    return result;
                }
            ), catchError((err, cauth) => {
                return of([]);
            })
        )
    }

    ngAfterViewInit(): void {
        this.initSearchMethods();
        this.initSearchFieldsParameters();
    }

    private initSearchFieldsParameters() {
        this.searchFieldsListMethod({}).subscribe(value => {
            this.searchFieldsParamters = value;
            this.formGroup.patchValue({searchParameter: this.searchFieldsParamters[0], searchConditionKey: "EQUAL"});
            //this.searchConditionKey = "EQUAL";
        });
    }

    private initSearchMethods() {
        let allMethodNames = this.getAllMethodNames(this.controller);
        allMethodNames.forEach((method: any) => {
            if (method.endsWith('SearchFieldsAction')) {
                this.configureSearchFieldAction(method);
            }
            if (method.endsWith('SearchFieldsList')) {
                this.configureSearchFieldsList(method);
            }
            if (method.endsWith('SearchFieldsActionPage')) {
                this.configureSearchFieldActionPage(method);
            }
        });
    }

    private configureSearchFieldsList(method: any) {
        this.searchFieldsListMethod = (params: {}): Observable<any> => {
            return this.controller[method](params);
        }
    }

    private configureSearchFieldAction(method: any) {
        this.searchFieldsActionMethod = (params: {
            body: Array<SearchFieldValue>
        }): Observable<any> => {
            return this.controller[method](params);
        }
    }

    private configureSearchFieldActionPage(method: any) {
        this.searchFieldsActionPageMethod = (params: {
            page?: number;
            size?: number;
            sort?: Array<string>;
            body: Array<SearchFieldValue>
        }, context?: HttpContext): Observable<any> => {
            return this.controller[method](params, context);
        }
    }

    getAllMethodNames(obj: any) {
        let methods = new Set();
        while (obj = Reflect.getPrototypeOf(obj)) {
            let keys = Reflect.ownKeys(obj)
            keys.forEach((k: any) => methods.add(k));
        }
        return methods;
    }

    protected readonly SearchType = SearchType;

    get showFieldSearch(): boolean {
        let b = (!!this.formGroup.controls['searchParameter']?.value?.valueList) || this.getFieldSearchParameter()?.autoComplete == true;
        return b
    };

    searchAll() {
        if (this.paginator == undefined) {
            this.callSearchAll();
        } else {
            this.callSearchAllPage();
        }
    }

    private callSearchAll() {
        this.searchFieldsActionMethod({body: this.getSearchAllBody()})
            .subscribe({
                next: value => {
                    this.onSearchResult.emit(value);
                },
                error: () => this.onSearchResult.emit([])
            });
    }

    private callSearchAllPage() {
        this.initObservablePageGetData(true);
    }

    private getSearchAllBody(): Array<SearchFieldValue> {
        return [
            {
                name: this.searchFieldsParamters[0].name,
                searchType: 'ALL',
                type: this.searchFieldsParamters[0].type,
                value: 'ALL'
            } as SearchFieldValue];
    }

    private getSearchValueBody() {
        let fieldSearchValue = this.getFieldSearchValue();
        fieldSearchValue = typeof fieldSearchValue === 'string' ? fieldSearchValue : fieldSearchValue.id;
        let searchValues = [
            {
                name: this.getFieldSearchParameter().name,
                searchType: this.getFieldSearchConditionKey(),
                type: this.getFieldSearchParameter().type,
                value: fieldSearchValue
            }];
        return searchValues;
    }

    cleanSearch() {
        console.log("change, clean");
        let searchConditionKey: SearchTypeKey = this.getFieldSearchConditionKey();
        if (this.showFieldSearch) {
            searchConditionKey = "EQUAL";
        }
        this.formGroup.patchValue({searchValue: '', searchConditionKey: searchConditionKey});
    }

    getSearchValueDescription(option: ISearchFieldDataObject | null): string {
        console.log(option);
        return option ? option.searchDescription || '' : '';
    }

    protected initObservablePageGetData(allRecord: boolean) {
        if (this.searchFieldsActionPageMethod != undefined && this.paginator) {
            console.log("matSort:", this.matSort);
            let localMatSort = this.matSort ?? new MatSort();
            merge(this.paginator.page, localMatSort.sortChange)
                .pipe(
                    startWith({}),
                    switchMap(() => {
                        if (this.searchFieldsActionPageMethod != undefined && this.doSearch) {
                            let sortData = this.matSort?.active ? [this.matSort.active, this.matSort.direction] : undefined;
                            console.log("SortData:", sortData);
                            return this.searchFieldsActionPageMethod({
                                page: this.paginator?.pageIndex,
                                size: this.paginator?.pageSize,
                                sort: sortData,
                                body: allRecord ? this.getSearchAllBody() : this.getSearchValueBody()
                            })
                                .pipe(catchError(() => of(null)));
                        }
                        return of(null);
                    }),
                    map((data) => {
                        if (data == null) return [];
                        console.log("Data search: ", data);
                        if (this.paginator) {
                            this.paginator.length = data.totalElements || 0;
                            this.paginator.pageSize = data.size || 0;
                        }

                        return data?.content;
                    })
                )
                .subscribe((data) => {
                    this.onSearchResult.emit(data);
                });
        }

    }

    mudarAlinhar() {

        if (this.innerWidth < 1100) {
            return this.flexDivAlinhar = "column";
        }
        return this.flexDivAlinhar = "row";

    }

}
