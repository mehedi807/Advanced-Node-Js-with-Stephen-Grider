//GOAL : 1. Understand,why Node is not actually single threaded
//	 2. Thread pool	- 4 thread
//	 3. pbkdft (cpu bound) executes in the thread pool

//Output : execution time in ms
//	2 :  911
//	3 :  917
//	1 :  921
//	4 :  933
//	5 :  1346 (max 4 thread so it executes when one/some thread is available)

const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a','b',100000,512,'sha512',() => {
	console.log("1 : ",Date.now() - start);
})

crypto.pbkdf2('a','b',100000,512,'sha512',() => {
	console.log("2 : ",Date.now() - start);
})

crypto.pbkdf2('a','b',100000,512,'sha512',() => {
	console.log("3 : ",Date.now() - start);
})

crypto.pbkdf2('a','b',100000,512,'sha512',() => {
	console.log("4 : ",Date.now() - start);
})

crypto.pbkdf2('a','b',100000,512,'sha512',() => {
	console.log("5 : ",Date.now() - start);
})
