## Description

[Milestone 1 Specification](https://drive.google.com/file/d/1G1HhEligEwlZQsVFkeJlg6O3FiyoalHp/view?usp=sharing)

Modify the following mongo credentials in .env to reflect your own settings:

```
- <USERNAME>
- <PASSWORD>
- <CLUSTER_HOST>
- <DB_NAME>
```

In addition, be sure to set JWT_SECRET to your own secret.

I recommend downloading "MongoDB Compass" as a client interface to your mongo instance. Once you're connected, create a new database with your preferred name and use that to populate the DB_NAME env variable above.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
