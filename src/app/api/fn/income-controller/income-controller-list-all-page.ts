/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageIncomeListDto } from '../../models/page-income-list-dto';

export interface IncomeControllerListAllPage$Params {
  page: Pageable;
}

export function incomeControllerListAllPage(http: HttpClient, rootUrl: string, params: IncomeControllerListAllPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageIncomeListDto>> {
  const rb = new RequestBuilder(rootUrl, incomeControllerListAllPage.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageIncomeListDto>;
    })
  );
}

incomeControllerListAllPage.PATH = '/v1/incomes/page';