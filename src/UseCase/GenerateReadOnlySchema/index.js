export default class GenerateReadOnlySchema {
  execute(data, flag = 'readonly') {
    return this.generateUISchema(data.properties, flag);
  }

  generateUISchema(data, flag) {
    let ret = {};
    Object.entries(data).forEach(([key, value]) => {
      if (value.type === 'object') {
        ret[key] = this.generateUISchema(value.properties, flag);
      } else if (value.type === 'array') {
        ret[key] = {};
        ret[key]['ui:options'] = {
          addable: false,
          orderable: false,
          removable: false,
        };
        ret[key]['items'] = this.generateUISchema(value.items.properties, flag);
      } else if (value[flag]) {
        ret[key] = {'ui:disabled': true};
      }
    });

    return ret;
  }
}
