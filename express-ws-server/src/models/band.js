import { v4 as uuid } from 'uuid'

export default class Band {
  constructor (name) {
    this.id = uuid()
    this.name = name
    this.votes = 0
  }
}
