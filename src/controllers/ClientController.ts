import db from '../config/db'
import Client from '../models/Client'

export default class ClientController {
  save(client: Client) {
    const { email, name } = client
    db.run('INSERT INTO client(name, email) VALUES($name, $email)', {
      $name: name,
      $email: email,
    })

    const response = db.query('SELECT last_insert_rowid() FROM client').get()
    const id: number = response['last_insert_rowid()']

    return this.find(id)
  }

  find(id: number) {
    const client: Client = db.query('SELECT *FROM client WHERE id = ?').get(id)
    return client
  }

  findAll() {
    const clients: Client[] = db.query('SELECT *FROM client').all()
    return clients
  }

  delete(id: number) {
    db.run('DELETE FROM client WHERE id = ?', id)
  }
}
