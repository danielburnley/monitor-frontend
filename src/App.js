import React from 'react';
import FormField from './components/FormField';
import ProjectForm from './components/ProjectForm';
import GetProject from './UseCase/GetProject';
import ProjectGateway from './Gateway/ProjectGateway';

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/project/:id" component={Project} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const getProjectUsecase = new GetProject(new ProjectGateway());

class Project extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  presentProject = async projectData => {
    const summary = projectData.data.summary;
    const infrastructure = projectData.data.infrastructure;
    const financial = projectData.data.financial;

    const formData = {
      summary: {
        name: summary.projectName,
        description: summary.description,
        status: summary.status,
        leadAuthority: summary.leadAuthority,
      },
      infrastructure: {
        infraType: infrastructure.type,
        description: infrastructure.description,
        completionDate: infrastructure.completionDate,
      },
      financial: {
        dateReceived: financial.date,
        fundedThroughHIF: financial.fundedThroughHIF,
      },
    };

    await this.setState({loading: false, formData: formData});
  };

  fetchData = () => {
    getProjectUsecase.execute(this, {id: this.props.match.params.id});
  };

  async componentDidMount() {
    await this.fetchData();
  }

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <ProjectForm
        reviewId={this.props.match.params.id}
        data={this.state.formData}
      />
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
