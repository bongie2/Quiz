import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  database=firebase.database();
//    Userid = database.auth.uid
userID
userEmail
Newname
name
Question
childData
Category_key
Questions=[]
category=[]
Answers = [];
New_ID;
ID
cat_key
Options=[]
Counter = 0;
Ans
CorrectAnswer
Answered
Answer
userNamez
userSurname
userPhysicaladdress
userEmailz
UserzAray=[]
  uid: () => any;
  constructor() { }

  Signin(email,password){
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
      if(result){
return result
      }
    }).catch((error)=> {
      // Handle Errors here.
    
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      return errorMessage
    });
  }      

  Signup(email,password,name, surname,physicaladdress){
   return firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
  if(user){

    this.userID=user['user'].uid;
    this.userEmail=user['user'].email;
    
    firebase.database().ref('user/'+ this.userID).set({
      name:name,
 surname:surname,
 physicaladdress:physicaladdress,
      email:this.userEmail
      
    })
  }
    return user;

     }).catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage
      // ...
    });
    
  }

  getUserID() {
    return this.userID;
  }

Signout(){
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      console.log("sign-out successfull")
    }).catch((error)=> {
      // An error happened.
      console.log(error.Message)
    });
  }

  resetPassword(email){
    
    firebase.auth().sendPasswordResetEmail(email).then(()=>{

    }).catch((error) => {
      var errorCode=error.code
      var errorMessage=error.message
      console.log(email);
    })
  }

  getName(Name){
   this.name = Name;
  }

  returnName(){
    return this.name;
  }
  delCat(){
    for(let i =0; i<this.category.length; i++){
      this.category.splice(i)
    }
  }
  delUser(){
    for(let i =0; i<this.UserzAray.length; i++){
      this.UserzAray.splice(i)
    }
  }

Categories() {
  this.delCat()
  return new Promise((resolve,reject)=>{
    var data =firebase.database().ref().child('Categories')
    for(var i=0;i<this.category.length;i++){
    }

    data.on("child_added",snap=>{
      this.name = snap.child("CatName").val();
      this.cat_key = snap.child("ID").val();
        this.category.push({
          Categories: this.name,
          Category_key: this.cat_key
        })
        resolve(this.category)
    })                                                              
    return this.category
  })
}
SubmitData(Answered,UID,ID,Unique_ID){
  for(var b=0;b<Answered.length;b++){
    firebase.database().ref('Results/'+UID+"/"+ID+"/"+Unique_ID+"/"+Answered[b].Question).set({
      Answer:Answered[b].Answer,
      CorrectAnswer:Answered[b].CorrectAnswer,
      Score:Answered[b].Score
    });
  }
 
}
getUID() {
  this.delUser()
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    uid = user.uid;
  }
  
  return uid
}

UserInfo(){
  this.uid = this.getUID()
    const rootRef= firebase.database().ref('user/'+ this.uid);
    console.log(this.uid);
    
    rootRef.on('value',(data)=>{
      const userzz=data.val();
      this.userNamez=userzz.name;
      this.userSurname=userzz.surname;
      this.userPhysicaladdress=userzz.physicaladdress;
      this.userEmailz=userzz.email;

      this.UserzAray.push
      ({
        Name:this.userNamez,
        Surname:this.userSurname,
        Physicaladdress:this.userPhysicaladdress,
        Email:this.userEmailz
      });
    });
    return this.UserzAray
}



setMe(key){
  this.Category_key = key
}


getID(id){
  this.New_ID = id;
}

returnID() {
  return this.New_ID
}

delQuiz(){
  for(let q =0; q<this.category.length; q++){
    this.Questions.splice(q)
}
}

getQuiz(ID) {
this.delQuiz()
  var rootRef = firebase.database().ref('Questions/'+ ID)
  rootRef.once('value',(snapshot) => {
    let Questions = snapshot.val();

    for(let key in Questions){
      this.Questions.push({
        Question: key,
        option: Object.keys(Questions[key]),
        value: Object.values(Questions[key])
      })

      // console.log(this.Questions)
    }
  })
    return this.Questions;
}



getUnique_ID() {
  let id = firebase.database().ref().child("Results").push().key;
  return id;
}

 }
