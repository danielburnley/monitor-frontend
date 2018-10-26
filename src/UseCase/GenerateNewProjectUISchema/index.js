export default class GenerateNewProjectUISchema {
  constructor(generateUISchema, generateReadOnlySchema) {
    this.generateUISchema = generateUISchema;
    this.generateReadOnlyUISchema = generateReadOnlySchema;
  }

  execute(schema, state) {
    let uiSchema = this.generateUISchema.execute(schema);

  
    if (state !== "LA Draft") {
      return uiSchema
    }

    let readOnlyUISchema = this.generateReadOnlyUISchema.execute(schema, 'laReadOnly');

    return this.mergeUISchema(schema, readOnlyUISchema, uiSchema);
  }

  schemaExists(UIschema) {
    return (UIschema && Object.keys(UIschema).length)
  }
  
  mergeUISchema(schema, UIschema1, UIschema2) {
    let uiSchema = {};
    if (!(this.schemaExists(UIschema1))) return UIschema2;
    if (!(this.schemaExists(UIschema2))) return UIschema1;


    Object.entries(schema).map(([key, value]) => {
      if (value.type === "array") {
        uiSchema[key] = this.mergeUISchemaForArray(
          value,
          UIschema1[key],
          UIschema2[key]
        );
      } else if (value.type === "object") {
        uiSchema[key] = this.mergeUISchema(
          schema[key]["properties"],
          UIschema1[key],
          UIschema2[key]
        );
      } else {
        uiSchema[key] = this.mergeObjects(UIschema1[key], UIschema2[key]);
        if (!this.schemaExists(uiSchema[key])) {
          uiSchema[key] = undefined
        }
      }
    });
    return uiSchema;
  }

  mergeUISchemaForArray(schema, UIschema1, UIschema2) {
    let uiSchema = {};
    

    let parentUISchema = this.mergeObjects(UIschema1, UIschema2);
    let uiItemsProperties = this.mergeObjects(
      UIschema1["items"],
      UIschema2["items"]
    );
    let uiChildProperties = this.mergeUISchema(
      schema["items"]["properties"],
      UIschema1["items"],
      UIschema2["items"]
    );
  
    let itemsUISchema = {
      items: this.mergeObjects(uiItemsProperties, uiChildProperties)
    };

    uiSchema = this.mergeObjects(parentUISchema, itemsUISchema)

    uiSchema["ui:options"] = {
      addable:
        UIschema1["ui:options"].addable && UIschema2["ui:options"].addable,
      orderable:
        UIschema1["ui:options"].orderable && UIschema2["ui:options"].orderable,
      removable:
        UIschema1["ui:options"].removable && UIschema2["ui:options"].removable
    };

    return uiSchema
  }

  mergeObjects(one, two) {
    return { ...one, ...two };
  }
}
