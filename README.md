# WFH API 
### What is this?
We at pebble have an remote working policy, so to help find out who is working where; we have built a system to show the list of workers and thier status. For more details see our blogpost:http://pebblecode.com/blog/hack-day-wfh-bot/ Do you also work in a remote workplace and using slack? Deploy your own, and start building things with the api.

This repo contains a node implementation of the pebble {code}the wfh api, more details see blogpost: http://pebblecode.com/blog/hack-day-wfh-bot/


###functionality
This adds the following slash commands in slack:
`/wfo`
`/wfh`

### Slack slash command parameters
message: `/wfh message:I'll be at home in my pants` or `/wfo message:I'll be at the stand up desk today`
default: `/wfh default:wfo` this allows your default location to be either `wfh,wfo` 

The first time a user does /wfh, /wfo opts the user into the system. After that they will be shown in the api response /workers.


#Have your own instance of WFH. [![Deploy your own!](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fpebblecode%2Fwfh3_backend)
You will need to configure Slack slash [commands](https://slack.com/services#service_16).
use `/wfh` and `/wfo` to point to: `/webhooks/slack`, use a post request and add the tokens to the apps environment variables

#Deployment
- Up to you. we currently use heroku. 
- Deploy your own.  
[![Deploy your own!](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https%3A%2F%2Fgithub.com%2Fpebblecode%2Fwfh3_backend)
- DB is [couchdb](http://couchdb.apache.org/) and easily hosted on [Cloudant](https://cloudant.com/) create a database called: `wfh`
- #####ENV variables Set the following to get your app up and running
    - COUCHDB_USERNAME
    - COUCHDB_PASSWORD
    - COUCHDB_URL
    - COUCHDB_PORT
    - COUCHDB_NAME

    - SEGMENT_IO_WRITE_KEY (optional) used for tracking and graphs to work out averages for sickness, holiday, out of office etc.
    - SLACK_TOKEN used to get a users profile see slack [docs](https://api.slack.com/).


#Development && installation
[Install CouchDB](http://couchdb.apache.org/#download) and run.
For a nicer couch db ui install: `npm i -g fauxton` then in a new shell run `fauxton`

`npm i && npm i -g nodemon`
start server locally
`npm run dev`

When NODE_ENV === 'development' connection will be made with localhost couchdb. 

###Configuration for local development.
Copy `config.template.js > config.js` and complete the default fields `getEnv('ENV_VAR','DEFAULT_VALUE')`,
to get a slack token visit: https://api.slack.com/web


#Endpoints

| path       |  method | payload | details |
|------------|---------|---------|---------|
|   /workers |   GET   |         | get all workers, used by email cron and tv display |
|   /workers |   POST   |   `{"name":"John Snow", "email":"john.snow@pebblecode.com", status:"Sick" }`  | create a new worker, `"message": "your message"` is optional |
| /workers   | PUT | `{"email":"john.snow@pebblecode.com", "status":"Holiday"}` | Update status for worker|


#Helpful Links
 - Slack [api](https://api.slack.com/).
 - [Segment](https://segment.io).

#Contributing 
Awesome! Get in touch first, make an issue to discuss your change and we can go from there. Will be followed by a PR.

# TODO:
- Add functionality to delete workers (use slack as source of truth. slack api)
- Websocket support for connecting devices
- Docker deployment - fix bcrypt build errors: https://github.com/ncb000gt/node.bcrypt.js/issues/368

