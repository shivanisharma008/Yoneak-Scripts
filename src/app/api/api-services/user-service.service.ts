import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpResponseModel } from '../api-modules/signUpResponse.model';
import { Observable } from 'rxjs';
import { SignUpRequestModel } from '../api-modules/signUpRequest.model';
import { apiRoutes } from '../api-routes/api-routes';
import { LoginRequestModel } from '../api-modules/loginRequest.mode';
import { ForgetPasswordRequestModel } from '../api-modules/forgetPasswordRequest.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  registrationPostApi(signUpResponseModel: SignUpRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.SignUp}`, signUpResponseModel)
  }

  loginPostApi(loginResponseModel: LoginRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.Login}`, loginResponseModel)
  }

  forgetPasswordPostApi(forgetPasswordResponseModel: ForgetPasswordRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.ForgetPassword}`, forgetPasswordResponseModel)
  }



}
