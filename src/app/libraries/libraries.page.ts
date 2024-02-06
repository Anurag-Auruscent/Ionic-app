// libraries/libraries.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Library } from '../model/library.model';
import { LibraryService } from '../shared/services/library.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.page.html',
  styleUrls: ['./libraries.page.scss'],
})
export class LibrariesPage {
  allLibraries: Library[] = []; // Fetch your library data here
  selectedLibrary: any;

  constructor(private router: Router, private libraryService: LibraryService) {
    // For example:

  }

  ngOnInit() {
    this.seeAllLibraries();
  }

  ionViewWillEnter() {
    // This method will be called every time the page is about to enter.
    this.seeAllLibraries();
  }

  goBack() {
    this.router.navigate(['/home']); // Adjust the route accordingly
  }



  // Define your functions here

  // Example isEvenIndex function
  isEvenIndex(index: number): boolean {
    return index % 2 === 0;
  }

  viewLibraryDetails(library: Library) {
    this.router.navigate(['/library-details', library.id]); // Adjust the route and parameter accordingly
  }

  librarySelected() {
    // Implement the logic for when a library is selected
    console.log('Library Selected:', this.selectedLibrary);
  }

  // Add this function to fix the compilation error
  seeAllLibraries() {
    // Implement the logic to navigate to a page displaying all libraries
    const apiURL = 'http://localhost:9000/library/get-libraries-with-weblinks';
    console.log('See All Libraries Clicked');
    this.libraryService.getAllLibraries(apiURL).subscribe(
      (data: Library[]) => {
        console.log(data);

        this.allLibraries = data;
      });

  }
}
