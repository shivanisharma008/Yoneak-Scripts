import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.scss'
})
export class UploadVideoComponent {
  videoLink: string = ''; // Model for input field
  videoLinks: string[] = []; // Array to store added video links

  addVideoLink() {
    if (this.videoLink) {
      this.videoLinks.push(this.videoLink); // Add the link to the array
      this.videoLink = ''; // Clear the input field
    }
  }

  removeLink(link: string) {
    this.videoLinks = this.videoLinks.filter((item) => item !== link); // Remove the link
  }
}
