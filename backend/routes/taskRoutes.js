const express = require("express");
const taskController = require("../controller/taskController");

const router = express.Router();

// router.param('id', tourController.checkID);

router.route("/").post(taskController.createTask)
  .get(taskController.getAllTasks)

router.route("/:id").get(taskController.getSingleTask).delete(taskController.deleteTask).put(taskController.updateTask)

module.exports = router;
 