import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogsService } from '../../api/api-services/blogs.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddCBlogsRequestModel, toFormData } from '../../api/api-modules/add-blogs-request.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { UpdateBlogsRequestModel } from '../../api/api-modules/update-blogs-request.model';

@Component({
  selector: 'app-add-scripts',
  templateUrl: './add-scripts.component.html',
  styleUrls: ['./add-scripts.component.scss']
})
export class AddScriptsComponent {
  categoryList: any;
  createdById: any;
  uploadedFileName: string | null = null;
  selectedFile: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;
  subCategoryList: any;
  blogId: any


  addBlogsCategoryForm = new FormGroup({
    blogName: new FormControl(null, Validators.required),
    category: new FormControl('', Validators.required),
    subCategory: new FormControl('', Validators.required),
    mediaUrl: new FormControl(null, Validators.required),  // This is where the file will be stored
    blogDescription: new FormControl(null, Validators.required)
  });
  myScriptsDetails: any;
  scriptId: any;

  constructor(
    private blogsService: BlogsService,
    private _snackbar: MatSnackBar,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') ?? '{}');
    this.createdById = userDetails._id ?? null;

    this.getCategoryList();
    this.getSubCategoryList();

    const myScriptsDetails = history.state.blogDetails;
    this.blogId = myScriptsDetails._id
    console.log(myScriptsDetails);
    console.log(myScriptsDetails.category.categoryName);


    this.addBlogsCategoryForm.patchValue({
      blogName: myScriptsDetails.blogName,
      category: myScriptsDetails.category?._id,
      subCategory: myScriptsDetails.subCategory?._id,
      blogDescription: myScriptsDetails.content,
    });
    this.imagePreviewUrl = myScriptsDetails.image
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // upload: (file: File) => this.convertToBase64(file)
    upload: (file: File): Observable<HttpEvent<any>> => this.convertFileToBase64(file),

  };

  convertFileToBase64(file: File): Observable<HttpEvent<{ url: string }>> {
    return new Observable((observer) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        // Create a complete HttpResponse
        const response = new HttpResponse({
          body: { url: base64String },
          status: 200,
          statusText: 'OK',
        });

        observer.next(response); // Emit the mock response
        observer.complete();
      };

      reader.onerror = (error) => observer.error(error);
      reader.readAsDataURL(file); // Convert file to Base64
    });
  }



  getCategoryList() {
    this.blogsService.categoryList().subscribe({
      next: (res: any) => {
        this.categoryList = res.data;
        console.log('Category', res.data);
      }
    });
  }

  getSubCategoryList() {
    this.blogsService.subCategoryList('').subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.subCategoryList = res.data
        console.log('Sub-Category' + res.data);
      }
    })
  }


  // Trigger file input click
  triggerFileInput(): void {
    const fileInput = document.getElementById('logoInput') as HTMLInputElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Create a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  submit() {
    // if (this.addBlogsCategoryForm.valid && this.selectedFile) {
    const addCBlogsRequestModel: AddCBlogsRequestModel = {
      blogName: this.addBlogsCategoryForm.controls.blogName.value ?? '',
      content: this.addBlogsCategoryForm.controls.blogDescription.value ?? '',
      image: this.selectedFile,  // Use the selected file for the image field
      embeddedYtLink: 'www.google.com', // If you have a YouTube link, append it here
      category: this.addBlogsCategoryForm.controls.category.value ?? '',
      subCategory: this.addBlogsCategoryForm.controls.subCategory.value ?? '',
      createdBy: this.createdById,
    };

    const formData = toFormData(addCBlogsRequestModel); // Convert to FormData

    // Make the API request with FormData
    this.blogsService.addNewBlogs(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 200) {
          this._snackbar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this._router.navigate(['/blogs']);
        } else {
          this._snackbar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      },
      error: (err) => {
        console.error(err);
        this._snackbar.open('Error adding blog. Please try again.', '', { duration: 3000 });
      }
    });
  }


  updateBlogs() {
    const updateBlogsRequestModel: UpdateBlogsRequestModel = {
      blogId: this.blogId,
      content: this.addBlogsCategoryForm.controls.blogDescription.value ?? '',
      image: this.selectedFile,
      embeddedYtLink: 'www.google.com',
      category: this.addBlogsCategoryForm.controls.category.value ?? '',
      subCategory: this.addBlogsCategoryForm.controls.subCategory.value ?? '',
    }
    this.blogsService.updateBlogs(updateBlogsRequestModel).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this._snackbar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this._router.navigate(['admin/my-scripts']);
        } else {
          this._snackbar.open(res.message, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      }, error: (err: HttpErrorResponse) => {
        this._snackbar.open(err.statusText, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    })
  }
}