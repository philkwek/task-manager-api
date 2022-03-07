//const admin = require('firebase-admin');
import admin from 'firebase-admin';

admin.initializeApp();
export const db = admin.firestore();