import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAKbzRQd-rkar8pDbJ3DiUDq6NzIOZ_kRk',
  authDomain: 'listivo-3d135.firebaseapp.com',
  projectId: 'listivo-3d135',
  storageBucket: 'listivo-3d135.firebasestorage.app',
  messagingSenderId: '35454103900',
  appId: '1:35454103900:web:28e6b38c60227e08971199',
};

// ✅ Prevent duplicate app initialization
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
