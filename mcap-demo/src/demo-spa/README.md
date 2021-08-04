# MCAP Single Page Demo App (src/demo-spa)

This sub-project is a Single Page Application (SPA) "Contact Us" page written with JQuery and Bootstrap to demonstrate a full user experience page.  It displays functions that are the core of MCAP.  Many of the links on this page are just placeholders and have no real functionality.  Some familiarity with jQuery and Bootstrap is required to use and modify this SPA. In this readme we will cover how to setup your local environment to edit and run this SPA.  

This example page requires familiarity with web page development including html, css and javascript.  This application also makes extensive use of the JQuery javascript library Bootstrap CSS.  You do not need to be an expert in Bootstrap but you should have JQuery experience to understand what it's doing.

This SPA Demo Page was developed to showcase the MCAP functions but is not intended to be used as an example of a production site.  Developers who wish to incorporate these  functions into their own applications should refer to the src/examples directory.

## Installing the Project Locally
To install this project on your local development environment simple perform the following steps:
- Ensure you have node.js installed. v12.x or higher is best
- Clone the MCAP project
- From the terminal change to the project directory: `#cd sbc-mcap`
- Install the required node modules `#npm install`
- Ensure you have the required enviroment variables set (see below)
- Run the node app that serves the static pages `#npm start`

*Note: 
To access the CoBrowse function the page MUST be available on the internet to function correctly. If you try to access a cobrowse page on localhost it will not function.  For development purposes you should use a proxy server such as "ngrok" or "localtunnel" to obtain a temporary public url in order to test the code.  Fortunately this is very easy and both are node modules that can be installed using npm or yarn.  For detailed instructons on this refer to the README in the cobrowse example app of this project

## Web Server node Application
`server.js` is a small node.js web server application that serves the static files of the SPA demo application.  This aplication serves the demo static pages and exposes a single web service endpoint `/api/env` which the page accesses one time, on startup

## Environment Variables
The following environment variables are required by the Demo application:

- COBROWSE_URL = https://testchatservices.maximusbc.ca/Home/Chat
- COBROWSE_KEY = (your cobrowse key)
- WEBCHAT_URL = https://t1cobrowse.maximusbc.ca/surfly.js

The demo application uses the `dotenv` node module to read these items from an optional `.env` file if they are not present in the OS environment.  You can also setup a launch config in your Visual Studio Code IDE to set these environment variables at launch.

## Running the SPA Demo page
Once you have the static pages available, either through the development node application or on your own web server, browse to the url of the SPA Demo page.  For a localhost setup the url will be http://localhost:8080  or the url provided by your proxy if testing cobrowse features.

These are instructions for running the Demo application using localtunnel

- Install localtunnel or similar proxy.  `npm i -g localtunnel`
- Start the demo app.  `npm start`
- Start localtunnel in another terminal window.  `lt --port 8080`<br>
(note you can optionally choose your own subdomain with the `-s` option)
- Browse to the url provided by the proxy (you may get a localtunnel splash screen first)

<i>Please note the code contained in this project is example code only. This code can be used as a starting point for a developing your own production application but is not intended or expected to be 
interpreted as a supported or finished project. </i>


