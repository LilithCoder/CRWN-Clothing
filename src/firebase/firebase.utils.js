import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBDV1sYbJvLYjuzp6O6HY9W_ea6UkOl2K4",
    authDomain: "crwn-db-ae3bb.firebaseapp.com",
    databaseURL: "https://crwn-db-ae3bb.firebaseio.com",
    projectId: "crwn-db-ae3bb",
    storageBucket: "",
    messagingSenderId: "1008621513715",
    appId: "1:1008621513715:web:28a8e2bf8c8894b1"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;