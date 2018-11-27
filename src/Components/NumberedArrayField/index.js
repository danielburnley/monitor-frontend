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
  render() {
    return <div>
          <ol>{
            this.props.formData &&
            this.props.formData.map((data, index) => <li key={index}>
              <Form formData={data} schema={this.props.schema.items}><br/></Form>
            </li>)
          }
        </ol>
      <AddButton onClick={this.addItem} />
    </div>;
    //Switch away from index to an id based on contents or something
    //return <ol>{this.props.formData.map((object, index) => <li key = {index}><Form formData={object} schema={this.props.schema.items} uiSchema={this.props.uiSchema}><br/></Form></li>)}</ol>
  }
}
