import React from "react";
import AddButton from "../AddButton";
import RemoveButton from "../RemoveButton";
import "./style.css";

export default class QuarterlyBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.formData || []
    };

    this.ids = {};
  }

  updateUntouchedColumns = (changedKey) => {
    Object.entries(this.props.schema.items.properties).forEach(([key])=> {
      if (key !== changedKey) {
        this.ids[key] = Math.random();
      }
    });
  }

  onFieldChange(index, name, value) {
    let newData = this.state.data;
    newData[index][name] = value

    this.updateUntouchedColumns(name);


    this.setState({
      data: newData
    })

    this.props.onChange(newData);
  }

  renderData = (quarterlyObject) => {
    let data = this.state.data;
    if(this.state.data.length === 0) {
      data.push({})
    }
    return data.map((value, index) => {
      return ( <div key={`${index}`}>
        <div className="line">
          {this.renderPeriod(quarterlyObject, value, index)}
        </div>
        <div className=" line variance-line">
          {this.renderPeriod(quarterlyObject, value, index, true)}
        </div>
      </div>
      )
    })
  }

  renderPeriod = (quarterlyObject, value, index, isVariance) => {
    return Object.entries(quarterlyObject).map(([key, schema])=> {
      if(schema.hidden) return null;
      if (isVariance) {
        return(
          <div className="data-column" key={`${index}_${key}_${this.ids[key]}_variance`}>
            {this.renderVariance(key, value[key], index, schema)}
          </div>
        );
      } else if (key !== "remove") {
        return (
          <div className="data-column" key={`${index}_${key}_${this.ids[key]}`}>
            {this.renderInputField(key, value[key], index, schema)}
          </div>
        )
      } else {
        return (
          <div className="remove" key={`${index}_${key}`}>
            {this.renderRemoveButton(index)}
          </div>
        )
      }
    })
  }

  renderVariance = (key, periodData, index, propertySchema) => {
    if(propertySchema.varianceField === "varianceTitle") {
      return <p data-test="variance-title" className="variance">Variance</p>
    } else if (propertySchema.varianceField) {
      return <p data-test="quarter1-variance" className="variance">£ {this.state.data[index][propertySchema.varianceField]}</p>
    } else {
      return;
    }
  }

  renderHeaders = (quarterlyObject) => {
    let column_class = "data-column"
    return Object.entries(quarterlyObject).map(([key, value])=> {
      if (value.hidden) return null;
      if (key === "remove") column_class = "remove";
      return (
        <div className={`header ${column_class}`} key={`${key}_${this.ids[key]}`} data-test={`${key}_title`}>
          {value.title}
        </div>
      )
    });
  }

  renderInputField(key, periodData, index, v) {
    let schema_title_striped = JSON.parse(JSON.stringify(v))
    schema_title_striped.title = ""
      return (
        <this.props.registry.fields.SchemaField
          schema = {schema_title_striped}
          data-test={`${key}_${index}`}
          formData = {periodData}
          uiSchema={this.props.uiSchema && this.props.uiSchema.items[key]}
          onChange={e => this.onFieldChange(index, key, e)}
          registry = {this.props.registry}
        />
      );
  }

  renderAddButton() {
    if (!this.props.schema.addable) {
      return null;
    }
    return <div className="data-column"><AddButton onClick={() => this.addEvent()} /></div>;
  }

  addEvent() {
    let newPeriod = {};
    let updatedArray = this.state.data;
    updatedArray.push(newPeriod);

    this.setState({ data: updatedArray });
  }

  renderRemoveButton(index) {
    if (this.props.schema.addable) {
      return <div className="remove"><RemoveButton onClick={() => this.removeEvent(index)} index={index}/></div>;
    }
    return null;
  }

  removeEvent(index) {
    let updatedArray = this.state.data;
    updatedArray.splice(index, 1);

    this.setState({ data: updatedArray });

    this.forceUpdate();
  }

  render() {
    let quarterlyObject = this.props.schema.items.properties;
    if(this.props.schema.addable) {
      quarterlyObject.remove = { title: "Remove", type: "string" };
    }
    return <div>
      <div data-test="title" className="title">
        <h4>{this.props.schema.title}</h4>
      </div>
      <div className="line">{this.renderHeaders(quarterlyObject)}</div>
        <div>{this.renderData(quarterlyObject)}</div>
      <div className="line">{this.renderAddButton()}</div>
    </div>
  }
}
