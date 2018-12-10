import React from 'react';

export default class FieldFake extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.formData
    }
  }

  onChangeWidget = (property, value) => {
    let formData = this.state.formData;
    if (property) {
      formData[property] = value;
    } else {
      formData = value
    }
    this.setState({formData});
    this.props.onChange(formData);
  }

  render = () => {
    if (this.props.schema.type === "object") {
    return (
      <div>
        {Object.keys(this.props.schema.properties).map((property) => (
          <input key={property} id={`root_${property}`} onChange={(e) => this.onChangeWidget(property, e.target.value)} value={this.state.formData[property]}/>
        ))}
      </div>
    )
    } else {
      return (
        <div>
          <input key={this.props["data-test"]} id={`root_${this.props["data-test"]}`} onChange={(e) => this.onChangeWidget(null, e.target.value)} value={this.state.formData}/>          
        </div>
      )
    }
  }
}
