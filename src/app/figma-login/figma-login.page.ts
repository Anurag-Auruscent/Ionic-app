import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-figma-login',
  templateUrl: './figma-login.page.html',
  styleUrls: ['./figma-login.page.scss'],
})
export class FigmaLoginPage implements OnInit {
  useremail: any = "roxana@notionflows.com";
  userpassword: any = "abcd1234";
  selectedSegment: any = 'email';
  constructor() { }

  ngOnInit() {
    console.log(this.useremail);
  }

  login() {

  }

}
