# Khiza Backend Challenge


## Introduction
This project is developed in Node.js using Nest.js, Prisma, and Docker. 
Its main objective is to store NFTs collections data obtained from Reservoir API.
The stored data can then be retrieved when requested.

## Features
* Fetch NFTs collections data from the Reservoir API.
* Store NFTs collections data and collections sets in the database.
* Retrieve NFTs collections, collections sets and summarized info from the database.
* Utilize Docker for containerization and simplified deployment.

## Prerequisites
* Node 18+
* Package manager (npm, npx, yarn, pnpm)
* Docker

## Installation
1. Clone the repository:
```
git clone git@github.com:LucasR29/khiza-backend.git
```

2. Install the dependencies:
```
npm install
# or
yarn install
```

## Usage:
The project already contains 2 .env files one is for docker and the other one is for local run.
You need to create a Resevoir Key to use this application, put the key and your database info in both files.
Create the key here: https://docs.reservoir.tools/reference/dashboard-sign-up.
