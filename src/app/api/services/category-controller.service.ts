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
import { create1 } from '../fn/category-controller/create-1';
import { Create1$Params } from '../fn/category-controller/create-1';
import { getById1 } from '../fn/category-controller/get-by-id-1';
import { GetById1$Params } from '../fn/category-controller/get-by-id-1';
import { getExpenseCategories } from '../fn/category-controller/get-expense-categories';
import { GetExpenseCategories$Params } from '../fn/category-controller/get-expense-categories';
import { getIncomeCategories } from '../fn/category-controller/get-income-categories';
import { GetIncomeCategories$Params } from '../fn/category-controller/get-income-categories';
import { listAll1 } from '../fn/category-controller/list-all-1';
import { ListAll1$Params } from '../fn/category-controller/list-all-1';
import { remove1 } from '../fn/category-controller/remove-1';
import { Remove1$Params } from '../fn/category-controller/remove-1';
import { update1 } from '../fn/category-controller/update-1';
import { Update1$Params } from '../fn/category-controller/update-1';

@Injectable({ providedIn: 'root' })
export class CategoryControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getById1()` */
  static readonly GetById1Path = '/1.0/categories/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1$Response(params: GetById1$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return getById1(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1(params: GetById1$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.getById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `update1()` */
  static readonly Update1Path = '/1.0/categories/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1$Response(params: Update1$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return update1(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1(params: Update1$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.update1$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `remove1()` */
  static readonly Remove1Path = '/1.0/categories/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remove1()` instead.
   *
   * This method doesn't expect any request body.
   */
  remove1$Response(params: Remove1$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return remove1(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `remove1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remove1(params: Remove1$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.remove1$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryDto>): CategoryDto => r.body)
    );
  }

  /** Path part for operation `listAll1()` */
  static readonly ListAll1Path = '/1.0/categories';

  /**
   * lista todos modelos
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll1$Response(params?: ListAll1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    return listAll1(this.http, this.rootUrl, params, context);
  }

  /**
   * lista todos modelos
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll1(params?: ListAll1$Params, context?: HttpContext): Observable<Array<CategoryDto>> {
    return this.listAll1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body)
    );
  }

  /** Path part for operation `create1()` */
  static readonly Create1Path = '/1.0/categories';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create1$Response(params: Create1$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryDto>> {
    return create1(this.http, this.rootUrl, params, context);
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create1(params: Create1$Params, context?: HttpContext): Observable<CategoryDto> {
    return this.create1$Response(params, context).pipe(
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

}
