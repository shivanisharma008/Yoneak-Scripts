export interface GetCreatedVideoModel {
    status: number
    message: string
    data: createdVideo[]
  }
  
  export interface createdVideo {
    _id: string
    embeddedYtLink: string[]
    createdBy?: CreatedBy
    isApproved: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  export interface CreatedBy {
    _id: string
    email: string
    username: string
    phoneNo: string
    role: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  