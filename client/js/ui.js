var http = {
	"init": function(resolve, reject){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200 || xhttp.status === 201) {
					if (xhttp.responseText) {
						try {
							resolve(JSON.parse(xhttp.responseText));
						} catch (e) {
							resolve(xhttp.responseText);
						}
					} else {
						reject("Empty response");
					}

				} else {
					reject(xhttp.responseText);
				}
			}
		};
		return xhttp;
	},
	"get": function (url) {
		return new Promise(function (resolve, reject) {
			if (window.XMLHttpRequest) {
				var xhttp = http.init(resolve, reject);

				xhttp.open("GET", url);
				xhttp.setRequestHeader("content-type", "application/json");
				xhttp.send();
			} else {
				reject("AJAX Calls not supported on this browser");
			}
		});
	},
	"post": function (url, requestParams) {
		return new Promise(function (resolve, reject) {
			if (!requestParams)
				requestParams = {};

			if (window.XMLHttpRequest) {
				var xhttp = http.init(resolve, reject);

				xhttp.open("POST", url);
				xhttp.setRequestHeader("content-type", "application/json");
				xhttp.send(JSON.stringify(requestParams));

			} else {
				reject("AJAX Calls not supported on this browser");
			}
		});
	},
	"put": function (url) {
		return new Promise(function (resolve, reject) {
			if (window.XMLHttpRequest) {
				var xhttp = http.init(resolve, reject);

				xhttp.open("PUT", url);
				xhttp.setRequestHeader("content-type", "application/json");
				xhttp.send();
			} else {
				reject("AJAX Calls not supported on this browser");
			}
		});
	},
	"delete": function (url) {
		return new Promise(function (resolve, reject) {
			if (window.XMLHttpRequest) {
				var xhttp = http.init(resolve, reject);

				xhttp.open("DELETE", url);
				xhttp.setRequestHeader("content-type", "application/json");
				xhttp.send();
			} else {
				reject("AJAX Calls not supported on this browser");
			}
		});
	}
};

getTasks();

function getTasks(){
	http.get("/api/tasks")
		.then(function(tasks){
			console.log("getTasks");
			var tasksList = document.getElementById("tasksList");
			tasksList.innerHTML= "";
			for (var id in tasks){
				var node = document.createElement("p");
				var textnode = document.createTextNode(tasks[id].name + ": [duration: " + tasks[id].duration+"]");
				node.appendChild(textnode);
				tasksList.prepend(node);
			}
		});
}

var tasksInput = new Vue({
	el: '#tasksInput',
	data: {
		name: "task ",
		duration: 1
	},
	methods: {
		createTask: function (event) {
			http.post("/api/tasks", {"name": this.name, "duration": this.duration})
				.then(function(obj){
					getTasks()
				});
		}
	}
});

var tasks = new Vue({
	el: '#tasks',
	data: {
		tasks: []
	},
	methods: {
		generateTasks: function () {
			var promises = [];
			for (var i=0; i<10; i++){
				promises.push(http.post("/api/tasks", {"name": "Task "+i, "duration": Math.floor(11 * Math.random())}));
			}
			Promise.all(promises).then(function(){
				getTasks();
			});

		},
		clearTasks: function() {
			http.get("/api/tasks")
			.then(function(tasks){
				var promises = [];
				tasks.forEach(function(task){
					promises.push(http.delete("/api/tasks/"+task.id));
				});
				Promise.all(promises).then(function(){
					getTasks();
				})
			})
		}
	}

});