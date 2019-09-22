# How To Build

1. Install Node.JS
1. Copy the ***contents*** of `quizshow_config.sh` into your shell startup and edit it for your own values below.
1. `cd website && npm start` to startup a dev server that auto-refreshes your browser.

# How To Install

This uses AWS as the server (AppSync specifically) and stores data in Dynamo DB.  This means you'll need an AWS account and have basic knowledge on how to administer cloud resources.  It's a good skill to have, cloud computing is the new normal.  This assumes you're familiar with Dynamo DB, AppSync, CloudFormation, CloudWatch, S3, CloudFront, and so on.

## Install the Dynamo tables, AppSync stuff, AWS resources

```
cd server
npm install
npm run build
cdk deploy
```

If you see `Unable to resolve AWS account to use. It must be either configured when you define your CDK or through the environment`, you need to read in your `quizshow_config.sh` file: you don't have environment variable `QUIZSHOW_ACCOUNT` set.

If you see `Need to perform AWS calls for account 123456789012, but no credentials found. Tried: default credentials`, you probably are using a plugin or other invalid setup in your `~/.aws/config` file.  Rename it out of the way and try again.

If you run into other issues, make sure you have followed the [CDK getting started guide][1].


## Install sample data to play with

To load the sample games into Dynamo so you have something to play with, go get (temporary) IAM user/role access/secret/session keys and set them as environment variables, then:

```bash
cd samplegames
npm install
npm run convert
npm run load
```

Once sample data is in place, run this to load 70+ records into `QuizContestants` table for the gameId you pass on the command-line.  This makes it simpler to draw leader boards, etc.  For example, each Contestant has a random score between 0 and 1000.

Steps:

```bash
node add_contestants.js 100
```

Once you have contestants loaded, you'll want to see the game in action as if there were many people all playing along.  Given a specific quesId from the database, run this script to have between 1 and 20 people "buzz in" in rapid succession.  The argument is the quesId value:

```bash
node -r esm add_nominees.js 123
```


## Multiple devices with "npm start"

In case you have firewalls enabled on your developer laptop, use this neat trick to expose the local port 3000 on your LAN so phones/kindles/tablets can be used during debugging: remote port forwarding.

1. Pick a server on the LAN you can normally SSH into like 192.168.1.3
1. ssh into it and open port 3000:
   1. `sudo firewall-cmd --zone=public --add-port=3000/tcp --permanent`
   1. `sudo firewall-cmd --reload`
1. Setup remote tunnel: `ssh -nNT -R 3000:localhost:3000 192.168.1.3`
1. On any other device on the LAN, open browser and connect to http://192.168.1.3:3000

ssh command broken-down:
* `-nNT` means don't give you a terminal prompt where you can do stuff.  Nice to have so you don't accidentally do work in this terminal window and close it unknowingly.  With `-nNT`, the ssh command just sits without doing anything.
* `-R 3000:localhost:3000` sets up a remote server port so remote port 3000 listens for other people to connect to it and forwards everything back to localhost's port 3000.
* `192.168.1.3` is the remote host to connect to (and the one that will listen on the port from `-R` above)


# How to Prepare for Production

* Clear out the Cognito User Pool
* Change IOPS on the Dynamo tables to support a bunch of users at once
* Clear out the Dynamo tables


# Cognito User Pool Structure

Data on the humans involved in the game are stored in Cognito *only*, as opposed to having a separate table holding users' names, logins, etc.

User Pools have Attributes that are set if the user pool ins't associated with an identity provider.  If there is an IdP, the Attributes come from it.

To be as simple as possible, Cognito is setup with:

1. login name required
1. Nickname required (like a 'screen handle')
1. Organization required
1. Email required for validation
1. Phone number not required
1. Passwords are weak: nothing required, at least 6 characters
1. Anyone can sign-up for an account
1. Custom sign-up screen that skips phone number and adds nickname and organiztion fields.

Using `withPlaceholder` in `index.js` makes sure all people have to sign-in (or sign-up and sign-in) before the app is rendered.  Once signed-in, `Auth.currentAuthenticatedUser()` will return (via a promise) an object that looks like this:

