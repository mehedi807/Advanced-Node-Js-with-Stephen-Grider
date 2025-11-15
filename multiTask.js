// Goal : Analyze Node behaviour on differnt task,
//          : network request , disk I/O and cpu bound task

// Output: Http: 600 (ms)
//         Hash: 809
//         FS: 809 (!!)  --> (normally takes about 1-5 ms)
//         Hash: 837
//         Hash: 877
//         Hash: 921

// Since node can use 4 threads (default) in the event loop we can see a concurrency here
// But its critical to understand why readFile() takes 809 ms when run with 5 event loop task
// So, readFile works in 2 phase :First get the stat() and then read()
// on first stat() call the thread got aquired by doHash() (was in the queue)
// so, when stat() returns it goes to queue first and call read() when the first doHash() is done
// thats why we see fs in the 2nd and tooks about 809 ms

const https = require("https");
const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Http : ", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash : ", Date.now() - start);
  });
}

function readFile() {
  fs.readFile("schedule.js", "utf8", () => {
    console.log("FS : ", Date.now() - start);
  });
}

doRequest();
readFile();
doHash();
doHash();
doHash();
doHash();
