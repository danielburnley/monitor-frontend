import React from "react";
import PropTypes from "prop-types";

export default class RiskField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riskBaselineRisk: this.props.formData.riskBaselineRisk ,
      riskBaselineImpact: this.props.formData.riskBaselineImpact,
      riskBaselineLikelihood: this.props.formData.riskBaselineLikelihood,
      riskBaselineMitigationsInPlace:
        this.props.formData.riskBaselineMitigationsInPlace,
      riskCurrentReturnLikelihood:
        this.props.formData.riskCurrentReturnLikelihood || "1",
      riskChangeRisk: this.props.formData.riskChangeRisk || "No",
      riskCurrentMitigationsInPlace:
        this.props.formData.riskCurrentMitigationsInPlace 
    };
  }

  onFieldChange = (name, e) => {
    this.setState({ [name]: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  };

  renderRiskDescription = () => (
    <div>
      <h5>
        <b>Description of Risk</b>
      </h5>
      <p data-test="risk-description">{this.props.formData.riskBaselineRisk}</p>
    </div>
  );

  renderRiskBaselineImpact = () => (
    <div className="col-md-3">
      <h5>Impact:</h5>
      <p data-test="risk-impact">{this.props.formData.riskBaselineImpact}</p>
    </div>
  );

  renderRiskLikelihood = () => (
    <div className="col-md-3">
      <h5>Likelihood:</h5>
      <p data-test="risk-likelihood">
        {this.props.formData.riskBaselineLikelihood}
      </p>
    </div>
  );

  renderRiskMitigationInPlace = () => (
    <div className="col-md-6">
      <h5>
        <b>Mitigation in place</b>
      </h5>
      <p data-test="risk-mitigation-in-place">
        {this.props.formData.riskBaselineMitigationsInPlace}
      </p>
    </div>
  );

  renderCurrentReturnLikelihood = () => (
    <div className="col-md-3">
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="currentReturnLikelihood">
            Current Return Likelihood{" "}
          </label>
        </div>
        <div row="row">
          <div className="col-md-12">
            <select
              onChange={e =>
                this.onFieldChange("riskCurrentReturnLikelihood", e)
              }
              data-test="risk-current-likelihood"
              value={this.state.riskCurrentReturnLikelihood}
              className="form-control"
              id="currentReturnLikelihood"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  renderChangeInRisk = () => (
    <div className="col-md-3">
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="anyChangeInRisk">Any Change in Risk? </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <select
            onChange={e => this.onFieldChange("riskChangeRisk", e)}
            data-test="risk-change-in-risk"
            value={this.state.riskChangeRisk}
            className="form-control"
            id="anyChangeInRisk"
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
    </div>
  );

  renderCurrentMitigationsInPlace = () => (
    <div className="col-md-6">
      <label htmlFor="currentReturnMitigationInPlace">
        Current Return Mitigation in Place
      </label>
      <textarea
        className="form-control"
        id="currentReturnMitigationInPlace"
        onChange={e => this.onFieldChange("riskCurrentMitigationsInPlace", e)}
        data-test="risk-current-mitigations-in-place"
        value={this.state.riskCurrentMitigationsInPlace}
      />
    </div>
  );

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
        {this.renderCurrentReturnLikelihood()}
        {this.renderChangeInRisk()}
        {this.renderCurrentMitigationsInPlace()}
      </div>
    </div>
  );

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" data-test="schema-title">{this.props.schema.title}</div>
        {this.renderBody()}
      </div>
    );
  }
}
