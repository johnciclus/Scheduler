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
	});

	var http = require("../js/http");

	new Vue({
		el: "#app",
		data: {
			name: "task ",
			duration: 1,
			tasks: [{name: "task 1", duration: 1}]
		},
		methods: {
			createTask: function () {
				var wc = this;
				http.post("/api/tasks", {"name": this.name, "duration": this.duration})
					.then(function (object) {
						console.log(object);
						wc.getTasks()
					});
			},
			getTasks: function() {
				var wc = this;
				http.get("/api/tasks")
					.then(function (tasks) {
						console.log(tasks);
						wc.tasks = tasks;
					});
			},
			generateTasks: function () {
				var promises = [];
				var wc = this;
				for (var i = 0; i < 10; i++) {
					promises.push(http.post("/api/tasks", {
						"name": "Task " + i,
						"duration": Math.floor(11 * Math.random())
					}));
				}
				Promise.all(promises).then(function () {
					wc.getTasks();
				});

			},
			clearTasks: function () {
				var wc = this;
				http.get("/api/tasks")
					.then(function (tasks) {
						var promises = [];
						tasks.forEach(function (task) {
							promises.push(http.delete("/api/tasks/" + task.id));
						});
						Promise.all(promises).then(function () {
							wc.getTasks();
						})
					})
			}
		},
		mounted: function(){
			this.getTasks()
		}
	});

}());