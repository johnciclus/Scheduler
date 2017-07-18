module.exports = function(app) {
	// Install a "/ping" route that returns "pong"
	app.get("/", function(req, res) {
		res.sendFile("../client/main_module/index.html");
	});
}