/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageGoalListDto } from '../../models/page-goal-list-dto';
import { SearchFieldValue } from '../../models/search-field-value';

export interface GoalControllerSearchFieldsActionPage_1$Params {
  page?: number;
  size?: number;
  sort?: Array<string>;

/**
 * Id do usuario
 */
  id: number;
      body: Array<SearchFieldValue>
}

export function goalControllerSearchFieldsActionPage_1(http: HttpClient, rootUrl: string, params: GoalControllerSearchFieldsActionPage_1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageGoalListDto>> {
  const rb = new RequestBuilder(rootUrl, goalControllerSearchFieldsActionPage_1.PATH, 'post');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('sort', params.sort, {});
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageGoalListDto>;
    })
  );
}

goalControllerSearchFieldsActionPage_1.PATH = '/v1/goals/search-fields/page/user/{id}';
