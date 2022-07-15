import { createTables } from './config/db'
import ClientController from './controllers/ClientController'
import Client from './models/Client'

createTables()

const clientCtrl = new ClientController()

Bun.serve({
  async fetch(req: Request) {
    console.log(req.method)

    if (req.url.endsWith('/clients') && req.method == 'GET') {
      const clients = clientCtrl.findAll()
      return Response.json(clients, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (req.url.endsWith('/clients') && req.method == 'POST') {
      //@ts-ignore
      const client: Client = await req.json()
      const savedClient: Client = clientCtrl.save(client)
      return Response.json(savedClient, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    /**
     * BUG DO BUN: Método delete não é reconhecido!
     * Que feio, Bun!
     */
    if (req.url.match(/\/clients\/([0-9]+)/) && !req.method) {
      const arr = req.url.split('/')
      const id: number = parseInt(arr[arr.length - 1])
      clientCtrl.delete(id)
      return new Response('Client deleted', { status: 204 })
    }

    return new Response('Bad request', { status: 400 })
  },
})
