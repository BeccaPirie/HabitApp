# HabitBuild

## Background
HabitBuild has been designed as a tool to help aid habit formation, as building and maintaining new habits can be challenging for many. Many existing habit tracking applications, although popular, aren't backed by research and in fact may hinder the habit formation process. Therefore, the goal of HabitBuild is to help users successfully integrate new habits into their daily routine by using techniques that are proven to help.

To ensure HabitBuild was successful at helping users build habits, it was important to fully understand different habit formation techniques and evaluate existing applications to recognise features that could be beneficial to implement, and those which could potentially hinder the habit formation process. From this research, a strong set of requirements were gathered which were then brought forward to the design and development stages of the project.

## Features Overview
This application has been developed using MERN stack and has implemented serveral features to aid the habit formation process:

### 1. Calendar
![image](https://user-images.githubusercontent.com/43371064/236838697-0bd29542-64f1-497f-a486-931948e4f0d2.png)

Calendars are used to monitor progress, developed with react-calendar

### 2. Todo List
![image](https://user-images.githubusercontent.com/43371064/236838867-9d09817d-82de-46d1-9a5e-d2c91267d77b.png)

Todo lists are used for planning and organising, and breaking tasks down into smaller steps to make them more achievable

### 3. Journal
![image](https://user-images.githubusercontent.com/43371064/236839144-9c3150ae-795d-4100-ab2e-55fcc4674b91.png)

The journal feature allows users to monitor their thoughts and feelings surrounding the habit

### 4. Chart
![image](https://user-images.githubusercontent.com/43371064/236838820-02c855a4-f74b-41db-8a42-ebc65ea4a691.png)

Chart are used to view calendar data, developed with echarts-for-react

### 5. Notifications
![image](https://user-images.githubusercontent.com/43371064/236838939-e67afa3d-75e6-4442-964e-4ba795a2b98b.png)

Notifications are used to monitor progress and are developed to fade out over time as the user successfully completes the habit. If the user is struggling to complete the habit, the frequency of the notifications will increase, and a message will be sent to the user suggesting they change the event cue. Notifications were implemented with Firebase Cloud Messaging and scheduled using node-schedule.

### 6. Implementation Intentions
![image](https://user-images.githubusercontent.com/43371064/236840637-cdabe8ef-034f-4543-8828-5451d3061743.png)

Implementation intention techniques used include selecting event cues and considering ways to deal with conflicting thoughts and feelings

## Installation
### 1. Clone the repo
```sh
git clone https://github.com/BeccaPirie/HabitApp.git
```
### 2. Add Firebase Admin SDK to server
* Create a Firebase project, which will will create a service account.
* Generate a private key by going to Settings > Service Accounts > Generate New Private Key > Generate Key.
* Store the JSON file in the root of the server directory.

### 3. Set up env file in the server folder
```sh
DATABASE_URI =
PORT = 
APP_CREDENTIALS = [JSON file]
JWT_SECRET =
JWT_REFRESH_SECRET =
```
### 4. Run the server
```sh
cd server
npm install
node server
```
### 5. Run the client
```sh
cd client
npm install
npm start
```
