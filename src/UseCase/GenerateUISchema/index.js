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
      } else {
        let itemSchema = this.generateSchemaForItem(value);
        if (itemSchema) {
          ret[key] = itemSchema;
        }
      }
    });
    return ret;
  }

  generateSchemaForObject(value) {
    let ret = this.generateUISchema(value.properties);
    let uiField = this.getUIFieldForObject(value);

    if (uiField) {
      ret["ui:field"] = uiField;
    }

    if (value.dependencies) {
      let dependencySchema = this.generateSchemaForDependencies(value);
      ret = this.mergeObjects(ret, dependencySchema);
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
    } else if (value.items.risk) {
      ret["items"]["ui:field"] = "risk";
    }

    return ret;
  }

  generateSchemaForDependencies(value) {
    let reducer = (acc, dependency) =>
      this.mergeObjects(acc, this.generateSchemaForObject(dependency));

    let dependencies = Object.values(value.dependencies)[0];
    return dependencies.oneOf.reduce(reducer, {});
  }

  generateSchemaForItem(item) {
    if (item.hidden) {
      return { "ui:widget": "hidden" };
    } else if (item.readonly) {
      return { "ui:disabled": true };
    }
  }

  isAddableArray(arr) {
    return arr.addable ? true : false;
  }

  mergeObjects(one, two) {
    return { ...one, ...two };
  }

  getUIFieldForObject(obj) {
    if (obj.horizontal) {
      return "horizontal";
    }
    if (obj.variance) {
      return "variance";
    }
  }
}
