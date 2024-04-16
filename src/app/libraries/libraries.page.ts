// libraries/libraries.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Library, LibraryListServerResponse } from '../model/library.model';
import { LibraryService } from '../shared/services/library.service';

@Component({
  selector: 'app-libraries',
  templateUrl: './libraries.page.html',
  styleUrls: ['./libraries.page.scss'],
})
export class LibrariesPage {
  allLibraries: Library[] = []; 
  selectedLibrary: any;

  constructor(private router: Router, private libraryService: LibraryService,) { }

  ngOnInit() {
    this.seeAllLibraries();
  }

  ionViewWillEnter() {
    this.seeAllLibraries();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  viewLibraryDetails(library: Library) {
    this.router.navigate(['/library-details', library.id]); 
  }

  // librarySelected() {
  //   // Implement the logic for when a library is selected
  //   console.log('Library Selected:', this.selectedLibrary);
  // }

  seeAllLibraries() {
    this.libraryService.getAllLibraries().subscribe(
      (data: LibraryListServerResponse) => {
       
        this.allLibraries = data.content.map((library: any) => ({
          ...library,
          color: this.getRandomColor() ,
          showImage: false
        }));
        console.log(this.allLibraries);
      }
    );
  }

  getRandomColor() {
    var r = Math.floor(150 + Math.random() * 100); // Red component between 200 and 255
    var g = Math.floor(160 + Math.random() * 100); // Green component between 200 and 255
    var b = Math.floor(150 + Math.random() * 100); // Blue component between 200 and 255

    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  toggleImage(library: Library): void {
    library.showImage = !library.showImage;

    this.allLibraries.forEach(lib => {
      if (lib !== library) {
        lib.showImage = false;
      }
    });
  }

  handleImageError(event: any, item: any) {
    event.target.src = '/assets/Images/default-placeholder.svg';
}

}
