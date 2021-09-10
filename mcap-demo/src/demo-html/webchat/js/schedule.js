// This code is only used to check the webchat open/closed status
// it is not needed for core Webchat functionality
(function () {
  const URL = "https://mcap-schedule-3a0694-test.apps.silver.devops.gov.bc.ca/api/status/SBC_WebChat";

  axios.get(URL)
    .then(res => {
      const schedule = res.data;
      // console.log(`status`, schedule);
      const closed = schedule.status === "closed";

      // This will disable any button with class="scheduled" if closed
      const buttons = document.querySelectorAll('button.scheduled');
      for (const button of buttons) {
        button.disabled = closed;
        button.innerHTML=`Start WebChat (${closed?"Closed":"Open"})`;
      }
      const div = document.querySelector('span.schedule');
      div.innerHTML = "Service " + schedule.status;

    })
    .catch(error => console.error(error));

})();   // Runs this function once when page loads
