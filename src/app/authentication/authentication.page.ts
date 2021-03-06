import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
})
export class AuthenticationPage implements OnInit {

  constructor(
    private router: Router,

  ) { }

  signup: boolean = false;
  width = window.innerWidth;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  toggleforms() {
    this.signup = !this.signup;
  }

  gotoPage(pagename) {
    this.router.navigate([pagename])
  }

  ngOnInit() {
  }

}
