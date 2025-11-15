//GOAL : Understand different scheduiling function

// 1. process.nextTick() :
//	* Has highest priority
//	* part of V8 microtask
//	* Runs immedietly after current syncronous opeation is done
//	* Runs even before event loop

// 2. Promise.resolve().then()
//	* High priority
//	* part of V8 microtask
//	* Only runs when call stack is empty (standared way to schedule a microtask)
//	* also Runs before event loop

// 3. setImmediate()
//	* part of libuv
//	* Runs when event loop goes to 'check' phase ('check' phase happens after 'pool' phase)
//	* has similar priority on normal script but always First inside an I/O callback

// 4. setTimeout()
//	* part of libuv
//	* Runs when event loop goes to 'timer' phase

//Output :
//	process.nextTick
//	Promise/Microtask
//	setTimeout (0ms)
//	setImmediate

//	--Now inside I/O callback--
//	I/O: setImmediate (ALWAYS FIRST)
//	I/O: setTimeout (0ms)

const fs = require("fs");

setTimeout(() => {
  console.log("setTimeout (0ms)");
}, 0);

setImmediate(() => {
  console.log(" setImmediate");
});

Promise.resolve().then(() => {
  console.log("Promise/Microtask");
});

process.nextTick(() => {
  console.log("process.nextTick");
});

fs.readFile(__filename, () => {
  console.log("--Now inside I/O callback--");
  setTimeout(() => {
    console.log("I/O: setTimeout (0ms)");
  }, 0);

  setImmediate(() => {
    console.log("I/O: setImmediate (ALWAYS FIRST)");
  });
});