```json
{
    "username": "joeuser",
    "attributes": {
        "nickname" : "Joe",
        "email": "joeuser@somewhere.com"
    }
}
```


# Dynamo Table Structure

An easy way to understand what's happening with the AppSync GraphQL API and how the clients work is to envision what data looks like in the Dynamo tables.  Overall, the tables match the GraphQL schema directly, nearly 1:1 for convenience sake.  Warning: this isn't a good model for using Dynamo DB with large data!  Dynamo is a NOSQL data store, which means you don't model your data into tables like this.  Dynamo DB isn't SQL and it doesn't support joins.  This is a good thing.  This is a tiny "play" database, so we're cheating here and mis-using Dynamo because it makes AppSync and the whole Quiz Show product simpler.

**A note on AppSync structure:**  *A better way of designing this for a production system is to have everything in a single table, or at least look for places to combine things, such as including all categories in the QuizGames table, instead of breaking them out separately.  The purpose of this demo program is to show how a bunch of Resolvers for different tables work together to assemble return structures for clients, and not necessarily how to design efficient data storage.*


## QuizGames

Holds one Item for each game.  A Game has an owner, tied to the ID from Cognito.  Items contain all the meta-data about a game and the key in QuizGame is used as a "foreign key" in the other tables where needed.

| gameId | emcee    | title              |
|-------:|----------|--------------------|
|     56 | joeuser  | Spelling Bee       |
|    109 | hchen    | Networking         |
|   7006 | asultan  | Driver's Test Prep |

Indexes:

* **Primary:** gameId (HASH), *used as typical, artificial key for assembling URLs, and for others to reach a QuizGame from another device*
* **GSI OwnerByGameId:** emcee (HASH) + gameId (RANGE), *search by owner and get a list of IDs*


## QuizCategories

Separate table with just Category names.  This also has a separate, unique ID for every Category, which you'll need to match-up questions from QuizQuestions below.

| gameId  | catgId | categoryName     |
|--------:|-------:|------------------|
|     109 |     10 | OSI Stack        |
|     109 |     11 | "Be The Packet"  |
|     109 |     12 | Unix Commands    |
|    7006 |     77 | Street Signs     |
|    7006 |     78 | Road Safety      |

Indexes:

* **Primary:** gameId (HASH) + catgId (RANGE), *usual way in is to start from a QuizGames Item and use it's ID to find all categories here*


## QuizQuestions

Each Item is a single question for a QuizGame.  Foreign Key to QuizCategories for the category name.

| catgId | quesId | points | question             | answer    | state
|-------:|-------:|-------:|----------------------|-----------|-------------
|     12 |      1 |     50 | Show net interfaces? | ifconfig  | closed
|     10 |      2 |    100 | Layer 4 protocols?   | TCP, UDP  | closed
|     12 |      3 |    325 | Open sockets?        | netstat   |
|     77 |      4 |    200 | Red octagon?         | Stop sign |
|     78 |      5 |    300 | Safe distance?       | 2 seconds |

Indexes:

* **Primary:** catgId (HASH) + quesId (RANGE), *to get all question Items for a gameId*
* **GSI QuesId:** quesId (HASH), *during game play for people to retrieve individual questions*


## QuizContestants

Each Item is a person who is playing a particular Game.  There is no Dynamo representation of just a person.  We're using Cognito User Pools which carry their own Attributes like name and login.  This is sufficient as the database of record for human name info.  Contestants are logged-in Users from a Cognito User Pool that are playing a game.  Because of this, each Item in QuizContestants carries their current score.

| gameId | login  | name        | score
|-------:|--------|-------------|------:
|     12 | asmith | Agnet Smith |   500
|     12 | jbond  | James Bond  | 12900
|     12 | msmart | Max Smart   |     0
|     53 | deter  | Deter M.    |  1400
|     53 | harold | Harold      |   100

Indexes:

* **Primary:** gameId (HASH) + login (RANGE), *to get all people playing a game, or to get/update the current score for a player*
