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
    ) {
      this.checkLogin();
    }

  checkLogin() {
    this.afAuth.authState.subscribe(res => {
      if (res && !res.isAnonymous) {
      } else {
        this.afAuth.auth.signInAnonymously().then(res => {
        })
      }
    })
  }

}
