import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-deeppage',
  templateUrl: './deeppage.page.html',
  styleUrls: ['./deeppage.page.scss'],
})
export class DeeppagePage implements OnInit {
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duration in milliseconds
      position: 'bottom',
      color: 'info', // You can customize the color
    });
    toast.present();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.presentToast('Normal Toast');
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
    // alert(this.id);
  }

}
