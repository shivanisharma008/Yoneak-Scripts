export interface ProfileDetailsModel {
    status: number
    message: string
    data: profileDetails
  }
  
  export interface profileDetails {
    _id: string
    email: string
    username: string
    phoneNo: string
    role: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  