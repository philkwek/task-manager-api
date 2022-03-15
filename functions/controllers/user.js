//const functions = require("firebase-functions");
//const express = require('express')
//const cors = require('cors');

import { db } from './firebaseApp.js';

import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

const userApp = express();
userApp.use(cors({origin: true}));

userApp.get('/', async (req, res) => { //gets all data from firestore
    const snapshot = await db.collection('users').get();

    let users = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        users.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(users));
})

userApp.get("/:id", async(req, res) => { //for getting a specific user's profile data
    const snapshot = await db.collection('users').doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    res.status(200).send(JSON.stringify({id: userId, ...userData}));
})

userApp.get("/friends/:id", async(req, res) => { //for getting friend list
    const snapshot = await db.collection('users').doc(req.params.id).collection('friends').get();

    let friendList = [];
    snapshot.forEach(doc => {
        let id = doc.id;

        let data = doc.data();
        
        friendList.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(friendList));
});

userApp.post('/:id', async (req, res) => { //post request to create a new user
    const user = req.body;
    const userId = req.params.id;

    if (user != ""){
        await db.collection('users').doc(userId).set(user);

        res.status(201).send(user);
    } else {
        res.status(500).send("No user data found!");
    }
});

userApp.post('/friends/:id', async(req, res) => { //add friends to user using email
    
    const email = req.body.email;
    const userId = req.params.id;

    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();

    if (snapshot.empty) {
        res.status(400).send('No user found!');
        return
    };

    let friendId;
    let data;
    snapshot.forEach(doc => {
        friendId = doc.id;
        data = doc.data();
    })
    await db.collection('users').doc(userId).collection('friends').doc(friendId).set(data);
    res.status(200).send();
});

userApp.put("/:id", async (req, res) => { //update account data
    const body = req.body;

    await db.collection('users').doc(req.params.id).update(body);

    res.status(200).send();
});

userApp.delete("/:id", async(req, res) => { //delete user account data
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).send();
})

//exports.user = functions.https.onRequest(userApp);
export default functions.https.onRequest(userApp);