// @ts-nocheck
import * as edgedb from "edgedb"
import e from "../../../dbschema/edgeql-js/index.mjs"
export { e }

export let client = edgedb.createClient()

class Database {
  static async select(params) {
    const query = e.select(this.type, params)
    return await query.run(client)
  }
  static select_query(params) {
    return e.select(this.type, params)
  }
  static select_query_by_ids(ids) {
    return e.select(this.type, (item) => ({
      id: true,
      filter: e.op(item.id, "in", e.set(...ids.map((id) => e.uuid(id)))),
    }))
  }
  static async insert(params) {
    const query = e.insert(this.type, params)
    return await query.run(client)
  }
  static async update(params) {
    const query = e.update(this.type, params)
    return await query.run(client)
  }
  static async delete(params) {
    const query = e.delete(this.type, params)
    return await query.run(client)
  }
}

export class Comment extends Database {
  static type = e.Comment
}

export class Tag extends Database {
  static type = e.Tag
}

export class Post extends Database {
  static type = e.Post
}

export class User extends Database {
  static type = e.User
}
