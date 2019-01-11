import React from "react";

export default class RiskField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riskBaselineRisk: this.props.formData.riskBaselineRisk,
      riskBaselineImpact: this.props.formData.riskBaselineImpact,
      riskBaselineLikelihood: this.props.formData.riskBaselineLikelihood,
      riskBaselineMitigationsInPlace: this.props.formData.riskBaselineMitigationsInPlace,
      riskCurrentReturnLikelihood: this.props.formData.riskCurrentReturnLikelihood || "1",
      riskAnyChange: this.props.formData.riskAnyChange,
      riskCurrentReturnMitigationsInPlace: this.props.formData.riskCurrentReturnMitigationsInPlace,
      riskMet: this.props.formData.riskMet,
      riskCompletionDate: this.props.formData.riskCompletionDate
    };
  }

  onFieldChange = (name, e) => {
    this.setState({ [name]: e }, () => {
      this.props.onChange(this.state);
    });
  };

  renderRiskDescription = () => (
    <div>
      <h5>
        <b data-test="risk-description-title">
          {this.props.schema.properties.riskBaselineRisk &&
            this.props.schema.properties.riskBaselineRisk.title}
        </b>
      </h5>
      <p data-test="risk-description">{this.props.formData.riskBaselineRisk}</p>
    </div>
  );

  renderRiskBaselineImpact = () => (
    <div className="col-md-3">
      <h5 data-test="risk-impact-title">
        {this.props.schema.properties.riskBaselineImpact &&
          this.props.schema.properties.riskBaselineImpact.title}
        :
      </h5>
      <p data-test="risk-impact">{this.props.formData.riskBaselineImpact}</p>
    </div>
  );

  renderRiskLikelihood = () => (
    <div className="col-md-3">
      <h5 data-test="risk-likelihood-title">
        {this.props.schema.properties.riskBaselineLikelihood &&
          this.props.schema.properties.riskBaselineLikelihood.title}
        :
      </h5>
      <p data-test="risk-likelihood">
        {this.props.formData.riskBaselineLikelihood}
      </p>
    </div>
  );

  renderRiskMitigationInPlace = () => (
    <div className="col-md-6">    
      <h5>
        <b data-test="risk-mitigation-in-place-title">
          {this.props.schema.properties.riskBaselineMitigationsInPlace &&
            this.props.schema.properties.riskBaselineMitigationsInPlace.title}
        </b>
      </h5>
      <p data-test="risk-mitigation-in-place">
        {this.props.formData.riskBaselineMitigationsInPlace}
      </p>
    </div>
  );

  renderCurrentReturnLikelihood = () => {
    if(this.state.riskMet !== "No") return null;
    return (<div className="col-md-2">
        <this.props.registry.fields.SchemaField
          id="currentReturnLikelihood"
          schema = {this.props.schema.properties.riskCurrentReturnLikelihood}
          uiSchema = {{}}
          data-test="current-return-likelihood"
          formData = {this.state.riskCurrentReturnLikelihood}
          onChange={e =>
            this.onFieldChange("riskCurrentReturnLikelihood", e)}
        />
    </div>
    )
  };


  renderChangeInRisk = () => {
    if(this.state.riskMet !== "No") return null;
    return (<div className="col-md-2">
      <this.props.registry.fields.SchemaField
          id="riskMet"
          schema = {this.props.schema.properties.riskAnyChange}
          uiSchema = {{"ui:widget": "radio"}}
          formData = {this.state.riskAnyChange}
          data-test = "change-in-risk"
          onChange = {e => this.onFieldChange("riskAnyChange", e)}
        />
      </div>
    )
  };

  renderRiskMet = () => {
    return (
      <div className="col-md-2">
        <this.props.registry.fields.SchemaField
          id="riskMet"
          schema = {this.props.schema.properties.riskMet}
          uiSchema = {{"ui:widget": "radio"}}
          data-test="risk-met"
          formData = {this.state.riskMet}
          onChange = {e => this.onFieldChange("riskMet", e)}
        />
      </div>
    );
  }

  renderCompletionDate = () => {
    if(this.state.riskMet !== "Yes") return null;
    return (
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-12">
            <label
              htmlFor="completionDate"
              data-test="risk-completed-date-title"
            >
              {this.props.schema.properties.riskCompletionDate &&
                this.props.schema.properties.riskCompletionDate.title}{" "}
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <this.props.registry.widgets.britishDate
              onChange={e => this.onFieldChange("riskCompletionDate", e)}
              data-test="risk-completed-date"
              value={this.state.riskCompletionDate}
              className="form-control"
              id="completionDate"
            />
          </div>
        </div>
      </div>
   
    )
  }

  renderCurrentMitigationsInPlace = () => {
    if ((this.state.riskAnyChange !== "Yes") || (this.state.riskMet !== "No")) return null;
    return (
      <div className="col-md-6">
        <label
          htmlFor="currentReturnMitigationInPlace"
          data-test="risk-current-mitigations-in-place-title"
        >
          {this.props.schema.properties.riskCurrentReturnMitigationsInPlace &&
            this.props.schema.properties.riskCurrentReturnMitigationsInPlace
              .title}
        </label>
        <textarea
          className="form-control"
          id="currentReturnMitigationInPlace"
          onChange={e =>
            this.onFieldChange("riskCurrentReturnMitigationsInPlace", e.target.value)
          }
          data-test="risk-current-mitigations-in-place"
          value={this.state.riskCurrentReturnMitigationsInPlace}
        />
      </div>
    );
  };

  renderBody = () => (
    <div className="panel-body">
      <div className="row">
        <div className="col-md-6">
          {this.renderRiskDescription()}
          <div className="row">
            {this.renderRiskBaselineImpact()}
            {this.renderRiskLikelihood()}
            <div className="col-md-6" />
          </div>
        </div>
        {this.renderRiskMitigationInPlace()}
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        {this.renderRiskMet()}
        {this.renderCurrentReturnLikelihood()}
        {this.renderChangeInRisk()}
        {this.renderCompletionDate()}
        {this.renderCurrentMitigationsInPlace()}
      </div>
    </div>
  );

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" data-test="schema-title">
          {this.props.schema.title}
        </div>
        {this.renderBody()}
      </div>
    );
  }
}
