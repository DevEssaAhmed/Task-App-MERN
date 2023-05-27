const Task = require("../model/taskModel");

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  try {
    res.status(201).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    // It is short form of Tour.findOne({_id: req.params.id})
    if (!task) {
      return res.status(404).json(`NO task with id: ${id}`);
    }
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = await Task.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        task: newTask,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// Delete Task
// exports.deleteTask = async (req, res) => {
//   try {
//     if (!task) {
//       return res.status(404).json(`NO task with id: ${id}`);
//     }
//     await Task.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: error,
//     });
//   }
// };

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: `No task with id: ${id}` });
    }

    await Task.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Update Task
// exports.updateTask = async (req, res) => {
//   try {
//   const { id } = req.params;

//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: "success",
//       data: {
//         task,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: error,

//     });
//   }
// };

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${id}` });
    }
    res.status(200).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

