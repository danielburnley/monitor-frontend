import React from "react";
import qs from "qs";

import BaselineData from "./Components/BaselineData";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NewProjectPage from "./Components/NewProjectPage";
import ProjectPage from "./Components/ProjectPage";
import ProjectSummary from "./Components/ProjectPage/ProjectSummary";
import ReturnList from "./Components/ReturnList";
import ReturnListProvider from "./Components/ReturnListProvider";
import ReturnPage from "./Components/ReturnPage";
import Portal from "./Components/Portal";
import NotFound from "./Components/NotFound";
import CookieConsent from "./Components/CookieConsent";

import CreateReturn from "./UseCase/CreateReturn";
import SubmitProject from "./UseCase/SubmitProject";
import UpdateProject from "./UseCase/UpdateProject";
import GenerateDisabledUISchema from "./UseCase/GenerateDisabledUISchema";
import GenerateUISchema from "./UseCase/GenerateUISchema";
import GetBaseReturn from "./UseCase/GetBaseReturn";
import CanAccessProject from "./UseCase/CanAccessProject";
import GetProject from "./UseCase/GetProject";
import GetReturn from "./UseCase/GetReturn";
import GetReturns from "./UseCase/GetReturns"
import SubmitReturn from "./UseCase/SubmitReturn";
import UpdateReturn from "./UseCase/UpdateReturn";
import RequestToken from "./UseCase/RequestToken";
import ValidateReturn from "./UseCase/ValidateReturn";
import ValidateProject from "./UseCase/ValidateProject";

import ProjectGateway from "./Gateway/ProjectGateway";
import ReturnGateway from "./Gateway/ReturnGateway";
import LocationGateway from "./Gateway/LocationGateway";
import CookieApiKey from "./Gateway/CookieApiKey";
import TokenGateway from "./Gateway/TokenGateway";
import DocumentGateway from "./Gateway/DocumentGateway";
import CookieConsentGateway from "./Gateway/CookieConsent";
import ShowCookieConsent from "./UseCase/ShowCookieConsent";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CookieUserRole from "./Gateway/CookieUserRole";

const locationGateway = new LocationGateway(window.location);
const tokenGateway = new TokenGateway();
const cookieConsentGateway = new CookieConsentGateway();
const showCookieConsent = new ShowCookieConsent(cookieConsentGateway);
const apiKeyGateway = new CookieApiKey();
const userRoleGateway = new CookieUserRole();
const projectGateway = new ProjectGateway(apiKeyGateway, locationGateway);
const returnGateway = new ReturnGateway(apiKeyGateway, locationGateway);
const documentGateway = new DocumentGateway(document)
const validateReturnUseCase = new ValidateReturn(returnGateway);
const validateProjectUseCase = new ValidateProject(projectGateway);
const createReturnUseCase = new CreateReturn(returnGateway);
const submitProjectUseCase = new SubmitProject(projectGateway);
const generateDisabledUISchema = new GenerateDisabledUISchema();
const generateUISchema = new GenerateUISchema(userRoleGateway);
const getBaseReturnUseCase = new GetBaseReturn(returnGateway);
const getProjectUseCase = new GetProject(projectGateway);
const getReturnUseCase = new GetReturn(returnGateway);
const canAccessProjectUseCase = new CanAccessProject(tokenGateway, apiKeyGateway, userRoleGateway, projectGateway);
const getReturnsUseCase = new GetReturns(returnGateway);
const requestTokenUseCase = new RequestToken(tokenGateway);
const submitReturnUseCase = new SubmitReturn(returnGateway);
const updateReturnUseCase = new UpdateReturn(returnGateway);
const updateProjectUseCase = new UpdateProject(projectGateway);

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
    documentGateway={documentGateway}
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

const renderNewProjectPage = (props, projectStatus, formData, formSchema, projectType, formUiSchema) => (
  <NewProjectPage
    {...props}
    uiSchema={formUiSchema}
    status={projectStatus}
    schema={formSchema}
    data={formData}
    projectType={projectType}
    getProject={getProjectUseCase}
    submitProject={submitProjectUseCase}
    updateProject={updateProjectUseCase}
    validateProject={validateProjectUseCase}
    documentGateway={documentGateway}
  />
);

const renderSubmittedProjectPage = (props, formData, formSchema) => (
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
    <div className="row">
      <ReturnListProvider projectId={props.match.params.id} getReturns={getReturnsUseCase}>
        {({ returns }) => (
          <ReturnList {...props} returns={returns} />
        )}
      </ReturnListProvider>
    </div>
  </div>
);

const renderProjectPage = props => (
  <ProjectPage {...props} getProject={getProjectUseCase} generateUISchema={generateUISchema} >
    {({ projectStatus, formData, formSchema, projectType, formUiSchema }) => {
      if (projectStatus === "Draft" || projectStatus === "LA Draft") {
        return renderNewProjectPage(props, projectStatus, formData, formSchema, projectType, formUiSchema);
      }
      if (projectStatus === "Submitted") {
        return renderSubmittedProjectPage(props, formData, formSchema);
      }
    }}
  </ProjectPage>
);

const renderBaselinePage = props => (
  <ProjectPage {...props} getProject={getProjectUseCase} generateUISchema={generateUISchema}>
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
      <CookieConsent showCookieConsent={showCookieConsent}/>
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
                requestToken={requestTokenUseCase}
                token={
                  qs.parse(props.location.search, { ignoreQueryPrefix: true })
                    .token
                }
                canAccessProject={canAccessProjectUseCase}
              >
                <Route
                  exact
                  path="/project/:id/new"
                  render={renderNewProjectPage}
                />
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
