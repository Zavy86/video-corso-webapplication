window.addEventListener('DOMContentLoaded',function(e){
	console.log("* dom loaded");
	addButtonsEventListener();
	loadFromStorage();
});

function addButtonsEventListener(){
	console.log("* add button event listeners");
	document.getElementById('addButton').addEventListener('click',addButton_eventClick);
	console.log("|- added add event listener");
	document.getElementById('clearButton').addEventListener('click',clearButton_eventClick);
	console.log("|- added clear event listener");
}

function loadFromStorage(){
	console.log("* load tasks from storage");
	const tasksArray=JSON.parse(localStorage.getItem("tasks"));
	console.log("|- loaded "+tasksArray.length+" tasks:");
	console.log(tasksArray);
	for(const task of tasksArray){newTask(task);}
}

function newTask(task){
	console.log("* new task: "+task);
	const newTaskLi=document.createElement("li");
	newTaskLi.appendChild(document.createTextNode(task));
	newTaskLi.classList.add('task');
	console.log("|- task added: "+task);
	newTaskLi.addEventListener('click',task_eventClick);
	document.querySelector('.tasks').appendChild(newTaskLi);
	console.log("|- added task event listener");
}

function addButton_eventClick(){
	const userInput=prompt("Add a new task:",'');
	if(userInput===null){return;}
	const task=userInput.trim();
	if(task.length==0){return;}
	console.log("event add new task");
	newTask(task);
	saveToStorage();
}

function clearButton_eventClick(){
	if (confirm("Are you sure you want to remove completed tasks?")) {
		console.log("* event delete checked tasks");
		document.querySelectorAll('.task').forEach(function(el){
			if(el.classList.contains('checked')){
				console.log("|- remove: "+el.innerHTML);
				el.parentNode.removeChild(el);
			}
		});
	}
}

function task_eventClick(){
	console.log("* event task click");	
	if(this.classList.contains('checked')){
		console.log("|- uncheck: "+this.innerHTML);
		this.classList.remove('checked');
	}else{
		console.log("|- check: "+this.innerHTML);
		this.classList.add('checked');
	}
	saveToStorage();
}

function saveToStorage(){
	console.log("* save tasks to storage");
	let tasksArray=[];
	document.querySelectorAll('.task').forEach(function(el){
		if(el.classList.contains('checked')){return;}
		tasksArray.push(el.innerHTML)
	});
	localStorage.setItem("tasks",JSON.stringify(tasksArray));
	console.log("|- stored "+tasksArray.length+" tasks");
}
