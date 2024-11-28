import { environment } from "../../environment";


const baseURL = `${environment?.baseURL}/api/v1/`;
const baseURLNonBearer = `${environment?.baseURL}/api/v1/user`;

export const apiRoutes = {
    user: {
        SignUp : `${baseURL}user/signUp`,
        sendOtp : `${baseURL}user/sendotp`,
        verifyEmail : `${baseURL}user/verifyemail`,
        ForgetPassword : `${baseURL}user/resetpassword`,
    },

    blogs: {
        blogsList: `${baseURL}blogs`,
        categoryList: `${baseURL}blogscategory`,
        blogsCategoryList: `${baseURL}blogscategory`,
        addCategory: `${baseURL}blogscategory`,
        subCategoryList: `${baseURL}subcategory`,
        addSubCategoryList: `${baseURL}subcategory`,

        addNewBlogs: `${baseURL}blogs`
    }
}