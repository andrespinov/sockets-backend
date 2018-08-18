const Router = require("express").Router;

const controller = require("./controller");

let router = new Router();

router.route("/socket").post((req, res) => {
  //controller.register(req, res);
});

module.exports = router;