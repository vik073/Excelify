# Norm
### Data Modeling Platform

## Core Structure
    mmxx
      ├── api
      │   > PORT 3001
      │   > api.usenorm.com
      │
      ├── web
      │   > PORT 4001
      │   > usenorm.com
      │
      └── README.md (you are here)

## Stack
- **API**
    - NodeJS
    - Express
    - MongoDB

- **Web**
    - React
    - Redux
    - React Router

## Setup and Running
- **Prerequisites**
    - Node (`v12.x`)
    - MongoDB (`v4.x`)
    - IDE (Webstorm / Visual Studio Code)

- Clone repository `git clone git@github.com:bensultan/mmxx.git`

- **API**
    - Switch to `api` directory `cd mmxx/api`
    - Configuration
        - Create local environment file `cp .env.dev .env.local`
    - Setup
        - Install packages `npm install`
    - Run
        - Start API server: `npm start` (http://localhost:3001)

- **Web**
    - Switch to `web` directory `cd mmxx/web`
    - Configuration
        - Create local environment file `cp .env.dev .env.local`
    - Setup
        - Install packages `npm install`
    - Run
        - Start web server: `npm start` (http://localhost:4001)
