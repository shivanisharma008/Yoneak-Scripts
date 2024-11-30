import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpResponseModel } from '../api-modules/signUpResponse.model';
import { Observable } from 'rxjs';
import { SignUpRequestModel } from '../api-modules/signUpRequest.model';
import { apiRoutes } from '../api-routes/api-routes';
import { ForgetPasswordRequestModel } from '../api-modules/forgetPasswordRequest.model';
import { SendOtpRequestModel } from '../api-modules/sentotpRequest.mode';
import { VerifyEmailRequestModel } from '../api-modules/verifyEmailResponse.modal';
import { UserListModal } from '../api-modules/user-list.model';
import { ProfileDetailsModel } from '../api-modules/profile-details.model';
import { ProfileDetailsRequestModel } from '../api-modules/profile-details-request.model';
import { adminListResponseModel } from '../api-modules/admin-list.model';

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

  userList(): Observable<UserListModal[]> {
    return this.httpClient.get<UserListModal[]>(`${apiRoutes?.user.userList}`)
  }

  adminList(): Observable<adminListResponseModel[]> {
    return this.httpClient.get<adminListResponseModel[]>(`${apiRoutes?.user.adminsList}`)
  }

  // profile(): Observable<>

  profileDetails(profileDetailsRequestModel: ProfileDetailsRequestModel): Observable<any> {
    const params = { userId: profileDetailsRequestModel.userId };
    
    return this.httpClient.get<any>(`${apiRoutes?.user.profileDetails}`, { params });
  }


}
