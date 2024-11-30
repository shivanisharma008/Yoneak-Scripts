import { Component } from '@angular/core';
import { BlogsService } from '../../api/api-services/blogs.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-see-others-video',
  templateUrl: './see-others-video.component.html',
  styleUrl: './see-others-video.component.scss'
})
export class SeeOthersVideoComponent {
  videoLinks: any;
  selectedVideo: string | null = null; // Store the URL of the selected video
  selectedVideoType: string | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(private blogService: BlogsService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.getVideoLink()
  }

  // videoLinks: string[] = [
  //   'https://youtu.be/qldf3CPLqJA?si=52gBHcaXqiG1UvCz',
  //   'https://www.example.com/video2.mp4',
  //   'https://www.example.com/video3.mp4',
  //   'https://www.example.com/video4.mp4',
  // ];


  playVideo(link: any) {
    const videoUrl = link.embeddedYtLink[0]; // Get the first video URL

    // Check if the video URL is a YouTube link
    if (this.isYouTubeLink(videoUrl)) {
      this.selectedVideoType = 'youtube';
      this.selectedVideo = videoUrl; // Set the selected YouTube video URL
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(videoUrl)); // Sanitize URL
    } else {
      this.selectedVideoType = 'direct';
      this.selectedVideo = videoUrl; // Set the selected direct video URL (e.g., MP4)
      this.safeVideoUrl = null; // Clear the safe video URL for non-YouTube videos
    }
  }

  isYouTubeLink(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  closePlayer() {
    this.selectedVideo = null; // Clear the video player when closed
    this.selectedVideoType = null; // Reset the video type
    this.safeVideoUrl = null; // Clear the safe video URL
  }


  getVideoLink() {
    this.blogService.getCreateVideoLink('', '').subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.videoLinks = res.data

      }
    })
  }

  getYouTubeEmbedUrl(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  getYouTubeThumbnail(url: string): string {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // HQ Thumbnail
  }

  // Function to get the thumbnail for direct video URLs (you can customize this based on your file structure)
  getThumbnail(link: any): string {
    if (this.isYouTubeLink(link.embeddedYtLink[0])) {
      return this.getYouTubeThumbnail(link.embeddedYtLink[0]); // YouTube thumbnail
    }
    return '/assests/images/blog_cat1.jpg'; // Replace with a default thumbnail for direct videos
  }
}
