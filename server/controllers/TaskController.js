import {selectAllTasks, insertTask, removeTask} from '../models/Task.js'
import {ApiError} from '../helper/ApiError.js'

const getTasks = async (req,res,next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch (error) {
        return next(new ApiError('Failed to fetch tasks', 500))
       /*  return next(error) */
    }
}

const postTask = async (req,res,next) => {
    const {task} = req.body
    try {
        if(!task ||!task.description || task.description.trim().length === 0) {
            return next(new ApiError('Task description is required',400))
/*             const error = new Error('Task description required')
            error.status = 400
            return next(error) */
        }
        const result = await insertTask(task.description)
        return res.status(201).json({id: result.rows[0].id, description: result.rows[0].description})
    } catch (error) {
/*     return next(error) */
        return next(new ApiError('Internal server error while creating task', 500))
    }
}
const deleteTask = async (req,res,next) => {
    try {
        const {id} = req.params
        if(!id || isNaN(parseInt(id))) {
            return next(new ApiError('Valid task ID is required', 400))
        }

        const result = await removeTask(id)

        if(!result.rows || result.rows.length === 0) {
            return next(new ApiError('Task not found', 404))
        }
        
        return res.status(200).json({
            id: result.rows[0].id,
            message: 'Task deleted successfully'
        })
     } catch (error) {
        return next(new ApiError('Internal server error while deleting task', 500))
     }
}

export {getTasks, postTask, deleteTask}