export interface UserListModal {
    status: number
    message: string
    data: UserList[]
  }
  
  export interface UserList {
    _id: string
    email: string
    username: string
    phoneNo: string
    role: number
    createdAt: string
    updatedAt: string
    __v: number
  }
  