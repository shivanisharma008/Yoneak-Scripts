import { environment } from "../../environment";


const baseURL = `${environment?.baseURL}/api/v1/`;
const baseURLNonBearer = `${environment?.baseURL}/api/v1/user`;

export const apiRoutes = {
    user: {
        login : `${baseURL}user/login`,
        SignUp : `${baseURL}user/signUp`,
        sendOtp : `${baseURL}user/sendotp`,
        verifyEmail : `${baseURL}user/verifyemail`,
        ForgetPassword : `${baseURL}user/resetpassword`,
        userList:`${baseURL}user`,
        userListPagination:`${baseURL}user/pagination`,
        deleteUser: `${baseURL}user`,
        profileDetails: `${baseURL}user/profile`,
        adminsList: `${baseURL}user/admins`,
        adminsListPagination: `${baseURL}user/admins/pagination`,
        
    },

    blogs: {
        blogsList: `${baseURL}blogs`,
        updateBlog: `${baseURL}blogs`,
        deleteBlogs: `${baseURL}blogs`,
        approveBlogs: `${baseURL}blogs/approve`,
        blogsPagination: `${baseURL}blogs/pagination`,

        popularBlogs: `${baseURL}blogs/visited`,
        popularBlogsView: `${baseURL}blogs/visited`,

        categoryList: `${baseURL}blogscategory`,
        categoryListPagination: `${baseURL}blogscategory/pagination`,
        blogsCategoryList: `${baseURL}blogscategory`,
        addCategory: `${baseURL}blogscategory`,
        updateCategory:`${baseURL}blogscategory`,
        deleteCategory: `${baseURL}blogscategory`,

        subCategoryList: `${baseURL}subcategory`,
        subCategoryListPagination: `${baseURL}subcategory/pagination`,
        addSubCategoryList: `${baseURL}subcategory`,
        updateSubCategory: `${baseURL}subcategory`,
        deleteSubCategory: `${baseURL}subcategory`,

        addNewBlogs: `${baseURL}blogs`,
        createVideoLink: `${baseURL}blogs/creatorvideos`,
        getCreateVideoLink: `${baseURL}blogs/creatorvideos`,
        getCreateVideoLinkPagination: `${baseURL}blogs/creatorvideos/pagination`,
        approveVideoLink: `${baseURL}blogs/approve/creatorvideos`,
        deleteVideoLink: `${baseURL}blogs/creatorvideos`
    }
}