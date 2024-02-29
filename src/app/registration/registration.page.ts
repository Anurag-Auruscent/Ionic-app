import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  firstName: any = "";
  lastName: any = "";
  userEmail: any = "harryworld85@gmail.com";
  userPassword: any = "Xyz@1234";
  selectedSegment: any = "email";

  constructor() { }

  ngOnInit() {
    console.log(`${this.firstName} ${this.lastName}`);
    const button = document.querySelector('.segmentLabel');
    button?.classList.add('active');
    
  }

  handleFieldClick(buttonValue: string){
    console.log(`${buttonValue} clicked`);
    
    const buttons = document.querySelectorAll('.segmentLabel');
    buttons.forEach(button => {
      const segmentButton = button as HTMLIonSegmentButtonElement;
      if(segmentButton.value === buttonValue){
        segmentButton.classList.add('active');
      } else {
        segmentButton.classList.remove('active');
      }
    })
  }

  register(){
    console.log(`${this.firstName} ${this.lastName}`);
  }
}
