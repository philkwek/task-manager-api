//const functions = require("firebase-functions");
//const express = require('express')
//const cors = require('cors');

import { db } from './firebaseApp.js';

import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';


const taskApp = express();

taskApp.use(cors({origin: true}));

taskApp.get('/', async (req, res) => { //gets all all public tasks from firestore
    const snapshot = await db.collection('tasks').get();

    let tasks = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        tasks.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(tasks));
});

taskApp.get("/:id", async(req, res) => { //for getting a specific user's tasks
    const tasksRef = db.collection('tasks');
    const userId = req.params.id;

    var snapshot = await tasksRef.where('userId', '==', userId).get();

    let tasks = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        tasks.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(tasks));
});

taskApp.post("/", async(req, res) => { //for creating a task
    const taskData = req.body;

    if(taskData != ""){
        await db.collection('tasks').add(taskData);

        res.status(201).send();
    } else {
        res.status(400).send("No task data found!");
    }
});

taskApp.delete("/:postId", async(req, res) => { //for deletion of a specific task
    const taskId = req.params.postId;
    if (taskId != ""){
        await db.collection('tasks').doc(taskId).delete();
        res.status(200).send();
    }
});

//exports.tasks = functions.https.onRequest(taskApp);
export default functions.https.onRequest(taskApp);