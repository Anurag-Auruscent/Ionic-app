// libraries/libraries.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.page.html',
  styleUrls: ['./libraries.page.scss'],
})
export class LibrariesPage {
  libraries: any[] = []; // Fetch your library data here
  selectedLibrary: any;

  constructor(private router: Router) {
    // For example:
    this.libraries = [
      { title: 'Library 1', description: 'Description 1' },
      { title: 'Library 2', description: 'Description 2' },
      // Add more libraries as needed
    ];
  }

  goBack() {
    this.router.navigate(['/home']); // Adjust the route accordingly
  }

  // Define your functions here

  // Example isEvenIndex function
  isEvenIndex(index: number): boolean {
    return index % 2 === 0;
  }

  viewLibraryDetails(library: any) {
    // Implement the logic to view library details
    console.log('View Library Details:', library);
  }

  librarySelected() {
    // Implement the logic for when a library is selected
    console.log('Library Selected:', this.selectedLibrary);
  }

  // Add this function to fix the compilation error
  seeAllLibraries() {
    // Implement the logic to navigate to a page displaying all libraries
    console.log('See All Libraries Clicked');
  }
}
