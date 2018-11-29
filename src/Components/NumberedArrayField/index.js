import Form from "react-jsonschema-form";
import React from "react";
import AddButton from "../AddButton";
import RemoveButton from "../RemoveButton";
import "./style.css";

export default class NumberedArrayField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.formData
    };
  }

  addItem = (e) => {
    let formData = this.state.formData;
    formData.push({});
    this.setState({formData});
  }

  removeItem = (index) => {
    let formData = this.state.formData;
    formData.splice(index, 1);
    this.setState({formData});
  }

  renderRemoveButton = (index) => {
    if (this.props.schema.addable) {
      return <RemoveButton index={index} onClick={() => this.removeItem(index)}/>
    }
    return null;
  }

  renderAddButton = () => {
    if (this.props.schema.addable) {
      return <AddButton onClick={this.addItem}/>
    }
    return null;
  }

  onChildFormChange = async (index, value) => {
    let formData = this.state.formData;
    formData[index] = value;

    await this.setState({ formData });
    if (this.props.onChange) {
      this.props.onChange(formData)
    }
  }

  generateArrayItemKey = (index) => (
    `${index}-${this.state.formData.length}`
  )

  renderArrayItem = (data, index) => (
    <li key={this.generateArrayItemKey(index)}>
      <this.props.registry.fields.SchemaField
        formData={data}
        schema={this.props.schema.items}
        onChange={(e) => this.onChildFormChange(index, e)}
      />
      {this.renderRemoveButton(index)}
    </li>
  )

  render = () => (
    <div>
        <ol>
          {
            this.state.formData &&
            this.state.formData.map(this.renderArrayItem)
          }
        </ol>
      {this.renderAddButton()}
    </div>
  )
}
