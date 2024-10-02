/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryDto } from '../../models/category-dto';

export interface GetExpenseCategories$Params {
}

export function getExpenseCategories(http: HttpClient, rootUrl: string, params?: GetExpenseCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
  const rb = new RequestBuilder(rootUrl, getExpenseCategories.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CategoryDto>>;
    })
  );
}

getExpenseCategories.PATH = '/1.0/categories/expenses';