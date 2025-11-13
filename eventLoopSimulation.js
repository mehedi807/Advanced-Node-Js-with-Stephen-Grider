//GOAL : Simulating event loop 

const pendingTimers = [];
const pendingOSTask = [];
const pendingOperation = [];

function shouldContinue(){
	//check 1 : Pending setImmediate,setTimeout,
	//check 2 : Pending OS task (http)
	//check 3 : Pending long running operation (fs)
	
	return pendingTimers.length || pendingOSTask.length || pendingOperation.length;
}
while(shouldContinue){
	//check pending Timers/task/operation and calls relevent callback
	//handle "close" events
}
