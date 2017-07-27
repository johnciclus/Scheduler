(function () {
	"use strict";
	let Vue = require("vue");
	let VueMaterial = require("vue-material");
	let http = require("../js/http");
	let vueTheme = require("./vue-theme");
	let proxxiMap = require("../js/components/proxxi-map.vue");
	let proxxiList = require("../js/components/proxxi-list.vue");

	Vue.use(VueMaterial);

	Vue.material.registerTheme("default", vueTheme);

	new Vue({
		el: "#app",
		name: "proxxi",
		data: {
			name: "task ",
			duration: 1,
			tasks: [],
			technician1: [],
			technician2: [],
			technician3: []
		},
		methods: {
			createTask: function () {
				let wc = this;
				http.post("/api/tasks", {"name": this.name, "duration": this.duration})
					.then(function () {
						wc.getTasks()
					});
			},
			getTasks: function() {
				let wc = this;
				http.get("/api/tasks")
					.then(function (tasks) {
						wc.tasks = [];
						wc.technician1 = [];
						wc.technician2 = [];
						wc.technician3 = [];
						tasks.forEach(function (task) {
							switch (task.technician){
								case 1 :{
									wc.technician1.push(task);
									break;
								}
								case 2 :{
									wc.technician2.push(task);
									break;
								}
								case 3 :{
									wc.technician3.push(task);
									break;
								}
								default:
									wc.tasks.push(task);
							}

						});
					});
			},
			generateTasks: function () {
				var promises = [];
				var wc = this;
				for (var i = 0; i < 10; i++) {
					promises.push(http.post("/api/tasks", {
						"name": "Task " + i,
						"duration": wc.generateInteger(11)
					}));
				}
				Promise.all(promises).then(function () {
					wc.getTasks();
				});

			},
			clearTasks: function () {
				let wc = this;
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
			},
			organizeTasks: function() {
				let promises = [];
				let wc = this;
				wc.tasks.forEach(function (task) {
					promises.push(http.put("/api/tasks/" + task.id, {name: task.name, duration: task.duration, technician: 1+wc.generateInteger(3)}));
				});

				Promise.all(promises).then(function () {
					wc.getTasks();
				})
			},
			generateInteger: function(limit){
				return Math.floor(limit * Math.random());
			},
			updateMap: function(id){
				let map = this.$refs.map;
				map.selectState(id);
			}
		},
		components: {
			"proxxi-map": proxxiMap,
			"proxxi-list": proxxiList
		},
		mounted: function(){
			let map = this.$refs.map;
			let list = this.$refs.list;
			setTimeout(function(){
				list.elements = map.getStatesIdName();
			}, 0);

			console.log("Mounted "+this.$options.name);
		},
		ready: function(){
			console.log("Ready "+this.$options.name);
		}
	});

}());