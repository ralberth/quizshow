# How To Build and Install

This uses AWS as the server (AppSync specifically) and stores data in Dynamo DB.  This means you'll need an AWS account and have basic knowledge on how to administer cloud resources.  It's a good skill to have, cloud computing is the new normal.  This assumes you're familiar with Dynamo DB, AppSync, CloudFormation, CloudWatch, S3, CloudFront, and so on.

The static website is built locally, then uploaded to AWS and served via CloudFront and S3.


## Install the Dynamo tables, AppSync stuff, AWS resources

Set environment variables so the `cdk` command below knows where to install everything.  Probably best to put this in a shell startup file.

```bash
export QUIZSHOW_REGION='us-east-1'
export QUIZSHOW_ACCOUNT=123456789012
```

Build and install the resources (other than website files below) into the AWS account set above:

```bash
cd server
npm install
npm run build
cdk deploy
```

If you see `Need to perform AWS calls for account 123456789012, but no credentials found. Tried: default credentials`, you probably are using a plugin or other invalid setup in your `~/.aws/config` file.  Rename it out of the way and try again.

If you run into other issues, make sure you have followed the [CDK getting started guide][1].

You should see a CloudFormation stack named "QuizShow" in your AWS account above.  You now have Dynamo tables and AppSync stuff setup, but the tables are empty and there are no website files.


## Website

The cdk command above created an S3 bucket based on your shell login name to hold the website files in this step, along with a CloudFront distribution pointing to it.  It's all ready, we just need to upload the actual static website files from the `website/` folder.

When you `git clone`d the repo, file `website/src/config/config.json` contained default values that need editing.  Edit this file and replace values with your specific things in AWS.  Use the AWS console to pull them from AppSync and Cognito and paste them into this file.

Generate the website files and upload them to S3:

```bash
cd website
npm install
npm run build
cd build
aws s3 sync . s3://quizshow-$USER-cloudfront-origin
```

You can double-check that files are where they should be via `aws s3 ls s3://quizshow-$USER-cloudfront-origin`.  You should see `index.html` and a bunch of other things.

The HTTP endpoint serving browser requests for the website are in CloudFormation.  See the generated URL you should use by listing available CloudFront distributions:

```
aws cloudfront list-distributions
```

For example:

```
blah
```

## QuizShow Command-line Tool

To make it simpler to manage the QuizShow app and data, there is a small command-line tool in the `cmdline/` folder.  It's a Node.JS app you run with arguments to do things.  Build the tool so you can use it below:

```bash
cd cmdline
npm install
```

The cmdline is built so it'll work regardless of what you have in your Cognito User Pool, and if you have any users in the "emcee" group.  It uses the API KEY method of authenticating with AppSync, which was created by the cdk command above.  Login in to the AWS console, go to App Sync > Settings, and scroll down a touch.  You'll find the generated api key there.  It starts with "!!!-".

Like above, set environment variables, probably in your shell startup files:

```bash
export QUIZSHOW_GRAPHQL="https://blahblah.appsync-api.us-east-1.amazonaws.com/graphql"
export QUIZSHOW_REGION="us-east-1"   # just in case you forgot above :-)
export QUIZSHOW_APIKEY="da2-blahblahblah"  # api key from AWS console above
```


Test that it's working:

```bash
./quizshow --help
```


# Install sample data to play with

To load the sample games into Dynamo so you have something to play with, go get (temporary) IAM user/role access/secret/session keys and set them as environment variables, then:

```bash
cd cmdline
./quizshow loadgame ../samplegames/[A-Z]*.csv
```

At this point, there are QuizShow games in the Dynamo tables ready to go.  You can go to the website, create a Cognito account, and go nuts.

If you are interested in simulating a bunch of users so the application looks more "lived-in", use the command below to create a bunch of pretend contestants.  A Contestant belongs to a specific game, so login to the AWS console, and look at the `QuizGames` table.  Column `gameId` is what you're looking for.  You'll use it below.

```bash
./quizshow contestants   \
    --datafile ../samplegames/contestants.csv    # has contestant raw data, like names
    --quantity 30                                # how many people to create
    --gameid 123                                 # what you found in Dynamo QuizGames above
```

When done, check out Dynamo table `QuizContestants`.  They'll appear in the game as the leader board on player's screens.

Once you have contestants loaded, you'll want to see the game in action as if there were many people all playing along.  Given a specific quesId from the database, run this script to have a bunch of contestants loaded above all "buzz in" in rapid succession:

```bash
./quizshow nominees --quesid 456 --quantity 10
```

# Security

Security setup is simple: all users create accounts via the QuizShow website, which are stored in a Cognito User Pool named `QuizShow`.  Anyone can create an account with no restrictions.  Any user may join any game and play along.

Only emcees may host a game (big screen showing all questions and point values) or run a game.  To be an emcee:

1. Login to the AWS account and select the `QuizShow` Cognito User Pool
1. Under Users and Groups, select the Groups tab at top
1. Create a new Group named "emcee"
1. Add each user who should have emcee ability


# For Developers

## Helpful cdk commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


## How to develop

Easy: `cd website && npm start`.  This starts up a browser window and launches the website.  Edit files and save them.  When files change on disk, they are automatically re-bundled and the browser refreshes the page for you.

Keep a console window open on the browser to see messages from the application.


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


## How to Prepare for Production

Clear out the Cognito User Pool, other than your account.

Remove everyone from Cognito group "emcee" other than yourself.

Change IOPS on the Dynamo tables to support a bunch of users at once.

Clear out the Dynamo tables:

```bash
./quizshow cleantables
```

Load ony the game(s) you intend to use:

```bash
./quizshow loadgame ~/mygames/fubar.csv
```


## Cognito User Pool Structure

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

Using `withAuthenticator()` in `index.js` makes sure all people have to sign-in (or sign-up and sign-in) before the app is rendered.  Once signed-in, `Auth.currentAuthenticatedUser()` will return (via a promise) an object that looks like this:

```json
{
    "username": "joeuser",
    "attributes": {
        "nickname": "Joe",
        "email": "joeuser@somewhere.com",
        "custom:organization": "Initech"
    },
    "signInUserSession": {
        "idToken": {
            "jwtToken": "eyJraWQiOiJXWXZvcEFFczZOVDJEb3JJa...",
            "payload": {
                "custom:organization": "Initech",
                "email": "joeuser@somewhere.com",
                "cognito:groups": [ "emcee" ]
            }
        }
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
