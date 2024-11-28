import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpResponseModel } from '../api-modules/signUpResponse.model';
import { Observable } from 'rxjs';
import { SignUpRequestModel } from '../api-modules/signUpRequest.model';
import { apiRoutes } from '../api-routes/api-routes';
import { ForgetPasswordRequestModel } from '../api-modules/forgetPasswordRequest.model';
import { SendOtpRequestModel } from '../api-modules/sentotpRequest.mode';
import { VerifyEmailRequestModel } from '../api-modules/verifyEmailResponse.modal';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  registrationPostApi(signUpResponseModel: SignUpRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.SignUp}`, signUpResponseModel)
  }

  sendOtpPostApi(sendOtpRequestModel: SendOtpRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.sendOtp}`, sendOtpRequestModel)
  }

  verifyEmailPostApi(verifyEmailRequestModel: VerifyEmailRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.verifyEmail}`, verifyEmailRequestModel)
  }

  forgetPasswordPostApi(forgetPasswordResponseModel: ForgetPasswordRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.ForgetPassword}`, forgetPasswordResponseModel)
  }



}
