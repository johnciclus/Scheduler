module.exports = function(app) {
	app.get("/", function(req, res) {
		res.redirect("./main_module/index.html");
	});

	app.get("/maps", function(req, res) {
		res.redirect("./maps_module/index.html");
	});
}