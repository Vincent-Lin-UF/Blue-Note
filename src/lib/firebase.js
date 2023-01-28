import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  
  const firebase = Firebase.initializeApp(config);
  const { FieldValue } = Firebase.firestore;

  const users = [
    {
      userId: 'kRbx2UWE0Yb9PclXUYKmNcwLsd52',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    }]
    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('test').add(users[k]);
      }
  //firebase.firestore().collection('test').add({username: 'karl'})

  export { firebase, FieldValue };