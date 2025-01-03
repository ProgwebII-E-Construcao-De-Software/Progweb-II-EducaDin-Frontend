/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TipDto } from '../../models/tip-dto';

export interface GetRandomTipByType$Params {
  type: string;
  userId: number;
}

export function getRandomTipByType(http: HttpClient, rootUrl: string, params: GetRandomTipByType$Params, context?: HttpContext): Observable<StrictHttpResponse<TipDto>> {
  const rb = new RequestBuilder(rootUrl, getRandomTipByType.PATH, 'get');
  if (params) {
    rb.path('type', params.type, {});
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TipDto>;
    })
  );
}

getRandomTipByType.PATH = '/v1/tips/{type}';
