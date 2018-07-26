import React from 'react';
import FormField from './components/FormField';
import ReviewForm from './components/ReviewForm';
import GetProject from './UseCase/GetProject';
import ProjectGateway from './Gateway/ProjectGateway';

import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/review/:id" component={Review} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const getProjectUsecase = new GetProject(new ProjectGateway());

class Review extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  presentProject = async projectData => {
    await this.setState({loading: false, reviewData: projectData});
  };

  fetchData = () => {
    getProjectUsecase.execute(this, { id: this.props.match.params.id })
  };

  async componentDidMount() {
    await this.fetchData();
  }

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <ReviewForm
        reviewId={this.props.match.params.id}
        data={this.state.reviewData.data}
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
