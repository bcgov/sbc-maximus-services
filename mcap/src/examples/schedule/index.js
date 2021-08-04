$(document).ready(() => {
  $("#statusButton").on("click", showStatus);
});

const BASEURL =
  "https://mcap-schedule-3a0694-test.apps.silver.devops.gov.bc.ca/api/status/";
const BASELOCAL = "http://localhost:8080/api/status/";  // for development purposes only

const showStatus = function () {
  const code = $("#code").val();
  const url = BASEURL + code;

  $.ajax({ url, dataType: "json" })
    .done(result => {
      console.log("then", result);
      $("#statusText").html(result.status);
    })
    .fail((err) => {
      console.log(err.status);
      $("#statusText").html("Error");
    });
};
