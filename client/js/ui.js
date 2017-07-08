var tasksInput = new Vue({
  el: '#tasksInput',
  data: {
    message: 'Hello Vue!'
  }
});

var tasks = new Vue({
  el: '#tasks',
  data: {
    tasks: []
  },
  methods: {
    generateTask: function () {
      this.tasks.push({id: this.tasks.length+1, text: 'new task' })
    }
  }
});








