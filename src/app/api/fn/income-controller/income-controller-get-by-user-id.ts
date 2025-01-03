/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IncomeListDto } from '../../models/income-list-dto';

export interface IncomeControllerGetByUserId$Params {

/**
 * Id do usuario
 */
  id: number;
}

export function incomeControllerGetByUserId(http: HttpClient, rootUrl: string, params: IncomeControllerGetByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IncomeListDto>>> {
  const rb = new RequestBuilder(rootUrl, incomeControllerGetByUserId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<IncomeListDto>>;
    })
  );
}

incomeControllerGetByUserId.PATH = '/v1/incomes/user/{id}';
