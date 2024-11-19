import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CrudAction} from "./curd-action";
import {ChangeDetectorRef, inject, NgModule, OnDestroy, OnInit} from "@angular/core";
import {CrudActionService} from "./crud-action.service";
import {Subscription} from "rxjs";
import {MessageService} from "../message/message.service";
import {ErrorService} from "../error.service";


@NgModule()
export abstract class BaseComponent<MODEL> implements OnInit, OnDestroy {
  public crudAction: CrudAction;
  public pkValue!: any;
  private _baseURL!: string;

  /** retorna o modelo após estrair do formGroup
   *
   */
  get model(): MODEL{
    return this.formGroup.value as MODEL;
  }

  set model(modelValue: MODEL){
    this.setUserData(modelValue);
  }

  protected PAGINATOR_PAGE_SIZE = 10;

  //public formGroup!: FormGroup;
  public get baseURL(){
    return this._baseURL;
  };

  private navigationSubscription: Subscription;

  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected router: Router = inject(Router);
  protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  protected crudActionService: CrudActionService = inject(CrudActionService);
  protected messageService: MessageService = inject(MessageService);
  protected errorService: ErrorService = inject(ErrorService);
  protected formBuilder: FormBuilder = inject(FormBuilder);

  protected constructor(
  ) {
    this._baseURL = this.getBaseURL();
    this.crudAction = new CrudAction(this.route);
    this.crudActionService.onListChange.subscribe(value => {
      this.crudAction.setAction(this.route);
      this.changeDetector.detectChanges();
    });
    this.navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.crudAction.setAction(this.route);
      }
    });

  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.crudAction.setAction(this.route);
    this.crudActionService.onListChange.emit(this.crudAction);
  }

  public formGroup!: FormGroup;

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  public handleErrorForm = (form: FormGroup, controlName: string, errorName: string) => {
    return form.controls[controlName].hasError(errorName);
  }

  public parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day); // Meses no Date são 0-indexados
  }

  cancelar() {
    let confirmed = false;

    if (this.crudAction.isActionView() || !this.formGroup.touched) {
      this.router.navigateByUrl(this.baseURL);
      confirmed = true;
    }

    if (!confirmed) {
      this.messageService.addConfirmYesNo('Confirmar operação?', () => {
        this.router.navigateByUrl(this.baseURL);
      });
    }
  }

  /**
   * Atualiza o FormGroup com os dados do usuário.
   * @param modelValue Dados do usuário.
   */
  setUserData(modelValue: MODEL): void {
    this.formGroup.patchValue(modelValue as {key: string});
    this.setFormCustomFields(modelValue);

    this.changeDetector.detectChanges();
  }

  /**
   * Método utilizado para configurar campos drante a definião do this.model
   * @param modelDto
   * @protected
   */
  protected abstract setFormCustomFields(modelDto: MODEL): void;

  /**
   * deve retonar a url base do caso de uso.
   */
  abstract getBaseURL(): string;

}
