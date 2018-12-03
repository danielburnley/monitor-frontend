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
    formData[property] = value;
    console.log(formData);
    this.setState({formData});
    this.props.onChange(formData);
  }

  render = () => (
    <div>
      {Object.keys(this.props.schema.properties).map((property) => (
        <input key={property} id={`root_${property}`} onChange={(e) => this.onChangeWidget(property, e.target.value)} value={this.state.formData[property]}/>
      ))}
    </div>
  )
}
