const express = require("express");
const controller = require("../controller/essencia");

const router = express.Router();

router.get("/essencias/:id", controller.buscarUm);

router.get("/essencias", controller.buscarTodos);

router.post("/essencias", controller.criar);

router.put("/essencias/:id", controller.atualizar);

router.delete("/essencias/:id", controller.excluir);

module.exports = router;
