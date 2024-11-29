import { environment } from "../../environment";


const baseURL = `${environment?.baseURL}/api/v1/`;
const baseURLNonBearer = `${environment?.baseURL}/api/v1/user`;

export const apiRoutes = {
    user: {
        SignUp : `${baseURL}user/signUp`,
        sendOtp : `${baseURL}user/sendotp`,
        verifyEmail : `${baseURL}user/verifyemail`,
        ForgetPassword : `${baseURL}user/resetpassword`,
        userList:`${baseURL}user`,
        profileDetails: `${baseURL}user/profile`,
        
    },

    blogs: {
        blogsList: `${baseURL}blogs`,
        approveBlogs: `${baseURL}blogs/approve`,
        categoryList: `${baseURL}blogscategory`,
        blogsCategoryList: `${baseURL}blogscategory`,
        addCategory: `${baseURL}blogscategory`,
        updateCategory:`${baseURL}blogscategory`,
        subCategoryList: `${baseURL}subcategory`,
        addSubCategoryList: `${baseURL}subcategory`,
        updateSubCategory: `${baseURL}subcategory`,

        addNewBlogs: `${baseURL}blogs`
    }
}