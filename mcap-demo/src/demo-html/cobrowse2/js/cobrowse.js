
//  Test Environment
 const url = "https://t1cobrowse.maximusbc.ca/surfly.js";
 const widget_key = "d37355ecd9714593bbefbcf498e58206";

//  Prod Environment
//const widget_key = "e6da7b3cf6c94e7a8a8a0674a0cd14f5"; // prod
//const url = "https://cobrowse.maximusbc.ca/surfly.js";

//Preserve data entered into form fields
let dataStore;
let umaskField;
let umaskContent;
let maskField;
let maskContent;

window.setTimeout(function () {
  dataStore = window.sessionStorage;
  umaskField = document.getElementById("umask");
  umaskContent = dataStore.getItem("umask");
  maskField = document.getElementById("mask");
  maskContent = dataStore.getItem("mask");
  if (umaskContent) {
    umaskField.value = umaskContent;
  };
  umaskField.addEventListener("input", function () {
    umaskContent = umaskField.value;
    dataStore.setItem("umask", umaskContent);
  });
  if (maskContent) {
    maskField.value = maskContent;
  };
  maskField.addEventListener("input", function () {
    maskContent = maskField.value;
    dataStore.setItem("mask", maskContent);
  });
}, 0);

(function (s, u, r, f, l, y) {
  s[f] = s[f] || {
    init: function () {
      s[f].q = arguments;
    },
  };
  l = u.createElement(r);
  y = u.getElementsByTagName(r)[0];
  l.async = 1;
  l.src = url;
  y.parentNode.insertBefore(l, y);
})(window, document, "script", "Surfly");

const settings = {
  // Surfly session options can be set here, or at the Company/Plan levels.
  widget_key,
  private_session: true, // to make sure only logged in agents can join the call
  require_password: false,
  hide_selector: '.masked',
};

Surfly.init(settings, function (initResult) {
  if (initResult.success) {
    // API calls can now be made!
    if (!Surfly.isInsideSession) {
      Surfly.button();  // Comment this to not show the default button
      
      //Set initial availability
      surflyAvailable( Surfly.agentAvailable );
      console.log("Availability initialised")
      //Set listener to detect availability change
      Surfly.on('agent_status', function(api, event) {
        surflyAvailable( event.available );
        console.log("Availability event:", event.available);
      });
    }
  } else {
    console.log("Surfly was unable to initialize properly.");
    let btn = document.getElementById('surflyBtn');
    btn.disabled = true;
    btn.innerText = "Failed to Initialize";
  }
});

function surflyAvailable(enable) {
  let btn = document.getElementById('surflyBtn');
  if ( enable ) {
    console.log('There is an available support agent');
    btn.disabled = false;
    btn.innerText = "Request Assistance";
  } else {
    console.log('There are no support agents available at the moment');
    btn.disabled = true;
    btn.innerText = "No Agents Available";
  }
}

function changePage() {
  window.location = '/cobrowse';
}
