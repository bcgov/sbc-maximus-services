# Schedule Web Service

This directory contains an example of how to use the Schedule Web Service.  You can run this example page from any http server or even as a local file directly from your browser.

The Schedule Web Service returns the open/closed status for a given MCAP service and is called with with an http GET request as shown in the code.  The BASEURL for the web servide is :
```
TEST:
https://mcap-schedule-3a0694-test.apps.silver.devops.gov.bc.ca/api/status/

PRODUCTION:
https://mcap-schedule-3a0694-prod.apps.silver.devops.gov.bc.ca/api/status/
```

The Schedule Web Service requires a single parameter which specifies which MCAP service status is being requested. This paramter is appended to the BASEURL. 

For example, the code for Service BC Web Chat might be:  `SBC_WebChat`.  The TEST url to query the open/closed status for Service BC Web Chat would then be:
```
https://mcap-schedule-3a0694-test.apps.silver.devops.gov.bc.ca/api/status/SBC_WebChat
```

The Schedule Web Service returns a JSON object with the current open/closed status for the service code specified.  Foe example:

```
{"status":"open"}
```

The example page included demontrates how to use this web service in an html application

To use the example page:
1. Open index.html with your browser
2. Eit the Service code as needed
3. Click the "Get Open/Closed Status" button
