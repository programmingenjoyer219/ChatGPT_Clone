import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = { "apiKey": "AIzaSyCXbDlk8woQbdPgQfuo2hLKlzydL_50tRg", "authDomain": "chat-gpt-clone-ee343.firebaseapp.com", "projectId": "chat-gpt-clone-ee343", "storageBucket": "chat-gpt-clone-ee343.appspot.com", "messagingSenderId": "388310070736", "appId": "1:388310070736:web:a5cfeecf29053ff38175d5" }

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }