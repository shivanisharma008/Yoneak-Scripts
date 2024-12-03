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
import { ApproveBlogsRequestModel } from '../api-modules/approve-blogs.model';
import { CreateVideoLinkModel } from '../api-modules/create-video-link.model';
import { createdVideo, GetCreatedVideoModel } from '../api-modules/get-created-video.model';
import { ApproveVideoLink } from '../api-modules/approve-video-link.model';

@Injectable({
    providedIn: 'root'
})
export class BlogsService {

    constructor(private httpClient: HttpClient) { }

    blogsList(categoryId: string | null, blogId: string | null, createdBy: string | null, isApproved: boolean | null): Observable<BlogsList[]> {
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
        if (isApproved !== null) { // Explicitly check for null since `false` is a valid value
            params['isApproved'] =  isApproved.toString();;
        }

        // Debug log for params
        console.log('Query Params:', params);

        return this.httpClient.get<BlogsList[]>(`${apiRoutes?.blogs?.blogsList}`, { params });
    }

    approveBlogs(approveBlogsRequestModel: ApproveBlogsRequestModel): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.approveBlogs}`, approveBlogsRequestModel)
    }

    deleteBlogs(blogId: string | null): Observable<any> {
        const params: { [key: string]: string } = blogId ? { blogId } : {};
    
        return this.httpClient.delete<any>(`${apiRoutes?.blogs.deleteBlogs}`, { params });
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

    deleteCategoryList(categoryId: string | null): Observable<any> {
        const params: { [key: string]: string } = categoryId ? { categoryId } : {};
    
        return this.httpClient.delete<any>(`${apiRoutes?.blogs.deleteCategory}`, { params });
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

    deleteSubCategoryList(subcategoryId: string | null): Observable<any> {
        const params: { [key: string]: string } = subcategoryId ? { subcategoryId } : {};
    
        return this.httpClient.delete<any>(`${apiRoutes?.blogs.deleteSubCategory}`, { params });
    }

    addNewBlogs(formData: FormData): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.addNewBlogs}`, formData)
    }

    createVideoLink(createVideoLinkModel: CreateVideoLinkModel): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.createVideoLink}`, createVideoLinkModel)
    }

    getCreateVideoLink(creatorId: string | null, creatorVideoId: string | null, isApproved: boolean | null): Observable<GetCreatedVideoModel[]> {
        const params: { [key: string]: string } = {};

        if (creatorId) {
            params['creatorId'] = creatorId;
        }
        if (creatorVideoId) {
            params['creatorVideoId'] = creatorVideoId;
        }
        if (isApproved !== null && isApproved !== undefined) {
            params['isApproved'] = isApproved.toString();
        }

        return this.httpClient.get<GetCreatedVideoModel[]>(`${apiRoutes?.blogs.getCreateVideoLink}`, {params})
    }

    approveVideoLinks(approveVideoLink: ApproveVideoLink): Observable<any> {
        return this.httpClient.post<any>(`${apiRoutes.blogs.approveVideoLink}`, approveVideoLink)
    }

}
