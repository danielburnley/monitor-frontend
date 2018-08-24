import React from "react";

export default class HorizontalFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props.formData };
  }

  onChange = (name, value) => {
    this.setState({ [name]: value }, () => this.props.onChange(this.state));
  };

  render() {
    return (
      <div className='row'>
        <h4 data-test="form-title">{this.props.schema.title}</h4>
        {Object.entries(this.props.schema.properties).map(([k, v]) => {
          return (
            <div key={k} className="form-group col-sm-3 col-md-3" data-test="form-field">
              <label htmlFor={k} data-test={`${k}-label`}>{v.title}</label>
              <input
                id={k}
                data-test={`${k}-input`}
                value={this.state[k]}
                onChange={e => this.onChange(k, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
