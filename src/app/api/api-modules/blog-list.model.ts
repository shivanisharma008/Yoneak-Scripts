export interface BlogsListResponse {
    status: number
    message: string
    data: BlogsList[]
  }
  
  export interface BlogsList {
    _id: string
    content: string
    ytLink?: string
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: number
    approved: boolean
    embeddedYtLink?: string
    blogName?: string
    image?: string
    category?: string
    subCategory?: string
  }
  