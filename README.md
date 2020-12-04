# Redis Monitor in Node.

## About the project

This application helps in visualizing the redis performance and monitor the data.

The object of this project is to port the original redis monitor built in python/flask to node/express.

Project Demo Link - https://redis-monitor-node.herokuapp.com/ui#/?_k=vzdvh7

Original Repo Link - https://github.com/NetEaseGame/redis-monitor

## Prerequisites

Node must be greater than v8.10.0

- [node](https://nodejs.org/en/download/) >=8.10.0

## Installation

1. Clone the repo

```sh
   git clone https://github.com/nash-kumar/redis-monitor
```

2. Install npm packages

```sh
   npm install
```

3. Configure .env file

   Copy the `.env.example` file as `.env` and make your local changes. The application will not start if there is no environment variables defined in `.env` file.

4. Run the code

   ```sh
   npm start
   ```

## Dependency

To run redis connection in local

## Linux

1. [Link to Redis download page](https://redis.io/download)

2. Download, extract and compile Redis with

   ```sh
   $ wget https://download.redis.io/releases/redis-6.0.9.tar.gz
   $ tar xzf redis-6.0.9.tar.gz
   $ cd redis-6.0.9
   $ make
   ```

3. The binaries that are now compiled are available in the src directory. Run Redis with:

   ```sh
   $ src/redis-server
   ```

4. The default redis server will listen on [127.0.0.1:6379]('127.0.0.1:6379)

## Screenshots

- Adding Redis Server

![shot_1.png](/doc/shot_1.png)

- Redis Details

![shot_2.png](/doc/shot_2.png)

- Connection Time and Redis Commands per sec

![shot_3.png](/doc/shot_3.png)
![shot_4.png](/doc/shot_4.png)

- Memory and CPU usage Graph

![shot_5.png](/doc/shot_5.png)
![shot_6.png](/doc/shot_6.png)
