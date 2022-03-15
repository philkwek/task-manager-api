//const functions = require("firebase-functions");
//const express = require('express')
//const cors = require('cors');

import { db } from './firebaseApp.js';

import functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';


const taskApp = express();
taskApp.use(cors({origin: true}));

//Public Tasks
taskApp.get("/:id", async(req, res) => { //for getting a specific user's public tasks
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

taskApp.post("/", async(req, res) => { //for creating a public task
    const taskData = req.body;

    if(taskData != ""){
        const response = await db.collection('tasks').add(taskData);
        const taskId = response.id;
        res.status(201).send(taskId);
    } else {
        res.status(400).send("No task data found!");
    }
});

taskApp.put("/:taskId", async(req, res) => { //update public task
    const body = req.body;
    const taskId = req.params.taskId;

    await db.collection('tasks').doc(taskId).update(body);

    res.status(201).send();
})

taskApp.delete("/:postId", async(req, res) => { //for deletion of a specific public task
    const taskId = req.params.postId;
    if (taskId != ""){
        await db.collection('tasks').doc(taskId).delete();
        res.status(200).send();
    }
});

//Private Tasks
taskApp.get("/privateTasks/:id", async(req, res) => { //for getting a specific user's private tasks
    const userId = req.params.id;
    const snapshot = await db.collection('tasks').doc('privateTasks').collection(userId).get();

    let tasks = [];
    snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();

        tasks.push({id, ...data});
    });

    res.status(200).send(JSON.stringify(tasks));
});

taskApp.post("/privateTasks/:id", async(req, res) => { //for creating a private task
    const taskData = req.body;
    const userId = req.params.id;

    if(taskData != ""){
        const response = await db.collection('tasks').doc('privateTasks').collection(userId).add(taskData);
        const taskId = response.id;
        res.status(201).send(taskId);
    } else {
        res.status(400).send("No task data found!");
    }
});

taskApp.put("/privateTasks/:id/:taskId", async(req, res) => { //updates private task
    const body = req.body;
    const taskId = req.params.taskId;
    const userId = req.params.id;

    await db.collection('tasks').doc('privateTasks').collection(userId).doc(taskId).update(body);

    res.status(201).send();
})

taskApp.delete("/privateTasks/:id/:taskId", async(req, res) => { //for deletion of a specific private task
    const taskId = req.params.taskId;
    const userId = req.params.id;

    if (taskId != "" && id != ""){
        await db.collection('tasks').doc('privateTasks').collection(userId).doc(taskId).delete();
        res.status(200).send();
    }
});

//exports.tasks = functions.https.onRequest(taskApp);
export default functions.https.onRequest(taskApp);