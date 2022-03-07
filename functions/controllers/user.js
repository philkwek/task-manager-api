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

userApp.post('/', async (req, res) => { //post request to add a user
    const user = req.body;

    if (user != ""){
        await db.collection('users').add(user);

        res.status(201).send();
    } else {
        res.status(500).send("No user data found!");
    }

})

userApp.put("/:id", async (req, res) => {
    const body = req.body;

    await db.collection('users').doc(req.params.id).update(body);

    res.status(200).send();
});

userApp.delete("/:id", async(req, res) => {
    await db.collection('users').doc(req.params.id).delete();

    res.status(200).send();
})

//exports.user = functions.https.onRequest(userApp);
export default functions.https.onRequest(userApp);