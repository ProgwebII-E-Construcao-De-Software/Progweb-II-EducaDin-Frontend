/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExpenseListDto } from '../../models/expense-list-dto';

export interface ExpenseControllerListAll$Params {
}

export function expenseControllerListAll(http: HttpClient, rootUrl: string, params?: ExpenseControllerListAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExpenseListDto>>> {
  const rb = new RequestBuilder(rootUrl, expenseControllerListAll.PATH, 'get');
  console.log("entrou aqui ",params)
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExpenseListDto>>;
    })
  );
}

expenseControllerListAll.PATH = '/1.0/expenses';
