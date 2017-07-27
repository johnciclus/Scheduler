<template>
	<md-list>
		<md-list-item v-for="element in elements" v-on:click="action(element.id)">
			<span>{{element.title}}</span>
		</md-list-item>
	</md-list>
</template>
<script type="text/javascript">
	(function () {
		"use strict";
		module.exports = {
			"name": "proxxi-list",
			"props": [],
			"data": function () {
				return {
					elements: []
				}
			},
			"methods": {
				action: function(id){
					this.$root.updateMap(id);
				}
			},
			created: function () {
				console.log("Created "+this.$options.name);

			},
			mounted: function () {
				console.log("Mounted "+this.$options.name);
			},
			updated: function () {
				console.log("Updated "+this.$options.name);
			} ,
			destroyed: function () {
				console.log("Destroyed");
			}
		}
	}());
</script>

<style scoped>
</style>