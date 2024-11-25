import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpResponseModel } from '../api-modules/signUpResponse.model';
import { Observable } from 'rxjs';
import { SignUpRequestModel } from '../api-modules/signUpRequest.model';
import { apiRoutes } from '../api-routes/api-routes';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) { }

  registrationPostApi(signUpResponseModel: SignUpRequestModel): Observable<any> {
    return this.httpClient.post<any>(`${apiRoutes.user.SignUp}`, signUpResponseModel)
}


//   getTrendingCoursesList(filter_by: number[], sort_by: number, page: number, per_page: number, admin_id = 4506): Observable<TrendingListApiResponse> {
//     const httpOptions = {
//         headers: { 'Authorization': this.token, },
//         params: { filter_by: filter_by.join(','), sort_by: sort_by, admin_id: admin_id, page: page, per_page: per_page }
//     }

//     console.log('Making API call with params:', httpOptions.params);
//     console.log('Using headers:', httpOptions.headers.Authorization);

//     return this.httpClient.get<TrendingListApiResponse>(apiRoutes?.course?.trendingCourseList, { headers: httpOptions.headers, params: httpOptions.params });
// }
}
