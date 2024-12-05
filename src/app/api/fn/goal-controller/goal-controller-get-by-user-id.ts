/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GoalListDto } from '../../models/goal-list-dto';
import { SearchFieldValue } from '../../models/search-field-value';

<<<<<<<< HEAD:src/app/api/fn/goal-controller/goal-controller-get-by-user-id.ts
export interface GoalControllerGetByUserId$Params {

/**
 * Id do usuario
 */
  id: number;
}

export function goalControllerGetByUserId(http: HttpClient, rootUrl: string, params: GoalControllerGetByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GoalListDto>>> {
  const rb = new RequestBuilder(rootUrl, goalControllerGetByUserId.PATH, 'get');
========
export interface GoalControllerSearchFieldsAction$Params {
      body: Array<SearchFieldValue>
}

export function goalControllerSearchFieldsAction(http: HttpClient, rootUrl: string, params: GoalControllerSearchFieldsAction$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<GoalListDto>>> {
  const rb = new RequestBuilder(rootUrl, goalControllerSearchFieldsAction.PATH, 'post');
>>>>>>>> branch-jonathan-final:src/app/api/fn/goal-controller/goal-controller-search-fields-action.ts
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<GoalListDto>>;
    })
  );
}

<<<<<<<< HEAD:src/app/api/fn/goal-controller/goal-controller-get-by-user-id.ts
goalControllerGetByUserId.PATH = '/v1/goals/user/{id}';
========
goalControllerSearchFieldsAction.PATH = '/v1/goals/search-fields';
>>>>>>>> branch-jonathan-final:src/app/api/fn/goal-controller/goal-controller-search-fields-action.ts
