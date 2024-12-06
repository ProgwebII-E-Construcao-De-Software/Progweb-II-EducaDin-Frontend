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
import { getByUserId } from '../fn/category-controller/get-by-user-id';
import { GetByUserId$Params } from '../fn/category-controller/get-by-user-id';
import { getExpenseCategories } from '../fn/category-controller/get-expense-categories';
import { GetExpenseCategories$Params } from '../fn/category-controller/get-expense-categories';
import { getIncomeCategories } from '../fn/category-controller/get-income-categories';
import { GetIncomeCategories$Params } from '../fn/category-controller/get-income-categories';

@Injectable({ providedIn: 'root' })
export class CategoryControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getByUserId()` */
  static readonly GetByUserIdPath = '/v1/categories/user/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id do usuario informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUserId$Response(params: GetByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
    return getByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * Obter os dados completos de uma entidiade pelo id do usuario informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUserId(params: GetByUserId$Params, context?: HttpContext): Observable<Array<CategoryDto>> {
    return this.getByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryDto>>): Array<CategoryDto> => r.body)
    );
  }

  /** Path part for operation `getIncomeCategories()` */
  static readonly GetIncomeCategoriesPath = '/v1/categories/incomes';

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
  static readonly GetExpenseCategoriesPath = '/v1/categories/expenses';

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
