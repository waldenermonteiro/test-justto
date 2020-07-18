import { Server, Model, Factory } from 'miragejs'

export function makeServer (environment = 'development') {
  return new Server({
    environment,
    models: {
      user: Model
    },
    factories: {
      user: Factory.extend({
        firstName: 'waldener',
        lastName: 'monteiro',
        email: 'test@mail.com'
      })
    },
    seeds (server) {
      server.createList('user', 1)
    },
    routes () {
      this.namespace = 'api'
      this.get('users', function (schema, request) {
        const attrs = request.queryParams
        return !attrs.firstName ? schema.db.users : schema.db.users.findBy(attrs) === null ? [] : [schema.db.users.findBy(attrs)]
      })
      this.post('/users', function (schema, request) {
        const attrs = JSON.parse(request.requestBody)
        return schema.db.users.insert(attrs)
      })
      this.put('/users/:id', function (schema, request) {
        const attrs = JSON.parse(request.requestBody)
        return schema.db.users.update(attrs.id, attrs)
      })
      this.delete('/users/:id', function (schema, request) {
        return schema.db.users.remove(request.params.id)
      })
    }
  })
}
