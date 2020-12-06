var express = require('express');
var menu = express.Router();

const Menu = require("../models/menu");

/* GET users listing. */
menu.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

menu.get("/:id", async (req, res) => {
    const result = await Menu.findAll({
        where: { cuisine_id: req.params.id }
      });
      res.status(200).json(result)
  })

module.exports = menu;