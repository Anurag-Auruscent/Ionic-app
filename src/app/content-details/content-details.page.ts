import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, AlertController } from '@ionic/angular';
import { LibraryService } from '../shared/services/library.service';

@Component({
  selector: 'app-content-details',
  templateUrl: './content-details.page.html',
  styleUrls: ['./content-details.page.scss'],
})
export class ContentDetailsPage implements OnInit {

  libraryId!: string;
  libraryImg!: string;
  libraryImgContentType!: string;
  libraryTitle!: string;
  libraryPayload!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation()?.extras.state as {
      libraryId: string;
      libraryImg: string;
      libraryImgContentType: string;
      libraryTitle: string;
    };
    this.libraryPayload = navigation
    console.log(this.libraryPayload);
  }

  goBack() {
    this.router.navigate(['/home']); // Adjust the route accordingly
  }

}
