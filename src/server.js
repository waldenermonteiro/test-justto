import { Server, Model, Factory } from 'miragejs'

export function makeServer (environment = 'development') {
  return new Server({
    environment,
    models: {
      user: Model
    },
    factories: {
      user: Factory.extend({
        firstName: 'Waldener',
        lastName: 'Monteiro',
        email: 'test@mail.com'
      })
    },
    seeds (server) {
      server.createList('user', 1)
    },
    routes () {
      this.namespace = 'api'
      this.get('users', schema => schema.db.users)
      this.post('/users', function (schema, request) {
        const attrs = JSON.parse(request.requestBody)
        return schema.db.users.insert(attrs)
      })
      this.put('/users/:id', function (schema, request) {
        const attrs = JSON.parse(request.requestBody)
        return schema.db.users.update(attrs)
      })
      this.delete('/users/:id', function (schema, request) {
        return schema.db.users.remove(request.params.id)
      })
    }
  })
}
