export default class GenerateLADraftUISchema {
  constructor(generateUISchema, generateReadOnlySchema) {
    this.generateUISchema1 = generateUISchema;
    this.generateUISchema2 = generateReadOnlySchema;
  }

  execute(schema) {
    let uiSchema = this.generateUISchema1.execute(schema);

  
    if (state !== "LA Draft") {
      return uiSchema
    }

    let readOnlyUISchema = this.generateReadOnlyUISchema.execute(schema, 'laReadOnly');

    return this.mergeUISchema(schema, readOnlyUISchema, uiSchema);
  }

  
  mergeUISchema(schema, UIschema1, UIschema2) {
    let uiSchema = {};
    if (!UIschema1) return UIschema2;
    if (!UIschema2) return UIschema1;


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

    uiSchema["ui:options"] = {
      addable:
        UIschema1["ui:options"].addable || UIschema2["ui:options"].addable,
      orderable:
        UIschema1["ui:options"].orderable || UIschema2["ui:options"].orderable,
      removable:
        UIschema1["ui:options"].removable || UIschema2["ui:options"].removable
    };


    return this.mergeObjects(parentUISchema, itemsUISchema)
  }

  mergeObjects(one, two) {
    return { ...one, ...two };
  }
}
