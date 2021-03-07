
import { AngularFireAuth } from 'angularfire2/auth';
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
    private firebaseauth: AngularFireAuth,

  ) { }

  signup: boolean = false;
  width = window.innerWidth;
  email: string;
  password: string;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  toggleforms() {
    this.signup = !this.signup;
  }

  gotoPage(pagename) {
    // this.router.navigate([pagename])
  }

  login() {
    if (!this.email) {
      alert('email cannot be left blank')
    }
    else if (!this.password) {
      alert('password cannot be left blank')
    }
    else {
      this.firebaseauth.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.router.navigate(['home'])
      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }
  }

  resetPass() {
    if (!this.email) {
      alert('Enter account email to recover password')
    }
    else {
      this.firebaseauth.auth.sendPasswordResetEmail(this.email).then(() => {
        alert('EMAIL SENT ')
      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }

  }

  ngOnInit() {
  }

}
