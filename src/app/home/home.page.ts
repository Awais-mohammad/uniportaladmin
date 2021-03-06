import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

interface uni {
  name: string;
  country: string;
  city: string;
  contactName: string;
  contactEmail: string;
  desc: string;
  tStudents: number;
  iStudents: number;
  gRank: number;
  scholarship: [{
    cat: string;
    name: string;
    amount: number;
    per: number;
    desc: string;
  }]
  program: [{
    name: string;
    cat: string;
  }]
  uid: string;
}

interface program {
  level: string;
  country: string;
  city: string;
  language: string;
  street: string;
  university: string;
  duration: string;
  students: number;
  lFee: number;
  iFee: number;
  cat: string;
  mode: string;
  pace: string;
  url: string;
  email: string;
  phone: string;
  name: string;
  desc: string;
  uid: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  uni: uni = {
    name: "",
    country: "",
    city: "",
    contactName: "",
    contactEmail: "",
    desc: "",
    tStudents: 0,
    iStudents: 0,
    gRank: 0,
    scholarship: [{
      cat: "",
      name: "",
      amount: 0,
      per: 0,
      desc: "",
    }],
    program: [{
      name: "",
      cat: "",
    }],
    uid: "",
  };

  program: program = {
    level: "",
    country: "",
    city: "",
    language: "",
    street: "",
    university: "",
    duration: "",
    students: 0,
    lFee: 0,
    iFee: 0,
    cat: "",
    mode: "",
    pace: "",
    url: "",
    email: "",
    phone: "",
    name: "",
    desc: "",
    uid: "",
  }

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.fireStore.collection('programs').get().forEach(data => {
      data.docs.forEach(element => {
        this.programs.push(element.data());
      });
      console.log(this.programs);
    })
    this.fireStore.collection('unis').get().forEach(data => {
      data.docs.forEach(element => {
        this.unis.push(element.data());
      });
      console.log(this.unis);
    })
  }

  currentdiv: string = 'addadmin';
  programs: any[] = [];
  unis: any[] = [];

  toggleforms(name: string) {
    this.currentdiv = name
  }

  naviagte(page) {
    this.router.navigate([page])
  }

  submitUniForm() {
    this.uni.uid = this.afAuth.auth.currentUser.uid;
    this.fireStore.collection('unis').add(this.uni).then(data => {
      const docID = data.id;
      this.fireStore.collection('unis').doc(docID).update({ docID })
      alert("Added University Successfully!");
    })
  }

  submitProgramForm() {
    this.uni.uid = this.afAuth.auth.currentUser.uid;
    this.fireStore.collection('programs').add(this.program).then(data => {
      const docID = data.id;
      this.fireStore.collection('programs').doc(docID).update({ docID })
      alert("Added Program Successfully!");
    })
  }

  deleteProgram(ID){
    this.fireStore.collection('programs').doc(ID).delete();
  }

  deleteUni(ID){
    this.fireStore.collection('unis').doc(ID).delete();
  }
}
