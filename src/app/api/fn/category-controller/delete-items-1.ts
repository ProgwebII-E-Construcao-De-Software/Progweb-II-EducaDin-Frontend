/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryDto } from '../../models/category-dto';

export interface DeleteItems1$Params {
      body: Array<number>
}

export function deleteItems1(http: HttpClient, rootUrl: string, params: DeleteItems1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryDto>>> {
  const rb = new RequestBuilder(rootUrl, deleteItems1.PATH, 'delete');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CategoryDto>>;
    })
  );
}

deleteItems1.PATH = '/1.0/categories/';
