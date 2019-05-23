import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

const db = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, db as default};

// // db.ref('expenses').push({
// //   description: 'Gum',
// //   note: '',
// //   amount : 300,
// //   createdAt: 213000
// // });

// db.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = [];

//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ... childSnapshot.val()
//       })
//     });

//     console.log(expenses);
//   });


// // db.ref().on('value',(snapshot) => {
// //   const val = snapshot.val()
// //   console.log(`${val.name} works as ${val.job.title} in ${val.location.city}`);
// // });

// // setTimeout( () => {
// //   db.ref('job/title').set('Blogger');
// // },2000);


// // db.ref()
// //   .once('value')
// //   .then( (snapshot) => {
// //     const val = snapshot.val();
// //     console.log(val);
// //   })
// //   .catch((err) => {
// //     console.log('Something happened',err)
// //   })
