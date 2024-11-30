export interface adminListResponseModel {
    status: number
    message: string
    data: AdminList[]
  }
  
  export interface AdminList {
    _id: string
    email: string
    username: string
    phoneNo: string
    role: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  