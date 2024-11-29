export interface AddCBlogsRequestModel {
    blogName: string,
    content: string
    image: any;
    embeddedYtLink: string,
    category: string
    subCategory: string
    createdBy: string
}


// export function toFormData(model: AddCBlogsRequestModel): FormData {
//     const formData = new FormData();

//     formData.append('blogName', model.blogName);
//     formData.append('content', model.content);
//     formData.append('image', model.image); // Assuming `image` is a File or Blob
//     formData.append('embeddedYtLink', model.embeddedYtLink);
//     formData.append('category', model.category);
//     formData.append('subCategory', model.subCategory);
//     formData.append('createdBy', model.createdBy);

//     return formData;
//   }



export function toFormData(model: AddCBlogsRequestModel): FormData {
    const formData = new FormData();

    formData.append('blogName', model.blogName);
    formData.append('content', model.content);
    formData.append('image', model.image); // Assuming `image` is a File or Blob
    formData.append('embeddedYtLink', model.embeddedYtLink);
    formData.append('category', model.category);
    formData.append('subCategory', model.subCategory);
    formData.append('createdBy', model.createdBy);

    return formData;
}