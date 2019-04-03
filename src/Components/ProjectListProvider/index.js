import runtimeEnv from "@mars/heroku-js-runtime-env";
import React from "react";

export default class ProjectListProvider extends React.Component {
  constructor(props) {
    super(props);
    this.env = runtimeEnv();
    this.state = {
      loading: true
    }
  }

  presentProjectList= async projectList => {
    await this.setState({
      loading: false,
      projectList: projectList
    })
  }

  presentProjectListNotFound = async () => {};


  fetchData = () => {
    this.props.getUserProjects.execute(this);
  }

  componentDidMount() {
    document.title = "Homes England Monitor";
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.lastProjectUserAddedTo != prevProps.lastProjectUserAddedTo) {
      this.fetchData();
    }
  }

  render() {
    if (this.state.loading) {
      return <div data-test="loading"/>;
    }
    return <div>
      {this.props.children({
        projectList: this.state.projectList
      })}
    </div>;
  }
}
