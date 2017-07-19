function init(resolve, reject) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
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
}

module.exports = {
	"get": function (url) {
		return new Promise(function (resolve, reject) {
			if (window.XMLHttpRequest) {
				var xhttp = init(resolve, reject);

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
				var xhttp = init(resolve, reject);

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
				var xhttp = init(resolve, reject);

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
				var xhttp = init(resolve, reject);

				xhttp.open("DELETE", url);
				xhttp.setRequestHeader("content-type", "application/json");
				xhttp.send();
			} else {
				reject("AJAX Calls not supported on this browser");
			}
		});
	}
};