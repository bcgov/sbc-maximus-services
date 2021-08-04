
//  Test Environment
const url = "https://t1cobrowse.maximusbc.ca/surfly.js";
const widget_key = "d37355ecd9714593bbefbcf498e58206";

//  Prod Environment
// const widget_key = "e6da7b3cf6c94e7a8a8a0674a0cd14f5"; // prod
// const url = "https://cobrowse.maximusbc.ca/surfly.js";

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
// var settings = {
//   // Surfly session options can be set here, or at the Company/Plan levels.
//   widget_key: "d37355ecd9714593bbefbcf498e58206",
//   private_session: true, // to make sure only logged in agents can join the call
//   require_password: false,
// };

Surfly.init(settings, function (initResult) {
  if (initResult.success) {
    // API calls can now be made!
    if (!Surfly.isInsideSession) {
      Surfly.button();  // Comment this to not show the default button
    }
  } else {
    console.log("Surfly was unable to initialize properly.");
  }
});
