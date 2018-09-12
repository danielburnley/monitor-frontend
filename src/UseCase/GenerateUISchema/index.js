export default class GenerateUISchema {
  execute(data) {
    return this.generateUISchema(data.properties);
  }

  generateUISchema(data) {
    let ret = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value.type === "object") {
        ret[key] = this.generateUISchema(value.properties);

        if (value.horizontal) {
          ret[key]["ui:field"] = "horizontal";
        }
      } else if (value.type === "array") {
        ret[key] = {};
        ret[key]["ui:options"] = {
          addable: this.isAddableArray(value),
          orderable: false,
          removable: this.isAddableArray(value)
        };
        ret[key]["items"] = this.generateUISchema(value.items.properties);
        if (value.items.horizontal) {
          ret[key]["items"]["ui:field"] = "horizontal";
        }
      } else if (value.readonly) {
        ret[key] = { "ui:disabled": true };
      }
    });
    return ret;
  }

  isAddableArray(arr) {
    return arr.addable ? true : false;
  }
}
