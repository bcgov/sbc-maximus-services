const EXPAND_CLASS = "expanded";
const MOBILE_MAX_WIDTH = 767; //px

var config = {
  WEBCHAT_URL: "",
  COBROWSE_URL: "",
  COBROWSE_KEY: ""
};

$(function () {
  // Hide maintenance section on start
  $("div#maintenance").hide();

  // Fetch config from back end
  const request = $.get("/api/env");
  request.done(function (data) {
    config = { ...config, ...data };
    console.log(config);
    if (config.WEBCHAT_URL) {
      $(".chatpopup").attr("action", config.WEBCHAT_URL);
    }

    // initialize coBrowse after config is fetched
    initCoBrowse();
  });
  request.fail(e => console.log(e, e.status, e.statusText));

  $("#cobrowse_start").on("click", startCoBrowse);
  $("#main-content .collapse").on("show.bs.collapse", expandSection);

  // Close collapsible sections when clicking outside.
  $("body").on("click", function () {
    $("#main-content .collapse.in").collapse("hide");
  });

  $("#main-content .collapse").on("click", function (e) {
    e.stopPropagation();

    // Don't stop event if it's form  fission
    if (e.target.type === "submit") return true;
    if (e.target.href) return true;
    return false;
  });

});

const startCoBrowse = function () {
  Surfly.session().startLeader();
};

const initCoBrowse = function () {
  (function (s, u, r, f, l, y) {
    s[f] = s[f] || {
      init: function () {
        s[f].q = arguments;
      },
    };
    l = u.createElement(r);
    y = u.getElementsByTagName(r)[0];
    l.async = 1;
    l.src = config.COBROWSE_URL;
    y.parentNode.insertBefore(l, y);
  })(window, document, "script", "Surfly");

  var settings = {
    // Surfly session options can be set here, or at the Company/Plan levels.
    widget_key: config.COBROWSE_KEY,
    private_session: true, // to make sure only logged in agents can join the call
    require_password: false,
  };

  Surfly.init(settings, function (initResult) {
    if (initResult.success) {
      // API calls can now be made!
      if (!Surfly.isInsideSession) {
        // Surfly.button();   // Show floating cobrowse button
      }
    } else {
      console.log("CoBrowse was unable to initialize");
    }
  });

};

function scrollTo($el, scrollTime) {
  if (!scrollTime) scrollTime = 500;
  setTimeout(function () {
    $("html, body").animate(
      {
        scrollTop: $el.offset().top - 75,
      },
      scrollTime
    );
  }, 250);
}

function expandSection() {
  // console.log($(this).attr('id'));
  // console.log($(this).children());

  //1. Make sure it's full-width (for desktop breakpoints)
  //2. Make sure it starts at the left (matching #main-content)
  // console.log("expand");

  // Close all others
  if ($("#main-content .collapse.in").length) {
    $("#main-content .collapse").collapse("hide");
  }

  // Full width
  var position = $("#main-content").position().left - $(this).position().left;
  var position = position + 45; //account for #main-content padding
  var baseWidth = parseInt($("#main-content").css("width"), 10);
  var width = baseWidth - position;
  $(this).css("width", width);

  // Start on left matching #main-content
  if ($(window).width() > MOBILE_MAX_WIDTH) {
    var mainOffset = $("#main-content").offset().left;
    // let dataParent = $(this).attr('data-parent');
    var parent = $(this).parents(".sbc-section");
    if (parent.length) {
      var parentOffset = $(this).parents(".sbc-section").offset().left;
      // var parentOffset = dataParent ? $(dataParent).offset().left  : $(this).parents('.sbc-section').offset().left
      var offset = mainOffset - parentOffset;
      offset += 15; //account for padding
      $(this).css("left", offset);
    }
  }
}
