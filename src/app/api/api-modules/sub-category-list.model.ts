export interface SubCategoryResponseModel {
    status: number
    message: string
    data: SubCategoryList[]
  }
  
  export interface SubCategoryList {
    _id: string
    categoryId: string
    subcategoryName: string
    description: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  