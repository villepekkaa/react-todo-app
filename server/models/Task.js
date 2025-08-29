import {pool} from '../helper/db.js'
import {auth} from '../helper/auth.js'

const selectAllTasks = async() => {
    return await pool.query('SELECT * FROM task')
}

const insertTask = async(description) => {
    return await pool.query("insert into task (description) values ($1) returning *",[description])
}

const removeTask = async(id) => {
    return await pool.query('DELETE FROM task WHERE id = $1 returning *', [id])
}

export {selectAllTasks, insertTask, removeTask}