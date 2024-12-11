import { Injectable } from '@angular/core';

import { AuthDto} from "../../api/models/auth-dto";
import {AuthApiService} from '../../api/services/auth-api.service'
import {Observable} from "rxjs";
import {CredencialDto} from "../../api/models/credencial-dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authService: AuthApiService) {
  }

  public login(authDto: AuthDto): Observable<CredencialDto> {
    return this.authService.login({body: authDto});
  }

  public refresh(refreshToken: string): Observable<any> {
    return this.authService.refresh({refreshToken});
  }

}
