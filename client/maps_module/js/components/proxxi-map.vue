<template>
	<object id="brazil" class="brazil-map" :data="src" type="image/svg+xml"></object>
</template>
<script type="text/javascript">
	(function () {
		"use strict";
		module.exports = {
			"name": "proxxi-map",
			"props": ["src"],
			"data": function () {
				return {
					stateSelected: "BR-SP",
					states: []
				}
			},
			"methods": {
				getStatesIdName: function(){
					let stateIdNames = [];
					this.states.forEach(function(state){
						stateIdNames.push({id: state.id, title: state.title});
					});
					return stateIdNames;
				},
				selectState: function(stateId){
					this.stateSelected = stateId;
					this.states.forEach(function(state){
						if (state.id == stateId)
							state.path.classList.add("selected");
						else
							state.path.classList.remove("selected");
					});
				}
			},
			created: function () {
				console.log("Created "+this.$options.name);

			},
			mounted: function () {
				let wc = this;
				let svg = document.getElementById("brazil");

				svg.addEventListener("load", function(){
					let svgDoc = svg.contentDocument;
					let paths = svgDoc.getElementsByClassName("land");
					for (let i=0; i<paths.length; i++){
						wc.states.push({id: paths[i].getAttribute("id"), title: paths[i].getAttribute("title"), path: paths[i]})

						paths[i].addEventListener("mousedown", function(){
							wc.selectState(this.getAttribute("id"));
						}, false);

						paths[i].addEventListener("mouseenter", function(){
							this.classList.add("highlighted");
						}, false);

						paths[i].addEventListener("mouseleave", function(){
							this.classList.remove("highlighted");
						}, false);
					}
					wc.selectState(wc.stateSelected);
					console.log("Mounted "+wc.$options.name);
				}, false);
			},
			updated: function () {
				console.log("Updated "+this.$options.name);
			} ,
			destroyed: function () {
				console.log("Destroyed "+this.$options.name);
			}
		}
	}());
</script>

<style scoped>
	.brazil-map{
		width: 960px;
		height: 640px !important;
	}
</style>