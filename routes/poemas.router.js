//rutas de poemas
const express = require("express");
const router = express.Router();

const controller = require("../controllers/poemas.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", authMiddleware, controller.store);
router.put("/:id", authMiddleware, controller.update);
router.delete("/:id", authMiddleware, controller.destroy);

module.exports = router;
