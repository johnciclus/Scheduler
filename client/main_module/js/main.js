(function () {
	"use strict";
	var Vue = require("vue");
	var VueMaterial = require("vue-material");

	Vue.use(VueMaterial);

	Vue.material.registerTheme("default", {
		primary: "blue",
		accent: "red",
		warn: "red",
		background: "white"
	})

	var http = require("../js/http")

	function getTasks() {
		http.get("/api/tasks")
			.then(function (tasks) {
				console.log("getTasks");
				var tasksList = document.getElementById("tasksList");
				tasksList.innerHTML = "";
				for (var id in tasks) {
					var node = document.createElement("h1");
					var textnode = document.createTextNode(tasks[id].name + ": [duration: " + tasks[id].duration + "]");
					node.appendChild(textnode);
					tasksList.prepend(node);
				}
			});
	}

	var app = new Vue({
		el: "#app",
		data: {
			name: "task ",
			duration: 1
		},
		methods: {
			createTask: function () {
				http.post("/api/tasks", {"name": this.name, "duration": this.duration})
					.then(function () {
						getTasks()
					});
			},
			generateTasks: function () {
				var promises = [];
				for (var i = 0; i < 10; i++) {
					promises.push(http.post("/api/tasks", {
						"name": "Task " + i,
						"duration": Math.floor(11 * Math.random())
					}));
				}
				Promise.all(promises).then(function () {
					getTasks();
				});

			},
			clearTasks: function () {
				http.get("/api/tasks")
					.then(function (tasks) {
						var promises = [];
						tasks.forEach(function (task) {
							promises.push(http.delete("/api/tasks/" + task.id));
						});
						Promise.all(promises).then(function () {
							getTasks();
						})
					})
			}
		}
	});

	getTasks();

	console.log(app);
}());