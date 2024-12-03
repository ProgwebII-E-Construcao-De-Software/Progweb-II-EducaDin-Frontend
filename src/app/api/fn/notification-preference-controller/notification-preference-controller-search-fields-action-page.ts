/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageNotificationPreferenceDto } from '../../models/page-notification-preference-dto';
import { SearchFieldValue } from '../../models/search-field-value';

export interface NotificationPreferenceControllerSearchFieldsActionPage$Params {
  page?: number;
  size?: number;
  sort?: Array<string>;
      body: Array<SearchFieldValue>
}

export function notificationPreferenceControllerSearchFieldsActionPage(http: HttpClient, rootUrl: string, params: NotificationPreferenceControllerSearchFieldsActionPage$Params, context?: HttpContext): Observable<StrictHttpResponse<PageNotificationPreferenceDto>> {
  const rb = new RequestBuilder(rootUrl, notificationPreferenceControllerSearchFieldsActionPage.PATH, 'post');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sort', params.sort, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageNotificationPreferenceDto>;
    })
  );
}

notificationPreferenceControllerSearchFieldsActionPage.PATH = '/1.0/notification-preferences/search-fields/page';
