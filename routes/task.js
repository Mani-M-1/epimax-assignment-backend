const router = require('express').Router();


// models 
const Task = require('../Models/Task');


// create task 
router.post('/add-task', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();

        res.status(200).json({message: "Task added successfully!", taskDetails: task});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

// update task status 
router.put('/update-task/:taskId', async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.taskId});

        if (!task) {
            res.status(404).json({message: "Task not found!"});
        }

        await Task.updateOne({_id: req.params.taskId}, {
            $set: {taskStatus: req.body.taskStatus}
        }, {new: true});


        // const updatedTask = await Task.findOne({_id: req.params.taskId});
        const updatedTasksArr = await Task.find({assigneeDetails: req.body.userId});

        res.status(200).json({message: "Task status updated successfully!", updatedTasksArr});
    }catch(err) {
        res.status(500).json({message: err.message});
    }
})

// get all tasks 
router.get('/find', async (req, res) => {

    try {
        const tasks = req.query.search_q !== '' 
            ? await Task.find(
                {
                    taskTitle: new RegExp(req.query.search_q, 'i')
                }
            ).populate("assigneeDetails") 
            : await Task.find().populate("assigneeDetails")
         

        res.status(200).json({message: "Tasks fetched successfully!", tasksArr: tasks});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})

// get tasks of a particular user
router.get('/user/:userId/find', async (req, res) => {
    try {
        const tasks = req.query.search_q !== '' 
            ? await Task.find(
                {
                    assigneeDetails: req.params.userId,
                    taskTitle: new RegExp(req.query.search_q, 'i')
                }
            ).populate("assigneeDetails") 
            : await Task.find({assigneeDetails: req.params.userId}).populate("assigneeDetails");
         

        res.status(200).json({message: "Tasks fetched successfully!", tasksArr: tasks});
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
})


module.exports = router;