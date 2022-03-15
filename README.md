# task-manager-api
 Simple API made using Node.Js and Firebase Functions & Firestore for a To-do app.
 
 ## What's this for?
 This API was made in conjuction with my React To-Do webapp. However, you can use this API in any other application, as long as you can perform REST functions! Currently, it supports creation of user accounts, but all tasks created is global and can be viewed by anyone (Authentication & Private Tasks coming soon!).
 
 ## How do I use this API?
 Currently, the API has 2 main functions, one is for tasks and the other is for user accounts. All data that returns from the API are in a JSON format.
 
 ### User (https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/user)
 
 #### 1. Get User Account Data
 To get all user account data, simply perform a GET request using the link. 
 
 #### 2. Get a Specific User's Account Data
 To get a specific user account data, add the user's unique ID at the end (link + /userId) and perform a GET request.
 
 #### 3. Create a new User
 To create a new user, perform a POST request at the link, including a JSON object with data in the following format.
 ```
 {
   email: (user email),
   username: (username)
 }
 ```
 
 #### 4. Update User Data
 To update a user's email or username, perform a PUT request following the same format as above. It is not required to add in both data, just put in the data that you want to update and the API will do the rest.
 
 #### 5. Delete User
 Add the target user's unique ID at the end (link +/userId) and perform a DELETE request.
 
 ### Tasks (https://us-central1-task-manager-api-4f9a8.cloudfunctions.net/tasks)
 
 #### 1. Get all Tasks
 To get all user task data, simply perform a GET request using the link. 
 
 #### 2. Get a specific user's Tasks
 To get a specific user's tasks, add the user's unique ID at the end (link + /userId) and perform a GET request.
 
 #### 3. Create a new Task
 To create a new task, perform a POST request at the link with the data json following this format.
 ```
 {
   taskDescription: ,
   taskName: ,
   taskStatus: (true/false),
   userId: (ID of user creating task)
 }
 ```
 
 #### 4. Update task
 To update task, simply perform a PUT request with the tasks's ID at the end of the link (link + /taskId) using the same data json format as above.
 
 #### 5. Delete task
 To delete a task, perform a DELETE request with the task's ID at the end of the link (link + /taskId).

## Planned Features
1. Authentication (Using Google Firebase Authentication)
2. Add friends
3. Private Tasks/View friend's tasks
4. Accountability Feature
