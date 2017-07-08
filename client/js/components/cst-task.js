Vue.component('cts-task', {
  // The todo-item component now accepts a
  // "prop", which is like a custom attribute.
  // This prop is called todo.
  props: ['task'],
  template: '<li>{{ task.text }}</li>'
});
