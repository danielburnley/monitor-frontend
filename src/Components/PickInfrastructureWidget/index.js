import React from "react";

export default class PickInfrastructureWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      infrastructures: []
    }
  }

  componentDidMount = async () => {
    await this.props.formContext.getInfrastructures.execute(this, this.props.formContext.projectId)
  }

  presentInfrastructures = async (infrastructures) => {
    await this.setState({
      infrastructures,
      loading: false
    })
  }

  presentProjectNotFound = () => {}

  onSelection = (id) => {
    this.props.onChange({infrastructureId: id})
  }

  renderInfrastructures = () => {
    return this.state.infrastructures.map(infrastructure => {
      return  (
      <option
        key={`infrastructure-${infrastructure.id}`}
        value={infrastructure.id}
        data-test={`infrastructure-${infrastructure.id}`}
      >
        {infrastructure.description}
      </option>
      )
    })
  }

  render() {
    if(this.state.loading) {
      return <div data-test="loading" />
    } else {
      return <div>
        <div className="form-group">
          <label htmlFor="infrastructurePicker">Please select which infrastructure this relates to.</label>
          <select
            data-test="infrastructue-picker"
            className="form-control"
            id="infrastructurePicker"
            onChange={e => this.onSelection(e.target.value)}
          >
          {this.renderInfrastructures()}
          </select>
        </div>
      </div>
    }
  }
}