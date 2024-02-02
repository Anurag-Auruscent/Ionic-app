// libraries/libraries.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from '../shared/services/library.service';
import { Library } from '../model/library.model';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.page.html',
  styleUrls: ['./libraries.page.scss'],
})

export class LibrariesPage implements OnInit {
  allLibraries: Library[] = []; 
  selectedLibrary: any;

  constructor(
    private router: Router,
    private libraryService: LibraryService
    ) {
    // For example:
    // this.libraries = [
    //   { title: 'Library 1', description: 'Description 1' },
    //   { title: 'Library 2', description: 'Description 2' },
    //   // Add more libraries as needed
    // ];

  }

  ngOnInit () {
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
    this.libraryService.getAllLibraries().subscribe(
      (data:Library[]) => {
        console.log(data);
        
        this.allLibraries = data;
      });
  }
}
