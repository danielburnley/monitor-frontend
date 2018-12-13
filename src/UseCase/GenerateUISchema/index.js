export default class GenerateUISchema {
  constructor(userRoleCookieGateway) {
    this.userRoleGateway = userRoleCookieGateway;
  }
  execute(data) {
    let userRole = this.userRoleGateway.getUserRole().userRole;

    return this.generateUISchema(data.properties, userRole);
  }

  generateUISchema(data, role) {
    let ret = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateSchemaForObject(value, role);
      } else if (value.type === "array") {
        ret[key] = this.generateSchemaForArray(value, role);
      } else {
        let itemSchema = this.generateSchemaForItem(value, role);
        if (itemSchema) {
          ret[key] = itemSchema;
        }
      }
    });
    return ret;
  }

  generateSchemaForObject(value, role) {
    let ret = this.generateUISchema(value.properties, role);
    let uiField = this.getUIFieldForObject(value);

    if (uiField) {
      ret["ui:field"] = uiField;
    }

    if (value.dependencies) {
      let dependencySchema = this.generateSchemaForDependencies(value, role);
      ret = this.mergeObjects(ret, dependencySchema);
    }

    return ret;
  }

  generateSchemaForArray(value, role) {
    let ret = {};
    ret["ui:options"] = {
      addable: this.isAddableArray(value),
      orderable: false,
      removable: this.isAddableArray(value)
    };

    ret["items"] = this.generateUISchema(value.items.properties, role);

    if (value.items.horizontal) {
      ret["items"]["ui:field"] = "horizontal";
    } else if (value.items.risk) {
      ret["items"]["ui:field"] = "risk";
    } else if (value.items.base) {
      ret["items"]["ui:field"] = "base";
    } else if (value.periods) {
      ret["ui:field"] = "periods";
    } else if (value.items.milestone) {
      ret["items"]["ui:field"] = "milestone"
    }  else if (value.quarterly) {
      ret["ui:field"] = "quarterly"
    }
    
    if (value.numbered) {
      ret["ui:field"] = "numbered"
    }

    if (value.items.calculation) {
      ret["items"]["ui:field"] = "calculated"
    }

    return ret;
  }

  generateSchemaForDependencies(value, role) {
    let reducer = (acc, dependency) =>
      this.mergeObjects(acc, this.generateSchemaForObject(dependency, role));

    let dependencies = Object.values(value.dependencies)[0];
    return dependencies.oneOf.reduce(reducer, {});
  }

  generateSchemaForItem(item, role) {
    let schema = {}

    if (item.extendedText) {
      schema["ui:widget"] = "textarea"
    }

    if (item.percentage) {
      schema["ui:widget"] = "percentage"
    }

    if (item.hidden) {
      schema["ui:widget"] = "hidden"
    }

    if (item.readonly) {
      schema["ui:disabled"] = true
    }

    if (item.laReadOnly && (role !== "Homes England" && role !== "Superuser")) {
      schema["ui:disabled"] = true
    }

    if (item.s151WriteOnly && (role !== "S151" && role !== "Superuser")) {
      schema["ui:disabled"] = true
    }

    if (item.base) {
      schema["ui:field"] = "base"
    }

    if(item.periods) {
      schema["ui:field"] = "periods"
    }

    if(item.currency) {
      schema["ui:widget"] = "currency"
    }

    if(item.radio) {
      schema["ui:widget"] = "radio"
    }

    if(Object.keys(schema).length === 0) {
      return undefined
    }

    return schema;
  }

  isAddableArray(arr) {
    return arr.addable ? true : false;
  }

  mergeObjects(one, two) {
    return { ...one, ...two };
  }

  getUIFieldForObject(obj) {
    if (obj.calculation) {
      return "calculated";
    }

    if (obj.horizontal) {
      return "horizontal";
    }
    if (obj.variance) {
      return "variance";
    }
    if (obj.base) {
      return "base";
    }
    if (obj.milestone) {
      return "milestone";
    }
  }
}
