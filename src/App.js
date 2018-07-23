import React from 'react';
import FormField from './components/FormField';

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
    return <div>{this.renderForm()}</div>;
  }
}

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formData: this.initialFormData()};
  }

  initialFormData = () => {
    return {
      projectName: this.props.data.summary.projectName,
      description: this.props.data.summary.description,
      projectStatus: this.props.data.summary.status,
      leadAuthority: this.props.data.summary.leadAuthority,
      infraType: this.props.data.infrastructure.type,
      infraDescription: this.props.data.infrastructure.description,
      infraCompletion: this.props.data.infrastructure.completionDate,
      financialDate: this.props.data.financial.date,
      fundedThroughHIF: this.props.data.financial.fundedThroughHIF
        ? 'Yes'
        : 'No',
    };
  };

  onFormSubmit = async e => {
    e.preventDefault();
    let reviewData = {
      id: this.props.reviewId,
      project: {
        type: 'hif',
        baselineData: {
          summary: {
            description: this.state.formData['description'],
            projectName: this.state.formData['projectName'],
            leadAuthority: this.state.formData['leadAuthority'],
            status: this.state.formData['projectStatus'],
            statusCommentary: this.state.formData['projectStatusCommentary']
          },
          infrastructure: {
            completionDate: this.state.formData['infraCompletion'],
            description: this.state.formData['infraDescription'],
            type: this.state.formData['infraType'],
          },
          financial: {
            date: this.state.formData['financialDate'],
            fundedThroughHIF: this.state.formData['fundedThroughHIF'] === 'Yes',
          },
        },
      },
    };

    const response = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}project/update`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reviewData),
      },
    );

    if (response.ok) {
      alert('Review submitted successfully!');
    } else {
      alert('Review submission unsuccessful');
    }
  };

  onFieldChange = (fieldName, fieldValue) => {
    let formData = this.state.formData;
    formData[fieldName] = fieldValue;
    this.setState({formData});
  };

  render() {
    return (
      <div className="form-container">
        <form className="review-form" onSubmit={this.onFormSubmit}>
          <h2>Summary</h2>

          <FormField
            type="text"
            fieldLabel="Project Name"
            baseline={true}
            fieldName="projectName"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['projectName']}
          />

          <FormField
            type="text"
            fieldLabel="Project Description"
            baseline={true}
            fieldName="description"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['description']}
          />

          <FormField
            type="text"
            fieldLabel="Lead authority"
            baseline={true}
            fieldName="leadAuthority"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['leadAuthority']}
          />

          <FormField
            type="status"
            fieldLabel="Project Status"
            baseline={false}
            fieldName="projectStatus"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['projectStatus']}
          />

          <FormField
            type="text"
            fieldLabel="Commentary (if updated)"
            baseline={false}
            fieldName="projectStatusCommentary"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['projectStatusCommentary']}
          />

          <h2>Infrastructure</h2>

          <FormField
            type="text"
            fieldLabel="Type"
            baseline={true}
            fieldName="infraType"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['infraType']}
          />

          <FormField
            type="text"
            fieldLabel="Description"
            baseline={true}
            fieldName="infraDescription"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['infraDescription']}
          />

          <FormField
            type="text"
            fieldLabel="Completion Date"
            baseline={true}
            fieldName="infraCompletion"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['infraCompletion']}
          />

          <h2>Financials</h2>

          <FormField
            type="text"
            fieldLabel="Funding Date"
            baseline={true}
            fieldName="financialDate"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['financialDate']}
          />

          <FormField
            type="yes/no"
            fieldLabel="Funded through HIF"
            baseline={true}
            fieldName="fundedThroughHIF"
            updateField={this.onFieldChange}
            initialValue={this.state.formData['fundedThroughHIF']}
          />

          <button type="submit">Submit Review</button>
        </form>
      </div>
    );
  }
}

export default App;
