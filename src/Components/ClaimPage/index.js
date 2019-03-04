import React from "react";

export default class ClaimPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  presentClaimNotFound = () => {}; 

  presentClaim = claimData => {
    let uiSchema;
    if (claimData.status === "Submitted") {
      uiSchema = this.props.generateSubmittedUiSchema.execute(claimData.schema)
    } else {
      uiSchema = this.props.generateUiSchema.execute(claimData.schema)
    }

    this.setState({
      loading: false,
      type: claimData.type,
      status: claimData.status || "New",
      schema: claimData.schema,
      uiSchema: uiSchema,
      formData: claimData.data
    })
  }

  componentDidMount = () => {
    if (this.props.match.params.claimId) {
      this.props.getClaim.execute(
        this, {
          id: this.props.match.params.claimId,
          projectId: this.props.match.params.projectId
        }
      )
    } else {
      this.props.getBaseClaim.execute(
        this, {
          projectId: this.props.match.params.projectId
        }
      )
    }
  }

  render() {
    if (this.state.loading) {
      return <div data-test="loading"/>
    } else {
      return <div>
        {this.props.children({
          formData: this.state.formData,
          schema: this.state.schema,
          type: this.state.type,
          uiSchema: this.state.uiSchema,
          status: this.state.status
        })}
      </div>
    }
  }
}