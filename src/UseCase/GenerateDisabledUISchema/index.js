export default class GenerateDisabledUISchema {
  execute(data) {
    return this.generateUISchema(data.properties);
  }

  generateUISchema(data) {
    let ret = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateSchemaForObject(value)
      } else if (value.type === "array") {
        ret[key] = this.generateSchemaForArray(value);
      } else {
        ret[key] = this.generateSchemaForItem(value);
      }
    });

    return ret;
  }

  generateSchemaForObject(object) {
    let schema = this.generateUISchema(object.properties)
    let dependencySchema = this.generateDependencySchema(object)
    return this.mergeObjects(schema, dependencySchema)
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
    if(!value.dependencies) {
      return {}
    }

    let reducer = (acc, dependency) =>
      this.mergeObjects(acc, this.generateUISchema(dependency.properties));

    let schema = Object.values(value.dependencies)[0];
    return schema.oneOf.reduce(reducer, {});
  }

  generateSchemaForItem(item) {
    if (item.hidden) {
      return { "ui:widget": "hidden" };
    } else {
      return { "ui:disabled": true };
    }
  }

  mergeObjects(one, two) {
    return { ...one, ...two };
  }
}
