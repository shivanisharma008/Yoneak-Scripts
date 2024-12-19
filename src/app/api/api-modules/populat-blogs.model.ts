export interface PopularBlogsListModel {
    status: number
    message: string
    data: PopularBlogsList[]
  }
  
  export interface PopularBlogsList {
    _id: string
    blogName: string
    content: string
    image?: string
    embeddedYtLink: string
    createdBy: string
    approved: boolean
    category: string
    subCategory: string
    role: number
    createdAt: string
    updatedAt: string
    __v: number
    visited: number
    publishedOn?: string
  }
  