import { environment } from "../../environment";


const baseURL = `${environment?.baseURL}/api/v1/`;
const baseURLNonBearer = `${environment?.baseURL}/api/v1/user`;

export const apiRoutes = {
    user: {
        SignUp : `${baseURL}user/signUp`,
       
    }
}