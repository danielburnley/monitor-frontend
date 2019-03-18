import React from "react";
import "./style.css";

export default class ReturnPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  projectId = () => {
    return this.props.match.params.projectId;
  };

  returnId = () => {
    return this.props.match.params.returnId;
  };

  presentReturnNotFound = async () => {};

  presentReturn = async returnData => {
    let uiSchema = {};
    if (returnData.status === "Submitted") {
      uiSchema = this.props.generateSubmittedSchema.execute(returnData.schema);
    } else {
      uiSchema = this.props.generateUISchema.execute(returnData.schema, returnData.no_of_previous_returns);
    }
    await this.setState({
      loading: false,
      type: returnData.type,
      formData: returnData.data,
      formSchema: returnData.schema,
      formUISchema: uiSchema,
      status: returnData.status || "New"
    });
  };

  fetchData = async () => {
    if (this.returnId()) {
      await this.props.getReturn.execute(this, {
        id: this.returnId(),
        projectId: this.projectId()
      });
    } else {
      await this.props.getBaseReturn.execute(this, {
        projectId: this.projectId()
      });
    }
  };

  async componentDidMount() {
    document.title = "Return - Homes England Monitor";
    await this.fetchData();
  }

  render() {
    if (this.state.loading) {
      return <div data-test="loading"/>;
    } else {
      return ( <div>
        {this.props.children({
          data: this.state.formData,
          schema: this.state.formSchema,
          type: this.state.type,
          uiSchema: this.state.formUISchema,
          status: this.state.status
        })}
      </div>
      )
    }
  }
}
