// library.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private libraries: any[] = [];

  // Method to get all libraries
  getAllLibraries(): any[] {
    return this.libraries;
  }

  // Method to add a new library
  addLibrary(library: any): void {
    this.libraries.push(library);
  }

  // Method to update the name of a library
  updateLibraryName(libraryId: string, newName: string): void {
    const library = this.libraries.find((lib) => lib.id === libraryId);
    if (library) {
      library.title = newName;
    }
  }

  // Method to delete a library
  deleteLibrary(libraryId: string): void {
    this.libraries = this.libraries.filter((lib) => lib.id !== libraryId);
  }
}
