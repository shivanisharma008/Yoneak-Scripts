import { Component } from '@angular/core';

@Component({
  selector: 'app-user-upload-links',
  templateUrl: './user-upload-links.component.html',
  styleUrl: './user-upload-links.component.scss'
})
export class UserUploadLinksComponent {
  uploadedLinks = [
    {
      username: 'John Doe',
      url: 'https://example.com',
      uploadedAt: new Date(),
      status: 'Pending'
    },
    {
      username: 'Jane Smith',
      url: 'https://anotherexample.com',
      uploadedAt: new Date(),
      status: 'Pending'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  approveLink(link: any): void {
    link.status = 'Approved';
    alert(`Link approved: ${link.url}`);
  }

  rejectLink(link: any): void {
    link.status = 'Rejected';
    alert(`Link rejected: ${link.url}`);
  }
}
