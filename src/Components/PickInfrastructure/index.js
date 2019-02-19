import React from "react";

export default class PickInfrastruture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      laoding: true
    }
  }
  presentInfrastructures = async (infrastructuresData) => {
    let infrastructures = infrastructuresData.map(infrastructure => infrastructure.data)
    await this.setState({
      infrastructures,
      loading: false
    })
  }

  componentDidMount = async () => {
    await this.props.getInfrastructures.execute(this, this.props.projectId)
  }

  renderInfrastructures = () => {
    // this.state.infrastructures.forEach(infrastructure => {
    //   <div data-test={`infrastructure-${infrastructure.id}`}>

    //   </div>
    // })
  }

  render() {
    if(this.state.loading) {
      return <div />
    } else {
      return <div>
        {this.renderInfrastructures()}
      </div>
    }
  }
}