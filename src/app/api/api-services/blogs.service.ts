import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpRequestModel } from '../api-modules/signUpRequest.model';
import { apiRoutes } from '../api-routes/api-routes';
import { BlogsList } from '../api-modules/blog-list.model';
import { categoryList } from '../api-modules/category-list.model';
import { AnySoaRecord } from 'dns';
import { AddCategoryRequestModel } from '../api-modules/add-category.model';
import { SubCategoryList } from '../api-modules/sub-category-list.model';
import { AddSubCategoryRequestModel } from '../api-modules/add-subCategory.model';
import { AddCBlogsRequestModel } from '../api-modules/add-blogs-request.model';
import { UpdateCategoryRequestModel } from '../api-modules/update-category.model';
import { UpdateSubCategoryRequestModel } from '../api-modules/update-sub-category.model';

@Injectable({
    providedIn: 'root'
})
export class BlogsService {

    constructor(private httpClient: HttpClient) { }

    blogsList(categoryId: string | null, blogId: string | null, createdBy: string | null): Observable<BlogsList[]> {
        // let data
        // if (categoryId && blogId) {
        //     alert(1)
        //     data = `${apiRoutes?.blogs?.blogsList}/${categoryId}/${blogId}`;
        // } else if (categoryId) {
        //     alert(2)
        //     data = `${apiRoutes?.blogs?.blogsList}/${categoryId}`;
        // } else if (blogId) {
        //     alert(3)
        //     data = `${apiRoutes?.blogs?.blogsList}}/${categoryId}/${blogId}`;
        // } else {
        //     alert(4)
        //     data = `${apiRoutes?.blogs?.blogsList}`;
        // }

        const params: { [key: string]: string } = {};

        // Add parameters only if they are not null
        if (categoryId) {
            params['categoryId'] = categoryId;
        }
        if (blogId) {
            params['blogId'] = blogId;
        }
        if(createdBy) {
            params['createdBy'] = createdBy;
        }

        // Debug log for params
        console.log('Query Params:', params);

        return this.httpClient.get<BlogsList[]>(`${apiRoutes?.blogs?.blogsList}`, { params });
    }

    categoryList(): Observable<categoryList[]> {
        return this.httpClient.get<categoryList[]>(`${apiRoutes?.blogs.categoryList}`)
    }

    addCategory(addCategoryRequestModel: AddCategoryRequestModel): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.addCategory}`, addCategoryRequestModel)
    }

    updateCategory(updateCategoryRequestModel: UpdateCategoryRequestModel): Observable<any> {
        return this.httpClient.put<any>(`${apiRoutes.blogs.updateCategory}`, updateCategoryRequestModel)
    }

    subCategoryList(categoryId: string | null): Observable<SubCategoryList[]> {
        const params: { [key: string]: string } = {};

        return this.httpClient.get<SubCategoryList[]>(`${apiRoutes?.blogs.subCategoryList}`, {params})
    }

    addSubCategory(addSubCategoryRequestModel: AddSubCategoryRequestModel): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.addSubCategoryList}`, addSubCategoryRequestModel)
    }

    updateSubCategory(updateSubCategoryRequestModel: UpdateSubCategoryRequestModel): Observable<any> {
        return this.httpClient.put<any>(`${apiRoutes.blogs.updateSubCategory}`, updateSubCategoryRequestModel)
    }

    addNewBlogs(formData: FormData): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.addNewBlogs}`, formData)
    }

}
