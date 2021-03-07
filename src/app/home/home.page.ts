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
    cat: string[];
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
  durationUnit: string;
  students: string;
  lFee: number;
  lFeeUnit: string;
  iFee: number;
  iFeeUnit: string;
  studentsUnit: string;
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
      cat: [],
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
    durationUnit: "",
    students: "",
    lFee: 0,
    lFeeUnit: "",
    iFee: 0,
    iFeeUnit: "",
    cat: "",
    mode: "",
    studentsUnit: "",
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
    this.getdata();
  }

  currentdiv: string = 'main';
  programs: any[] = [];
  unis: any[] = [];
  levelsavailable: string[] = ['1', '2', '3', '4']
  languageavailable: string[] = ['english', 'chinese', 'hindi', 'spanish', 'french', 'arabic', 'bengali', 'russian', 'portuguese', 'indonesian', 'urdu', 'german', 'japanese', 'swahili', 'marathi', 'telugu', 'punjabi', 'chinese', 'tamil', 'turkish']
  durationsavailable: string[] = ['days', 'months', 'years']
  currencyavailable: string[] = ['pound sterling', 'us dolar', 'euro', 'swiss franc', 'canadian dollar',]
  modesavailable: string[] = ['full-time', 'part-time', 'distance learning', 'classroom based', 'blended learning']
  pacesarray: string[] = ['a', 'b', 'c', 'd']
  students: string[] = ['< 1,000', '< 10,000', '< 50,000', '> 100,000']
  categories: string[] = ['computing', 'engineering', 'management', 'health and sciences', 'pharmacy']
  scholarships: string[] = ['academic', 'community service', 'first in family', 'legacy', 'military', 'no essay', 'prestigeous', 'renewable', 'writing']
  name: string;
  email: string;
  password: string;
  phone: number;
  temp: string;

  toggleforms(name: string) {
    this.currentdiv = name;
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

    }).then(() => {
      this.getdata()
    })
  }

  submitProgramForm() {
    this.uni.uid = this.afAuth.auth.currentUser.uid;
    this.fireStore.collection('programs').add(this.program).then(data => {
      const docID = data.id;
      this.fireStore.collection('programs').doc(docID).update({ docID })
      alert("Added Program Successfully!");

    }).then(() => {
      this.getdata()
    })
  }

  deleteProgram(ID) {
    this.fireStore.collection('programs').doc(ID).delete();
  }

  deleteUni(ID) {
    this.fireStore.collection('unis').doc(ID).delete();
  }

  getdata() {
    this.programs = [];
    this.unis = [];
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
  chooselevel(value) {

  }

  chooselanguage(value) {
    console.log(value);
  }

  registerAdmin() {
    if (!this.email) {
      alert('field cannot be blank')
    }
    else if (!this.password) {

      alert('field cannot be blank')
    }
    else if (!this.phone) {

      alert('field cannot be blank')
    }
    else if (!this.name) {

      alert('field cannot be blank')
    }
    else {
      const name = this.name;
      const email = this.email;
      const phone = this.phone
      const password = this.password
      const timeJoined = new Date()

      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(user => {
        const userID = user.user.uid;
        this.fireStore.collection('admins').doc(userID).set({
          name,
          email,
          phone,
          password,
          timeJoined,
        }).then(() => {
          alert('user added')
        }).catch(Err => {
          alert(JSON.stringify(Err.message))
        })
      }).catch(err => {
        alert(JSON.stringify(err.message))
      })
    }
  }

  chooseduration(value) {
    alert(value)
  }
  temparray: any[] = []
  choosecat(value) {
    console.log('called');

    this.temparray.push(value)
    console.log(this.temparray);

  }

  /////PROGRAMS ADDITION CATEGORIES
  programsarray: any[] = []
  //////MAIN ARRAY NIAZI USE THIS FOR ADD PROGRAMS CATEGORIES
  tempprograms: string;


  assigningtempprograms(values) {
    this.tempprograms = values;
    this.programsarray.push(this.tempprograms)

  }

  deletetempprograms(index) {
    this.programsarray.splice(index, 1)
  }
  /////UNIVERISTY SCHOLARSHIPS CATEGORIES
  sholarshipsarray: any[] = []
  //////MAIN ARRAY NIAZI USE THIS FOR UNIVERSITY Scholarships CATEGORIES
  tempscholarships: string;

  univscholarships(value) {
    this.tempscholarships = value
    this.sholarshipsarray.push(this.tempscholarships)
  }

  deletetempscholarships(index) {

    this.sholarshipsarray.splice(index, 1)
  }

  /////UNIVERISTY PROGRAMS CATEGORIES
  programcat: string;
  //////MAIN ARRAY NIAZI USE THIS FOR UNIVERSITY PROGRAM CATEGORIES
  programcatsarray: any[] = []

  prgramscatsaddition(value) {
    this.programcat = value
    this.programcatsarray.push(this.programcat)
    alert(this.programcatsarray)
  }

  removeprogramscats(index) {

    this.programcatsarray.splice(index, 1)
  }

}
