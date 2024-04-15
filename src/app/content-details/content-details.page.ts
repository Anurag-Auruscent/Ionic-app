import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.page.html',
  styleUrls: ['./content-details.page.scss'],
})
export class ContentDetailsPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['/library-details']); // Adjust the route accordingly
  }

}
