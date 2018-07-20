import React from "react";
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    super()
    this.state = { loading: true }

    this.fetchData = this.fetchData.bind(this)
  }

  async fetchData() {
    let raw_review = await fetch(`${process.env.REACT_APP_HIF_API_URL}project/find?id=${this.props.match.params.id}`)
    let json_review = await raw_review.json()
    this.setState({ loading: false, reviewData: json_review })
  }

  componentDidMount() {
    this.fetchData() 
  }

  renderForm() {
    if(this.state.loading) {
      return (<div />)
    }

    return (
      <ReviewForm reviewId={this.props.match.params.id} data={this.state.reviewData.data} />
    )
  }

  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}

class FormField extends React.Component {
  constructor() {
    super()
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange(e) {
    this.props.updateField(this.props.fieldName, e.target.value)
  }

  render() {
    return (
      <div className="form-field">
        <div>
          <label htmlFor={this.props.fieldName}>{this.props.fieldLabel}</label>
        </div>
        <div>
          <input type="text" id={this.props.fieldName} name={this.props.fieldName} onChange={this.onFieldChange} value={this.props.initialValue}/>
        </div>
      </div>
    )
  }
} 

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {formData: {}}
  }

  onFormSubmit = async (e) => {
    e.preventDefault()
    let reviewData = {
      "id": this.props.reviewId,
      "project": {
        "type": "hif",
        "baselineData": {
          "summary": {
            "description": this.state.formData['description'],
            "projectName": this.state.formData['projectName'],
            "leadAuthority": this.state.formData['leadAuthority'],
          },
          "infrastructures": [
            {
              "completionDate": this.state.formData['infraCompletion'],
              "description": this.state.formData['infraDescription'],
              "type": this.state.formData['infraType']
            }
          ],
          "financials": [
            {
              "date": this.state.formData['financialDate'],
              "fundedThroughHIF": this.state.formData['fundedThroughHIF'] === 'Yes'
            }
          ]
        }
      }
    }

    const response = await fetch(`${process.env.REACT_APP_HIF_API_URL}project/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData)
    });

    if(response.ok) {
      alert('Review submitted successfully!')
    } else {
      alert('Review submission unsuccessful')
    }
  }

  onFieldChange = (fieldName, fieldValue) => {
    let formData = this.state.formData
    formData[fieldName] = fieldValue
    this.setState({ formData })
  }

  componentDidMount() {
    let formData = {
      'projectName': this.props.data.summary.projectName,
      'description': this.props.data.summary.description,
      'leadAuthority': this.props.data.summary.leadAuthority,
      'infraType': this.props.data.infrastructures[0].type,
      'infraDescription': this.props.data.infrastructures[0].description,
      'infraCompletion': this.props.data.infrastructures[0].completionDate,
      'financialDate': this.props.data.financials[0].date,
      'fundedThroughHIF': this.props.data.financials[0].fundedThroughHIF ? 'Yes' : 'No'
    }

    this.setState({ formData })
  }

  render() {
    return (
      <div className="form-container">
      <form className="review-form" onSubmit={this.onFormSubmit}>
      <h2>Summary</h2>
      <FormField 
        fieldLabel='Project Name'
        fieldName='projectName' updateField={this.onFieldChange} 
        initialValue={this.state.formData['projectName']} 
      />

      <FormField 
        fieldLabel='Project Description'
        fieldName='description' updateField={this.onFieldChange} 
        initialValue={this.state.formData['description']} 
      />

      <FormField 
        fieldLabel='Lead authority'
        fieldName='leadAuthority' updateField={this.onFieldChange} 
        initialValue={this.state.formData['leadAuthority']} 
      />

      <h2>Infrastructure</h2>
      <FormField 
        fieldLabel='Type'
        fieldName='infraType' updateField={this.onFieldChange} 
        initialValue={this.state.formData['infraType']} 
      />

      <FormField 
        fieldLabel='Description'
        fieldName='infraDescription' updateField={this.onFieldChange} 
        initialValue={this.state.formData['infraDescription']} 
      />

      <FormField 
        fieldLabel='Completion Date'
        fieldName='infraCompletion' updateField={this.onFieldChange} 
        initialValue={this.state.formData['infraCompletion']} 
      />

      <h2>Financials</h2>
      <FormField 
        fieldLabel='Funding Date'
        fieldName='financialDate' updateField={this.onFieldChange} 
        initialValue={this.state.formData['financialDate']} 
      />

      <FormField 
        fieldLabel='Funded through HIF'
        fieldName='fundedThroughHIF' updateField={this.onFieldChange} 
        initialValue={this.state.formData['fundedThroughHIF']} 
      />

      <button type="submit">Submit Review</button>
      </form>
      </div>
    )
  }
}

export default App;
