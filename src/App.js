import React from 'react';
import ProjectForm from './Components/ProjectForm';
import ReturnForm from './Components/ReturnForm';
import GetProject from './UseCase/GetProject';
import GetReturn from './UseCase/GetReturn'
import CreateReturn from './UseCase/CreateReturn'
import ProjectGateway from './Gateway/ProjectGateway';
import ReturnGateway from './Gateway/ReturnGateway'

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
  <Router>
    <div className='monitor-container'>
      <Route exact path="/" component={Home} />
      <Route exact path="/project/:id" component={Project} />
      <Route exact path="/project/:projectId/return" component={Return} />
      <Route exact path="/project/:projectId/return/:returnId" component={Return} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const getProjectUsecase = new GetProject(new ProjectGateway());
const getReturnUsecase = new GetReturn(new ReturnGateway());
const createReturn = new CreateReturn(new ReturnGateway());

//Presenters
class Return extends React.Component {

  constructor() {
    super();
    this.state = {loading: true};
  }

  submissionSuccessful = returnId => {
    this.props.history.push(`return/${returnId}`);
  }

  onFormSubmit = async formData => {
    createReturn.execute(this, {projectId: this.props.match.params.projectId, data: formData})
  }

  presentReturn = async projectData => {
    await this.setState({loading: false, formData: projectData.data, formSchema: projectData.schema});
  };

  presentProject = async projectData => {
    await this.setState({loading: false, formData: projectData.data, formSchema: projectData.schema});
  };

  fetchData = () => {
    if(this.props.match.params.returnId) {
      getReturnUsecase.execute(this, {id: this.props.match.params.returnId})
    } else {
      getProjectUsecase.execute(this, {id: this.props.match.params.projectId});
    }
  };

  isReadOnly = () => {
    return !(this.props.match.params.returnId === undefined)
  }

  async componentDidMount() {
    await this.fetchData();
  }

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <ReturnForm
        onSubmit={this.onFormSubmit}
        data={this.state.formData}
        schema={this.state.formSchema}
        readOnly={this.isReadOnly()}
      />
    );
  }

  backToProject = (e) => {
    this.props.history.push(`/project/${this.props.match.params.projectId}`)
    e.preventDefault()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-2 back-to-project">
          <button className="btn btn-link btn-lg btn-block" onClick={this.backToProject}>Back to project overview</button>
        </div>
        <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
      </div>
    );
  }
}

class Project extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  presentProject = async projectData => {
    await this.setState({loading: false, formData: projectData.data, formSchema: projectData.schema });
  };

  fetchData = async () => {
    await getProjectUsecase.execute(this, {id: this.props.match.params.id});
  };

  async componentDidMount() {
    await this.fetchData();
  }

  createReturn = (e) => {
    this.props.history.push(`/project/${this.props.match.params.id}/return`);
    e.preventDefault()
  }

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <div>
        <ProjectForm
          reviewId={this.props.match.params.id}
          data={this.state.formData}
          schema={this.state.formSchema}
        />
        <button className="btn btn-primary" onClick={this.createReturn}>Create a new return</button>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
      </div>
    );
  }
}

export default App;
