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


  playVideo(link: any) {
    const videoUrl = link.embeddedYtLink[0]; // Get the first video URL

    if (this.isYouTubeLink(videoUrl)) {
      this.selectedVideoType = 'youtube';
      this.selectedVideo = videoUrl;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getYouTubeEmbedUrl(videoUrl));
    } else if (this.isInstagramLink(videoUrl)) {
      this.selectedVideoType = 'instagram';
      this.selectedVideo = videoUrl;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getInstagramEmbedUrl(videoUrl));
    } else if (this.isFacebookLink(videoUrl)) {
      this.selectedVideoType = 'facebook';
      this.selectedVideo = videoUrl;
      const embedUrl = this.getFacebookEmbedUrl(videoUrl);
      console.log('Generated Facebook Embed URL:', embedUrl); // Debugging
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    } else {
      this.selectedVideoType = 'direct';
      this.selectedVideo = videoUrl;
      this.safeVideoUrl = null;
    }
  }

  isYouTubeLink(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  isInstagramLink(url: string): boolean {
    return url.includes('instagram.com');
  }

  isFacebookLink(url: string): boolean {
    return url.includes('facebook.com');
  }

  closePlayer() {
    this.selectedVideo = null; // Clear the video player when closed
    this.selectedVideoType = null; // Reset the video type
    this.safeVideoUrl = null; // Clear the safe video URL
  }


  getVideoLink() {
    this.blogService.getCreateVideoLink('', '', true).subscribe({
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

  getInstagramEmbedUrl(url: string): string {
    if (url.includes('/reel/')) {
      const reelId = this.extractInstagramPostId(url);
      return `https://www.instagram.com/reel/${reelId}/embed`;
    }
    return url; // Fallback for invalid URLs
  }

  getFacebookEmbedUrl(url: string): string {
    if (url.includes('/videos/')) {
      // Extract the video ID from the URL
      const videoId = url.split('/videos/')[1]?.split('/')[0];
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${videoId}&show_text=0&width=560`;
    } else if (url.includes('/share/v/')) {
      // Handle the share link format
      const videoId = url.split('/share/v/')[1]?.split('/')[0];
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${videoId}&show_text=0&width=560`;
    }
    // Return the original URL if it's already in the correct format
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
  }





  extractInstagramPostId(url: string): string {
    if (url.includes('/reel/')) {
      return url.split('/reel/')[1]?.split('/')[0];
    } else if (url.includes('/p/')) {
      return url.split('/p/')[1]?.split('/')[0];
    }
    return '';
  }

  // Function to get the thumbnail for direct video URLs (you can customize this based on your file structure)
  getThumbnail(link: any): string {
    if (this.isYouTubeLink(link.embeddedYtLink[0])) {
      return this.getYouTubeThumbnail(link.embeddedYtLink[0]); // YouTube thumbnail
    }
    return '/assests/images/blog_cat1.jpg'; // Replace with a default thumbnail for direct videos
  }
}
