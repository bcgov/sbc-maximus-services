## CoBrowse Simple Example Page

This is a basic single file example for how to open a CoBrowse session.

\*Note:
A web page with a CoBrowse function MUST be available on the internet to function correctly. If you try to run or test a cobrowse page on localhost it will not function. For development purpose you will have to use something like "ngrok" or "localtunnel" to obtain a temporary public url in order to test and run the code. Fortunately this is very easy and both of these are node modules that can be installed using npm or yarn.

## Running the CoBrowse Demo page

- Install localtunnel or similar proxy. `npm i -g localtunnel`
- Start any http server to serve the page. `npx http-server`
- Start localtunnel in another terminal window. `lt --port <http server port>`
- browse to the url provided by the proxy (you may get a localtunnel splash screen first)
- Click on the "Start a Session" button or the floating "Get Live Help" icon
- You should see a dialog with a "Support PIN". The session is now avaiable

If you clicked on the button and nothing happened there is a good chance that you are not using a public url to access this page. See the node above regarding using a public proxy

The file `index.html` is the `"hello world"` equivalent of a CoBrowse. It contains the bare minimum to start a CoBrowse session. In this file is a single button with a `onClick` handler which will start a CoBrowse session. An optional floating "Get Live Help" button is also displayed. The asociated `index.js` file is loaded by `index.html` and handles initialization of CoBrowse.

## Masking of Page Components

It is possible to "mask" elements on a webpage so that they cannot be seen by the agent (follower) during the cobrowse session.

## Element masking

With element masking, you can hide whole HTML elements from followers. All you need to do is add the CSS selectors of these elements to option “hide_selector” and within a cobrowse session followers will no longer be able to see the elements, but instead, grey censored areas.
You can set this option through the the Javascript API.

```

<script>
  (function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
  l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
  l.src='https://surfly.com/surfly.js';y.parentNode.insertBefore(l,y);})
  (window,document,'script','Surfly');

  const settings = {
    // Here you can add all the session options
    widget_key: '** your widget key **',
    hide_selector: '.myFormClass #myInputID *',  // These selectors will be masked
  };

  Surfly.init(settings, function(init) {
  if (init.success && !Surfly.isInsideSession) {
      Surfly.session()
      // Show a follower link
      .on("session_started", function(session, event) {
          document.querySelector('#followerLink').href = session.followerLink;
      })

      // Start a Surfly session as a leader
      .startLeader();
  }
  });
</script>

```

### Customizing masked elements

We add a special CSS class `surfly-masked` to all masked elements. You can change the look of masked elements by adding CSS rules for this class.

## Control dependent appearance

During your co-browsing session it’s possible to pass control of the page between participants. It’s also possible to change the behaviour of your website while co-browsing, depending on who has control. We can use the example of filling out a payment form as a proof of concept to demonstrate how this might be useful.

Let’s say you are co-browsing with a customer and the agent has taken over control, but you don’t want them to be able to submit forms or orders. With the .on() method we can disable the submit button when the agent is given control, only allowing the customer to confirm the payment:

```
<script>
  (function(s,u,r,f,l,y){s[f]=s[f]||{init:function(){s[f].q=arguments}};
  l=u.createElement(r);y=u.getElementsByTagName(r)[0];l.async=1;
  l.src='https://surfly.com/surfly.js';y.parentNode.insertBefore(l,y);})
  (window,document,'script','Surfly');

  Surfly.init({widget_key:'**your widget key here**'}, function(init) {
    if (init.success) {

      // display the default Surfly button
      Surfly.button();

      // ADD THE PART BELOW TO THE BASIC SURFLY init.success()
      let sess;
      if(!Surfly.currentSession){
        sess = Surfly.session();
      }
      else {
        sess = Surfly.currentSession;
      }

      sess.on('control', function(session, event) {
        const element = document.getElementById("order_button");
        // Specify that you DON'T want the limitations to apply to the leader
        // Use index 0 for the leader, and 1, 2, etc. for the followers

        if (event.to === 0) {
          element.disabled = false;
          element.style.backgroundColor = "#87cefa";
        }
        // Apply the limitations to everyone else when they are in control
        else {
          element.disabled = true;
          element.style.backgroundColor = "#e6fff2";
        }

      })
      // UNTIL HERE

    }
  });
</script>
```
