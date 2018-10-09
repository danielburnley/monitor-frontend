import React from "react";
import 'core-js/es6/map';
import 'core-js/es6/array';
import 'core-js/fn/array/find';


export default class BaselineData extends React.Component {
  renderObject = (key, value, propertySchema) => {
    return (
      <div className="panel panel-default" key={key}>
        <div className="panel-heading" data-test={`title-${key}`}>
          {propertySchema.title}
        </div>
        <div className="panel-body">
          {this.renderFormData(value, propertySchema)}
        </div>
      </div>
    );
  };

  renderArray = (key, value, propertySchema) => {
    return value.map((item, index) => {
      return (
        <div className="panel panel-default" key={`${key}_${index}`}>
          <div className="panel-heading" data-test={`title-${key}`}>
            {propertySchema.items.title} {index + 1}
          </div>
          <div className="panel-body">
            {this.renderFormData(item, propertySchema.items)}
          </div>
        </div>
      );
    });
  };

  renderItem = (key, value, propertySchema) => {
    return (
      <div key={key}>
        <h4 data-test={`title-${key}`}>{propertySchema.title}</h4>
        <p data-test={key}>{value}</p>
      </div>
    );
  };

  renderObjectData = (obj, schema) => {
    return Object.entries(obj).map(([key, value]) => {
      let propertySchema = this.findInSchema(schema, key);
      if (propertySchema) {
        if (propertySchema.type == "object") {
          return this.renderObject(key, value, propertySchema);
        } else {
          if (propertySchema.type == "array") {
            return this.renderArray(key, value, propertySchema);
          } else {
            return this.renderItem(key, value, propertySchema);
          }
        }
      }
    });
  };

  renderFormData = (obj, schema) => {
    if (schema.type == "array") {
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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h2 data-test="title">{this.props.schema.title}</h2>
        </div>
        <div className="panel-body">
          {this.renderFormData(this.props.formData, this.props.schema)}
        </div>
      </div>
    );
  }
}
