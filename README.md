# Khiza Backend Challenge

## Introduction

This project is developed in Node.js using Nest.js, Prisma, and Docker.
Its main objective is to store NFTs collections data obtained from Reservoir API.
The stored data can then be retrieved when requested.

## Features

- Fetch NFTs collections data from the Reservoir API.
- Store NFTs collections data and collections sets in the database.
- Retrieve NFTs collections, collections sets and summarized info from the database.
- Utilize Docker for containerization and simplified deployment.

## Prerequisites

- Node 18+
- Package manager (npm, npx, yarn, pnpm)
- Docker

## Installation

1. Clone the repository:

```
git clone git@github.com:LucasR29/khiza-backend.git
```

2. Enter app folder:

```
cd app
```

3. Install the dependencies:

```
npm install

# or

yarn install
```

## Usage

To use this application, you need to create a Reservoir Key, which will be used to fetch data from the Reservoir API. Follow the steps below to set up the project:

1. Create a Reservoir Key:

   - Go to https://docs.reservoir.tools/reference/dashboard-sign-up and sign up to create your Reservoir Key.

2. Environment Configuration:

   - The project contains two environment files: .env.example for local development and env at the root for use with Docker.
   - Create a new .env file based on .env.example.
   - Paste your Reservoir API Key into the .env file at the RESERVOIR_API_KEY variable.

3. Local Development:
   - During local development, the application will use the .env.example file automatically.
   - Run the project using the following command:

```
npm run start:dev

# or

yarn start:dev
```

4. Docker Deployment:

   - To deploy the application using Docker, ensure you have Docker installed and running on your system.
   - Make sure the .env file at the root contains the correct configuration with your Reservoir API Key.
   - Build the Docker image:

     ```
     docker-compose build
     ```

   - Run the Docker container:

     ```
     docker-compose up
     ```

## Endpoints

All endpoints besides `/user` and `/login` require a Bearer Token. The token is obtained through the `/login` route.

### `POST /user`

Creates a new user

##### Request

```json
{
  "username": "exampleUserme",
  "password": "Abc@123"
  // Password requirements: 1 Uppercase, 1 Lowercase, 1 Number, 1 Special character, and length greater than 3
}
```

#### Response

```json
{
  "id": "29d540d5-02e2-4696-8d54-ccc257c7befa",
  "username": "exampleUserme"
}
```

### `POST /login`

Allows a user to log in and obtain a Bearer Token.

#### Request

```json
{
  "username": "exampleUserme",
  "password": "Abc@123"
}
```

#### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOWQ1N0KJs1J"
}
```

### `POST /collection`

Store a new collection on the database

#### Request

```json
{
  "contract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5"
}
```

- `contract`: The contract address of the new NFT collection

#### Response

```json
{
  "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
  "name": "Milady Maker",
  "contract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
  "description": ".....",
  "floorSale": {
    "1day": 2.59835,
    "7day": 2,
    "30day": 2.6167
  },
  "floorSaleChange": {
    "1day": 1.036621224928435,
    "7day": 1.34675,
    "30day": 1.029348259393408
  },
  "createdAt": "2023-08-02T03:38:25.138Z"
}
```

- `id`: The collection contract ID.
- `name`: The name of the NFT collection.
- `contract`: The collection contract address.
- `description`: A brief description of the NFT collection.
- `floorSale`: The floor sale data for different periods (1 day, 7 days, 30 days).
- `floorSaleChange`: The floor sale change percentage for different periods (1 day, 7 days, 30 days).
- `createdAt`: The timestamp when the collection data was created in the database.

All adicional data comes from Reservoir API.

### `GET /collection`

Retrieves average floor sale change of all NFT collections and the maximum and minimum change values within the specified date range.

- Query Parameters:
  - `startDate`: (optional) The start date for the data range. Format: `YYYY-MM-DD`. Example: `2021-08-01`.
  - `endDate`: (optional) The end date for the data range. Format: `YYYY-MM-DD`. Example: `2023-08-01`.
  - Example: `/collections?startDate=2021-08-01&endDate=2023-08-01`

#### Response

```json
{
  "minFloorSaleChange": 0.01,
  "maxFloorSaleChange": 1.3825,
  "averageFloorSaleChange30Days": "3.52%"
}
```

- `minFloorSaleChange`: The minimum floor sale change percentage among all NFT collections.
- `maxFloorSaleChange`: The maximum floor sale change percentage among all NFT collections.
- `averageFloorSaleChange30Days`: The average floor sale change percentage of all NFT collections within the specified date range of the last 30 days.

### `GET /collection/:id`

Retrieves all data from a specific NFT collection based on its collection contract ID.

- Path Parameter:
  - `id`: The collection contract ID (e.g., "0x5af0d9827e0c53e4799bb226655a1de152a425a5").

#### Response

```json
{
  "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
  "name": "Milady Maker",
  "contract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
  "description": ".....",
  "floorSale": {
    "1day": 2.59835,
    "7day": 2,
    "30day": 2.6167
  },
  "floorSaleChange": {
    "1day": 1.036621224928435,
    "7day": 1.34675,
    "30day": 1.029348259393408
  },
  "createdAt": "2023-08-02T03:38:25.138Z"
}
```

### `GET /collection/all`

Retrieves all collections on the database

#### Response

```json
[
  {
    "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    "name": "Milady Maker",
    ......
  },
  {
    "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    "name": "Milady Maker",
    .....
  }
]
```

### `POST /collection-set`

Creates a new collection set using the collection in the database; otherwise, it will create it.

#### Request

```json
{
  "collections": [
    "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
    "0x5af0d9827e0c53e4799bb226655a1de152a425a5"
  ]
}
```

#### Response

```json
{
  "id": "a05bd28d-2e34-4182-b11e-22414ca88f83",
  "collections": [
    {
      "collection": {
        "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
        "contract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
        "name": "Milady Maker",
        .......
      }
    },
    {
      "collection": {
        "id": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
        "contract": "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
        "name": "Milady Maker",
        .......
      }
    }
  ]
}
```

### `GET /collection-set`

Retrives all collection sets in the database

#### Response

```json
{
  "collectionSet": {
    "id": "419e3e31-9bb2-48ac-93ec-56b1a1f3b252",
    "createdAt": "2023-08-01T16:12:36.952Z",
    "collections": [
      {
        "id": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
        "name": "Mutant Ape Yacht Club",
        .....
      },
      {
        "id": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        "name": "CryptoPunks",
        ......
      }
    ]
  }
}
```

### `GET /collection-set/:id`

Retrieves a collection set by its ID.

- Route Parameter:
  - id: The collection set ID (e.g., "a05bd28d-2e34-4182-b11e-22414ca88f83").
  - `/collection-set/a05bd28d-2e34-4182-b11e-22414ca88f83`

#### Response

```json
[
  {
    "collectionSet": {
      "id": "419e3e31-9bb2-48ac-93ec-56b1a1f3b252",
      "createdAt": "2023-08-01T16:12:36.952Z",
      "collections": [
        {
          "id": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
          "name": "Mutant Ape Yacht Club"
          ......
        },
        {
          "id": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
          "name": "CryptoPunks"
          ......
        }
      ]
    }
  },
  {
    "collectionSet": {
      "id": "419e3e31-9bb2-48ac-93ec-56b1a1f3b252",
      "createdAt": "2023-08-01T16:12:36.952Z",
      "collections": [
        {
          "id": "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
          "name": "Mutant Ape Yacht Club"
          ......
        },
        {
          "id": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
          "name": "CryptoPunks"
          ......
        }
      ]
    }
  }
]
```

### `POST /sync`

Syncs all collections data with the Reservoir API, it wil also ask Resevoir to update their data, but this second part will only happen once a day.

#### Response

```json
{
  "message": "All collections updated"
}
```
