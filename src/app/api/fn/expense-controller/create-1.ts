/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExpenseDto } from '../../models/expense-dto';
import { ExpenseDtoCreateUpdate } from '../../models/expense-dto-create-update';

export interface Create1$Params {
      body: ExpenseDtoCreateUpdate
}

export function create1(http: HttpClient, rootUrl: string, params: Create1$Params, context?: HttpContext): Observable<StrictHttpResponse<ExpenseDto>> {
  const rb = new RequestBuilder(rootUrl, create1.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ExpenseDto>;
    })
  );
}

create1.PATH = '/1.0/expenses';
