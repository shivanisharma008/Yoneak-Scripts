import { Component } from '@angular/core';

@Component({
  selector: 'app-see-others-video',
  templateUrl: './see-others-video.component.html',
  styleUrl: './see-others-video.component.scss'
})
export class SeeOthersVideoComponent {
  videoLinks: string[] = [
    'https://youtu.be/qldf3CPLqJA?si=52gBHcaXqiG1UvCz',
    'https://www.example.com/video2.mp4',
    'https://www.example.com/video3.mp4',
    'https://www.example.com/video4.mp4',
  ];

  selectedVideo: string | null = null; // Currently selected video

  playVideo(link: string) {
    this.selectedVideo = link; // Set the selected video
  }

  closePlayer() {
    this.selectedVideo = null; // Clear the video player
  }

  getThumbnail(link: string): string {
    // Placeholder thumbnail for each video
    return 'https://via.placeholder.com/240x135.png?text=Video+Thumbnail';
  }
}
