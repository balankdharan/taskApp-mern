const express = require("express");
const router = express.Router();
const taskController = require("../controller/task");

router.get("/", taskController.getTask);
router.post("/", taskController.addTask);
router.put("/:id", taskController.editTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
