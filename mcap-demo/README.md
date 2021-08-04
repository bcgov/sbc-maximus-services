# ServiceBC Multi-Channel Access Pages (MCAP)

### Prerequisites

In order to setup Web Chat or Live Assist (Video Chat and Co-Browse), the following information is required from Service BC:
- Agent Skill / Reason Code - This is a dedicated queue assigned by Service BC for the purpose of replicating the functionalites of Web Chat and Live Assist.
- MCAP URL - This is a URL (depending on the environment required - Test or Production) that is required in the form template in order to gain access to Web Chat or Live Assist. This URL will be provided by SBC when required. In order to use this service, please contact Service BC at SBCContactCentreInfo@gov.bc.ca

### MCAP Multi-Channel Contact Centre Functions

This project contains examples of how to build web pages that can implement Service BC Multi-Channel Contact centre functions. The functions demonstrated in this project are:

- Web Chat - Web Chat is a method for citizens to chat online with an SBC representative to assist in Government Services.

- Co-Browse - Co-Browse is an online function to provide the citizen the ability to share their screen with a SBC representative.

You can run all these application locally on your computer. Instructions for doing so are included in the `README.MD` file included in each sub-project.  No special infrastructure or software is required. They can all be run using readily available free software, well-known to all web developers, such as Visual Studio Code, node.js, etc.  Some of the example applications can be run directly from a browser with no additional software.

All of the example pages contained herein require familiarity with web page development including html, css and javascript.  Familiarity with the JQuery javascript library would be very useful as well as some minimal understanding of Bootstrap CSS, although that is not as important unless you want to modify the look and feel of the underlying controls.

### MCAP Single Page Demo App (src/demo-spa)
  This is a Single Page Application (SPA) "Contact Us" page written with JQuery and Bootstrap to demonstrate a full user experience page.  It contains links to the 3 functions that are the core of MCAP.  Many of the links on this page are just placeholders and have no real functions.  Some familiarity with jQuery and Bootstrap is required to use and modify this SPA.

### Simple html-based examples (src/examples)
  There are 3 simplified example applications:
  - Web Chat
  - CoBrowse
  - Schedule (hours of operation)

These example sub-projects contain the minimal html/css/javascript required to implement each of the MCAP functions they demonstrate.  These examples do not require node.js or any other infrastructure to run.  They can be run directly from a browser or placed on any web server and used directly.  For more information please refer to the `README.MD` in each sub-project.

Please note the code contained herein is example code only. This code can be used as a starting 
point for developing your own production application but is not intended or expected to be 
interpreted as a supported or finished project. 


### FREQUENTLY ASKED QUESTIONS (FAQ) 

Visit the Service BC MCAP Wiki Page to view the Frequently asked questions (FAQ) https://github.com/bcgov/sbc-mcap/wiki/Service-BC-MCAP-Frequently-Asked-Questions-(FAQ)
