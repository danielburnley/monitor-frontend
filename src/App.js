import React from "react";
import qs from "qs";

import BaselineData from "./Components/BaselineData";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ProjectForm from "./Components/ProjectForm";
import ProjectPage from "./Components/ProjectPage";
import ProjectSummary from "./Components/ProjectPage/ProjectSummary";
import ReturnPage from "./Components/ReturnPage";
import GetToken from "./Components/GetToken";
import Portal from "./Components/Portal";
import NotFound from "./Components/NotFound";

import CreateReturn from "./UseCase/CreateReturn";
import GenerateDisabledUISchema from "./UseCase/GenerateDisabledUISchema";
import GenerateReadOnlySchema from "./UseCase/GenerateReadOnlySchema";
import GenerateUISchema from "./UseCase/GenerateUISchema";
import GetBaseReturn from "./UseCase/GetBaseReturn";
import CanAccessProject from "./UseCase/CanAccessProject";
import GetProject from "./UseCase/GetProject";
import GetReturn from "./UseCase/GetReturn";
import SubmitReturn from "./UseCase/SubmitReturn";
import UpdateReturn from "./UseCase/UpdateReturn";
import RequestToken from "./UseCase/RequestToken";
import ValidateReturn from "./UseCase/ValidateReturn";

import ProjectGateway from "./Gateway/ProjectGateway";
import ReturnGateway from "./Gateway/ReturnGateway";
import LocationGateway from "./Gateway/LocationGateway";
import ApiKeyGateway from "./Gateway/ApiKeyGateway";
import TokenGateway from "./Gateway/TokenGateway";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const returnGateway = new ReturnGateway(new ApiKeyGateway(), new LocationGateway(window.location));
const validateReturnUseCase = new ValidateReturn(returnGateway);
const createReturnUseCase = new CreateReturn(returnGateway);
const generateDisabledUISchema = new GenerateDisabledUISchema();
const generateReadOnlySchema = new GenerateReadOnlySchema();
const generateUISchema = new GenerateUISchema();
const getBaseReturnUseCase = new GetBaseReturn(returnGateway);
const getProjectUseCase = new GetProject(new ProjectGateway());
const getReturnUseCase = new GetReturn(returnGateway);
const canAccessProjectUseCase = new CanAccessProject(new TokenGateway());
const requestTokenUseCase = new RequestToken(new TokenGateway());
const submitReturnUseCase = new SubmitReturn(returnGateway);
const updateReturnUseCase = new UpdateReturn(returnGateway);

const renderReturnPage = props => (
  <ReturnPage
    {...props}
    validateReturn={validateReturnUseCase}
    getReturn={getReturnUseCase}
    getBaseReturn={getBaseReturnUseCase}
    createReturn={createReturnUseCase}
    submitReturn={submitReturnUseCase}
    updateReturn={updateReturnUseCase}
    generateUISchema={generateUISchema}
    generateSubmittedSchema={generateDisabledUISchema}
  />
);

const CreateReturnButton = props => (
  <button
    data-test="new-return-button"
    className="btn btn-primary btn-block"
    onClick={() =>
      props.history.push(`/project/${props.match.params.id}/return`)
    }
  >
    Create new return
  </button>
);

const ViewBaselineButton = props => (
  <button
    data-test="view-baseline-button"
    className="btn btn-secondary"
    onClick={() =>
      props.history.push(`/project/${props.match.params.id}/baseline`)
    }
  >
    View baseline information
  </button>
);

const BackToProjectOverviewButton = props => (
  <button
    className="btn btn-link btn-lg"
    onClick={() => props.history.push(`/project/${props.match.params.id}`)}
  >
    Back to project overview
  </button>
);

const renderProjectPage = props => (
  <ProjectPage {...props} getProject={getProjectUseCase}>
    {({ formData, formSchema }) => (
      <div className="col-md-10 col-md-offset-1">
        <ProjectSummary data={formData} schema={formSchema} />
        <div className="row">
          <div className="col-md-2">
            <CreateReturnButton {...props} />
          </div>
          <div className="col-md-2">
            <ViewBaselineButton {...props} />
          </div>
        </div>
      </div>
    )}
  </ProjectPage>
);

const renderBaselinePage = props => (
  <ProjectPage {...props} getProject={getProjectUseCase}>
    {({ formData, formSchema }) => (
      <div className="col-md-10 col-md-offset-1">
        <BackToProjectOverviewButton {...props} />
        <BaselineData formData={formData} schema={formSchema} />
        <div className="col-md-2">
          <CreateReturnButton {...props} />
        </div>
      </div>
    )}
  </ProjectPage>
);

const App = () => (
  <Router>
    <div className="app-container">
      <Header />

      <div className="monitor-container">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route
            path="/project/:id"
            render={props => (
              <Portal
                {...props}
                projectId={props.match.params.id}
                onApiKey={apiKey => {
                  window.apiKey = apiKey;
                }}
                requestToken={requestTokenUseCase}
                token={
                  qs.parse(props.location.search, { ignoreQueryPrefix: true })
                    .token
                }
                canAccessProject={canAccessProjectUseCase}
              >
                <Route exact path="/project/:id" render={renderProjectPage} />
                <Route
                  exact
                  path="/project/:id/baseline"
                  render={renderBaselinePage}
                />
                <Route
                  exact
                  path="/project/:projectId/return"
                  render={renderReturnPage}
                />
                <Route
                  exact
                  path="/project/:projectId/return/:returnId"
                  render={renderReturnPage}
                />
              </Portal>
            )}
          />

          <Route path="*" exact={true} component={NotFound} />
        </Switch>
      </div>

      <Footer />
    </div>
  </Router>
);

export default App;
