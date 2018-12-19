import React from "react";

export default class RiskField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riskBaselineRisk: this.props.formData.riskBaselineRisk,
      riskBaselineImpact: this.props.formData.riskBaselineImpact,
      riskBaselineLikelihood: this.props.formData.riskBaselineLikelihood,
      riskBaselineMitigationsInPlace: this.props.formData
        .riskBaselineMitigationsInPlace,
      riskCurrentReturnLikelihood:
        this.props.formData.riskCurrentReturnLikelihood || "1",
      riskAnyChange: this.props.formData.riskAnyChange || "No",
      riskCurrentReturnMitigationsInPlace: this.props.formData
        .riskCurrentReturnMitigationsInPlace
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

  renderCurrentReturnLikelihood = () => (
    <div className="col-md-3">
      <div className="row">
        <div className="col-md-12">
          <label
            htmlFor="currentReturnLikelihood"
            data-test="risk-current-likelihood-title"
          >
            {this.props.schema.properties.riskCurrentReturnLikelihood &&
              this.props.schema.properties.riskCurrentReturnLikelihood
                .title}{" "}
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
          <label
            htmlFor="anyChangeInRisk"
            data-test="risk-change-in-risk-title"
          >
            {this.props.schema.properties.riskAnyChange &&
              this.props.schema.properties.riskAnyChange.title}{" "}
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <select
            onChange={e => this.onFieldChange("riskAnyChange", e)}
            data-test="risk-change-in-risk"
            value={this.state.riskAnyChange}
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

  renderCurrentMitigationsInPlace = () => {
    if (this.state.riskAnyChange !== "Yes") return null;
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
            this.onFieldChange("riskCurrentReturnMitigationsInPlace", e)
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
        {this.renderCurrentReturnLikelihood()}
        {this.renderChangeInRisk()}
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
