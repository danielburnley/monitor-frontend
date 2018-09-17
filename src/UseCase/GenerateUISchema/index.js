export default class GenerateUISchema {
  execute(data) {
    return this.generateUISchema(data.properties);
  }

  generateUISchema(data) {
    let ret = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateSchemaForObject(value);
      } else if (value.type === "array") {
        ret[key] = this.generateSchemaForArray(value);
      } else if (value.readonly) {
        ret[key] = { "ui:disabled": true };
      }
    });
    return ret;
  }

  generateSchemaForObject(value) {
    let ret = this.generateUISchema(value.properties);

    if (value.horizontal) {
      ret["ui:field"] = "horizontal";
    }

    if (value.dependencies) {
      let dependencySchema = this.generateSchemaForDependencies(value);
      ret = { ...ret, ...dependencySchema };
    }

    return ret;
  }

  generateSchemaForArray(value) {
    let ret = {};
    ret["ui:options"] = {
      addable: this.isAddableArray(value),
      orderable: false,
      removable: this.isAddableArray(value)
    };

    ret["items"] = this.generateUISchema(value.items.properties);

    if (value.items.horizontal) {
      ret["items"]["ui:field"] = "horizontal";
    }

    return ret;
  }

  generateSchemaForDependencies(value) {
    let reducer = (acc, dependency) => ({
      ...acc,
      ...this.generateSchemaForObject(dependency)
    });

    let dependencies = Object.values(value.dependencies)[0];
    return dependencies.oneOf.reduce(reducer, {});
  }

  isAddableArray(arr) {
    return arr.addable ? true : false;
  }
}
