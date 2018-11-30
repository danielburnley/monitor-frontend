import React from "react";
import "./style.css";

export default class StaticData extends React.Component {
  renderObject = (key, value, propertySchema) => {
    return (
      <div className="section" key={key}>
        <div className="heading" data-test={`title-${key}`}>
          {propertySchema.title}
        </div>
        <div className="body">{this.renderFormData(value, propertySchema)}</div>
      </div>
    );
  };

  renderArrayItem = (key, item, index, propertySchema) => {
    return (
      <div>
        <div className="heading" data-test={`title-${key}`}>
          {propertySchema.items.title} {index + 1}
        </div>
        <div className="body">
          {this.renderFormData(item, propertySchema.items)}
        </div>
      </div>
    );
  };

  renderArray = (key, value, propertySchema) => {
    return (
      <div>
        <div className="heading">{propertySchema.title}</div>
        {value.map((item, index) => {
          return (
            <div className="section" key={`${key}_${index}`}>
              {this.renderArrayItem(key, item, index, propertySchema)}
            </div>
          );
        })}
      </div>
    );
  };

  renderItem = (key, value, propertySchema) => {
    return (
      <div key={key}>
        <span className="print-title" data-test={`title-${key}`}>
          {propertySchema.title}:{" "}
        </span>
        <span data-test={key}>{value}</span>
      </div>
    );
  };

  renderObjectData = (obj, schema) => {
    return Object.entries(obj).map(([key, value]) => {
      let propertySchema = this.findInSchema(schema, key);
      if (propertySchema) {
        if (propertySchema.type === "object") {
          return this.renderObject(key, value, propertySchema);
        } else {
          if (propertySchema.type === "array") {
            return this.renderArray(key, value, propertySchema);
          } else {
            return this.renderItem(key, value, propertySchema);
          }
        }
      }
      return null;
    });
  };

  renderFormData = (obj, schema) => {
    if (schema.type === "array") {
      return obj.map(item => {
        return this.renderFormData(item, schema.items);
      });
    } else {
      return this.renderObjectData(obj, schema);
    }
  };

  findInSchema = (schema, key) => {
    if (key in schema.properties) {
      return schema.properties[key];
    } else if (schema.dependencies) {
      return this.findInDependencies(schema, key);
    }
  };

  findInDependencies = (schema, key) => {
    let allDependencies = Object.values(schema.dependencies);
    let foundPropertySchema;
    allDependencies.forEach(dependency => {
      let properties = this.findInDependency(dependency, key);
      if (properties) {
        foundPropertySchema = properties;
      }
    });
    return foundPropertySchema;
  };

  findInDependency = (dependency, key) => {
    let dependencyOptions = dependency.oneOf;
    let dependencyConditions = dependencyOptions.find(
      item => key in item.properties
    );
    if (dependencyConditions) {
      return dependencyConditions.properties[key];
    }
  };

  render() {
    return (
      <div className="section">
        <div className="heading">
          <h2 data-test="title">{this.props.schema.title}</h2>
        </div>
        <div className="body">
          {this.renderFormData(this.props.formData, this.props.schema)}
        </div>
      </div>
    );
  }
}
