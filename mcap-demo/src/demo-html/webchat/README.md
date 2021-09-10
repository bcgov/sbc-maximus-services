# Web Chat Example Code

### index.html

This is a basic single file example for how to open a Web Chat session
You can run this from any http server or even as a local file directly from your browser. It requires no Javascript for its basic operation although you may decide to add your own scripting for enhanced features.
A Web Chat session must be started with an http POST request as shown in the code.  It is possible to wrap a POST in a GET as shown in the autopost example below.

To use:
1. Edit the "action" attribute of the form element if needed
2. Open index.html with your browser
3. Click the "Start WebChat" button

## Description

The file `index.html` is the `"hello world"` equivalent of a Web Chat page.  It contains the bare minimum to open up a Web Chat session in a 'popup' window.  A Web Chat session can be started from an http POST with the parameters shown in the file. The `form` is an example of the sort of POST that is required to start Web Chat. You will notice that no javascript files are required to start a Web Chat session. All that is required is a POST to the specified url.  There is a `schedule.js` file included with this example but that is only used to demonstrate how to integrate the schedule service into a page.  It is not required for WebChat to work

The file `autopost.html` is identical to `index.html` but has some added javascript code to automatically perform the `submit` action on the form rather than requiring a user to press `Submit`.  It could be used in cases where a simple html link was desired rather than a form.  It performs exactly the same function as `index.html` but just posts immediately when loaded.

The file `index-auto.html` is an example of how one might use `autopost.html`.  It is self documenting.

The file `js/schedule.js` is an example of making a web service call to determine if the WebChat service is Open or Closed. It is also self documenting. 

## Running the Web Chat Demo page(s)
Since no Javascript is used in the Web Chat demo page, the easiest way to run them is to simply open them directly in your browser.  For example, from a Windows computer, double click on any of the 3 files to open.  You will be able to start a Web Chat session.

You can also open the Web Chat demo pages from within the node.js mini web server application included with the SPA Demo page.  Simply start that node app and navigate to: http://localhost:8080/webchat/ for the main index.html file or http://localhost:8080/webchat/index-auto.html for the auto-post example page.

Note, depending on the time of day and other factors, the Web Chat page may not open immediately. It may take an couple of tries for it to respond.

