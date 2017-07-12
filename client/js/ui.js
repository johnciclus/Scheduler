var http = {
  "post": function (url, requestParams) {
    return new Promise(function (resolve, reject) {
      if (!requestParams) {
        return reject("Can not proceed without credentials");
      }

      if (window.XMLHttpRequest) {
        var xhttp = new window.XMLHttpRequest();
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

        xhttp.open("POST", url);
        xhttp.setRequestHeader("content-type", "application/json");
        xhttp.send(JSON.stringify(requestParams));

      } else {
        reject("AJAX Calls not supported on this browser");
      }
    });
  },
  "get": function (url) {
    return new Promise(function (resolve, reject) {
      if (window.XMLHttpRequest) {
        var xhttp = new window.XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
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

        xhttp.open("GET", url);
        xhttp.send();
      } else {
        reject("AJAX Calls not supported on this browser");
      }
    });
  }
}

getTasks();

function getTasks(){
  http.get("/api/tasks")
    .then(function(tasks){
      var tasksList = document.getElementById("tasksList");
      tasksList.innerHTML= "";
      for(var id in tasks){
        var node = document.createElement("p");
        var textnode = document.createTextNode(tasks[id].name + tasks[id].duration);
        node.appendChild(textnode);
        tasksList.append(node);
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
    generateTask: function () {
      this.tasks.push({id: this.tasks.length+1, text: 'new task' })
    }
  }
});








