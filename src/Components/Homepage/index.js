import runtimeEnv from "@mars/heroku-js-runtime-env";
import "./style.css";
import React from "react";

export default class Homepage extends React.Component {
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

  render() {
    if (this.state.loading) {
      return <div />;
    }
    return (
      <div className="homepage">
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <h1>Homes England Monitor</h1>
          <p>
            Welcome to the Homes England monitoring system. Here are the projects you are a member of.
          </p>
        </div>
        <div className="col-md-2" />
      </div>
      <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
        {this.props.children({
          projectList: this.state.projectList
        })}
      </div>
      <div className="col-md-2" />
    </div>
    </div>
    );
  }
}
