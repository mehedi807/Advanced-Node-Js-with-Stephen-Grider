// Goal : OS async operation
// All the network operation are part of OS-task and does not run in the event loop

// Output :    590 (ms)
//             595
//             596
//             598

const https = require("https");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest();
doRequest();
doRequest();
doRequest();
