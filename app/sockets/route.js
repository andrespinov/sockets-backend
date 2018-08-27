const Router = require("express").Router;

const controller = require("./controller");

let router = new Router();

router.route("/player").get((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    controller.getPlayers(req, res);
  });

module.exports = router;