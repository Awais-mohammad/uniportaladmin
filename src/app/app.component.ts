import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private Router: Router,

  ) {
    this.checkLogin();

  }

  checkLogin() {
    this.afAuth.authState.subscribe(res => {
      if (res) {

        if (res.uid) {
          this.Router.navigate(['home'])
        }

      } else {
        this.Router.navigate(['authentication'])
      }
    })
  }

}
