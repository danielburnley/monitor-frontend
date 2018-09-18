export default class GenerateDisabledUISchema {
  execute(data) {
    return this.generateUISchema(data.properties);
  }

  generateUISchema(data) {
    let ret = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateUISchema(value.properties);
        if (value.dependencies) {
          let dependencySchema = this.generateDependencySchema(value);
          ret[key] = { ...ret[key], ...dependencySchema };
        }
      } else if (value.type === "array") {
        ret[key] = this.generateSchemaForArray(value);
      } else {
        ret[key] = { "ui:disabled": true };
      }
    });

    return ret;
  }

  generateSchemaForArray(value) {
    let schema = {
      "ui:options": {
        addable: false,
        orderable: false,
        removable: false
      }
    };

    schema.items = this.generateUISchema(value.items.properties);

    return schema;
  }

  generateDependencySchema(value) {
    let reducer = (acc, dependency) => ({
      ...acc,
      ...this.generateUISchema(dependency.properties)
    });

    let schema = Object.values(value.dependencies)[0];
    return schema.oneOf.reduce(reducer, {});
  }
}
