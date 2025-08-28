import fs from 'fs'
import path from 'path'
import {pool} from './db.js'

const __dirname = import.meta.dirname

const initializeTestDb = () => {
    console.log('Alustetaan testitietokanta...')
    const sql = fs.readFileSync(path.resolve(__dirname,'../test_db.sql'), 'utf8')

    pool.query(sql,(err) => {
        if(err) {
            console.error('Error initializing test database:', err)
        } else {
            console.log('Test database initialized succesfully')
        }
    })
}

export {initializeTestDb}
