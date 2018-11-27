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
    if (this.props.addable) {
      return <RemoveButton onClick={() => this.removeItem(index)}/>
    }
    return null;
  }

  renderAddButton = () => {
    if (this.props.addable) {
      return <AddButton onClick={this.addItem}/>
    }
    return null;
  }

  renderArrayItem = (data, index) => (
    <li key={index}>
      <Form formData={data} schema={this.props.schema.items}><br/></Form>
      {this.renderRemoveButton(index)}
    </li>
  )

  render = () => (
    //Switch away from index to an key based on contents or something
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
