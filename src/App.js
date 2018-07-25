import React from 'react';
import FormField from './components/FormField';
import ReviewForm from './components/ReviewForm';

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

class Review extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  fetchData = async () => {
    let raw_review = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}project/find?id=${
        this.props.match.params.id
      }`,
    );
    let json_review = await raw_review.json();
    await this.setState({loading: false, reviewData: json_review});
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
        <div className="col-md-10 col-md-offset-1">
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

export default App;
