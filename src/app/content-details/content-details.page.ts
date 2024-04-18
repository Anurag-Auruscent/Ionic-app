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
  generatedTags: string[] = [];

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
    this.generateTag()
    this.libraryPayload = navigation
    console.log(this.libraryPayload);
  }

  generateTag(): void {
    const adjectives = ['Amazing', 'Future', 'Fantastic', 'Awesome', 'Marvelous', 'Wonderful'];
    const nouns = ['Movie', 'Network', 'cors', 'technology', 'Solution', 'Service'];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    const tag = randomAdjective + ' ' + randomNoun;

    this.generatedTags.push(tag);
  }

  goBack() {
    this.router.navigate(['/home']); // Adjust the route accordingly
  }

}
