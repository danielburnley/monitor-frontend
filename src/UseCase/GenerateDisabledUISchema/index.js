export default class GenerateDisabledUISchema {
  execute(data) {
    return this.generateUISchema(data.properties);
  }

  generateUISchema(data) {
    let ret = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.type === 'object') {
        ret[key] = this.generateUISchema(value.properties);
      } else if (value.type === 'array') {
        ret[key] = {}
        ret[key]['ui:options'] = {
          addable: false,
          orderable: false,
          removable: false,
        };
        ret[key]['items'] = this.generateUISchema(value.items.properties);
      } else {
        ret[key] = {'ui:disabled': true};
      }
    });

    return ret;
  }
}
