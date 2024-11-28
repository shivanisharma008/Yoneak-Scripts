export interface CategoryListModal {
    status: number
    message: string
    data: categoryList[]
  }
  
  export interface categoryList {
    _id: string
    categoryName: string
    description: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  