/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CategoryDto } from '../models/category-dto';
import { create2 } from '../fn/category-controller/create-2';
import { Create2$Params } from '../fn/category-controller/create-2';
import { deleteItems2 } from '../fn/category-controller/delete-items-2';
import { DeleteItems2$Params } from '../fn/category-controller/delete-items-2';
import { getById2 } from '../fn/category-controller/get-by-id-2';
import { GetById2$Params } from '../fn/category-controller/get-by-id-2';
import { getExpenseCategories } from '../fn/category-controller/get-expense-categories';
import { GetExpenseCategories$Params } from '../fn/category-controller/get-expense-categories';
import { getIncomeCategories } from '../fn/category-controller/get-income-categories';
import { GetIncomeCategories$Params } from '../fn/category-controller/get-income-categories';
import { listAll2 } from '../fn/category-controller/list-all-2';
import { ListAll2$Params } from '../fn/category-controller/list-all-2';
import { remove2 } from '../fn/category-controller/remove-2';
import { Remove2$Params } from '../fn/category-controller/remove-2';
import { update2 } from '../fn/category-controller/update-2';
import { Update2$Params } from '../fn/category-controller/update-2';

@Injectable({ providedIn: 'root' })
export class CategoryControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getById2()` */
  static readonly GetById2Path = '/1.0/categories/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById2$Response(params: GetById2$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return getById2(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById2(params: GetById2$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.getById2$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `update2()` */
  static readonly Update2Path = '/1.0/categories/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2$Response(params: Update2$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return update2(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2(params: Update2$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.update2$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `remove2()` */
  static readonly Remove2Path = '/1.0/categories/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remove2()` instead.
   *
   * This method doesn't expect any request body.
   */
  remove2$Response(params: Remove2$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return remove2(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remove2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remove2(params: Remove2$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.remove2$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `listAll2()` */
  static readonly ListAll2Path = '/1.0/categories';

  /**
   * lista todos modelos
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll2$Response(params?: ListAll2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    return listAll2(this.http, this.rootUrl, params, context);
  }

  /**
   * lista todos modelos
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll2(params?: ListAll2$Params, context?: HttpContext): Observable<Array<CategoryDto>> {
    return this.listAll2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body)
    );
  }

  /** Path part for operation `create2()` */
  static readonly Create2Path = '/1.0/categories';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create2$Response(params: Create2$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return create2(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create2(params: Create2$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.create2$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `getIncomeCategories()` */
  static readonly GetIncomeCategoriesPath = '/1.0/categories/incomes';

  /**
   * End point para listar todas as categorias de receitas
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncomeCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncomeCategories$Response(params?: GetIncomeCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    return getIncomeCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * End point para listar todas as categorias de receitas
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getIncomeCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncomeCategories(params?: GetIncomeCategories$Params, context?: HttpContext): Observable<Array<CategoryDto>> {
    return this.getIncomeCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body)
    );
  }

  /** Path part for operation `getExpenseCategories()` */
  static readonly GetExpenseCategoriesPath = '/1.0/categories/expenses';

  /**
   * End point para listar todas as categorias de despesas
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getExpenseCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExpenseCategories$Response(params?: GetExpenseCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    return getExpenseCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * End point para listar todas as categorias de despesas
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getExpenseCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getExpenseCategories(params?: GetExpenseCategories$Params, context?: HttpContext): Observable<Array<CategoryDto>> {
    return this.getExpenseCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body)
    );
  }

  /** Path part for operation `deleteItems2()` */
  static readonly DeleteItems2Path = '/1.0/categories/';

  /**
   * Método utilizado para remover varias entidades pelos ids informados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteItems2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteItems2$Response(params: DeleteItems2$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    return deleteItems2(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover varias entidades pelos ids informados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteItems2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  deleteItems2(params: DeleteItems2$Params, context?: HttpContext): Observable<Array<CategoryDto>> {
    return this.deleteItems2$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body)
    );
  }

}
