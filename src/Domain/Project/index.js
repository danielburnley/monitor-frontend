export default class Project {
  constructor(data, schema, status, type, timestamp, name, id){
    this.id = id
    this.name = name
    this.data = data
    this.schema = schema
    this.status = status
    this.type = type
    this.timestamp = timestamp
  }
}
