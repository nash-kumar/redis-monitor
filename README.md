# Redis Monitor in Node.

### This project helps in visualizing the redis performance and monitor the data.

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

## Screenshots

- Adding Redis Server

![shot_1.png](/doc/shot_1.png)

- Redis Details

![shot_2.png](/doc/shot_2.png)

- Connection Time and Commands Graph

![shot_3.png](/doc/shot_3.png)

- Memory and CPU usage Graph

![shot_4.png](/doc/shot_4.png)
