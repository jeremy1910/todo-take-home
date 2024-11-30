<p align="center">
  <h3 align="center"><i>TODO</i> - a take-home exercise</h3>
</p>
<br />
<br />

This is take-home exercise contains a full stack web application !

The application is based on a simple Express server and a React+ViteJS fontend, each being served on a different port.

# Quickstart

```bash
$ docker compose up # start database

$ npm install # install dependencies

$ npm run server dev # run backend (nodemon)

$ npm run client dev # run frontend (vite hmr) in a separate terminal
```

Read assignment in the [**Questions** section below](#questions).

# Usage

## NodeJS & nvm config

In order to locally run any of the packages, you will need to have NodeJS installed on your machine. Node is responsible for installing, resolving and bundling dependencies, aswell as running the development servers and the tests suites. Consequently, the version of node used for all of this has to be consistent among each dependency pool.

Since all of the app's packages share the same dependencies, there can only be a single version of node responsible for installing / resolving / bundling those dependencies.

In order to manage node versions, we recommend [`nvm` (Node Version Manager)](https://github.com/nvm-sh/nvm).

> `nvm` allows you to quickly install and use different versions of node via the command line.

The recommendend way to setup node on your machine is by using `nvm`. Enven if you probably won't have to jump between different versions, `nvm` is still a nice way of handling the node setup on your machine.

Follow the [official documentation](https://github.com/nvm-sh/nvm#installing-and-updating), depending on your environement. Once your are able to use the `nvm` command, juste run `nvm use` in this repo's root folder. This will read inside the `.nvmrc` file (also present in any of the packages sub-folders), and fetch the correct node version for you.

> :warning: Each new node installation through `nvm` comes with it's own globally installed packages. This means that if you previously had `pnpm` (for example) installed on version v`18.0.0`, and switch to v`14.18.3` using `nvm use`, you will have to re-install your global packages using `npm install --global pnpm`

If you wish every terminal session to automatically start with a specific version of Node, configure the `default` _alias_ in nvm :

```bash
nvm alias default v18.18.2
```

or

```bash
nvm alias default $(cat .nvmrc)
```

... and restart your machine for the change to take effect globally. (If you don't some non-interactive terminal session might not pick the default version).

## Docker setup

For the express server to run, you will need it to connect to a database.

For you to deploy such a thing locally, we recommend using [Docker Compose](https://docs.docker.com/compose/). In order to use Docker Compose, you will first need to install the [Docker Engine](https://docs.docker.com/get-docker/).

Once you are all set up, simply run `docker compose up` inside the root directory. This should launch a simple postgresql database using the `compose.yml` file.

## Start the server and the client

To start the Express server, use the following script :

```bash
$ npm run server dev
```

To start the Vite server (frontend), use the following script :

```bash
$ npm run client dev
```

# Questions

## Part 1

The functionality to add todos and mark them as completed or uncompleted exists. Implement the ability to update the “description” field of a given todo in the database.

## Part 2

Implement optimistic updates for updating the “completed” and “description” fields for a given todo. When a user creates a todo, toggles a todo completeness, or updates a todo description, those updates should be made immediately in the frontend of the application, before the updates are saved in the database. If the API responds with a success status, then the frontend updates are allowed to persist. If the API responds with an error status, the frontend update must be reverted.

Example:

1. Todo with id 2 is marked as completed. The frontend immediately shows that todo as complete, despite the change having not been persisted in the database.
2. The API responds with a 500 because todo 2 could not be saved.
3. The frontend must now revert the change to todo 2 and show it as incomplete.
