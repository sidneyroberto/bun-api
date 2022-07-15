import { Database } from 'bun:sqlite'

const db = new Database('clients.sqlite')

export const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS client (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
    )
`)
}

export default db
