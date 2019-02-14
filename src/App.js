import "core-js";
import React from "react";
import qs from "qs";

import StaticData from "./Components/StaticData";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NewProjectPage from "./Components/NewProjectPage";
import ProjectPage from "./Components/ProjectPage";
import ProjectSummary from "./Components/ProjectPage/ProjectSummary";
import ProjectList from "./Components/ProjectList";
import ReturnList from "./Components/ReturnList";
import ReturnListProvider from "./Components/ReturnListProvider";
import ReturnPage from "./Components/ReturnPage";
import Portal from "./Components/Portal";
import ProjectPortal from "./Components/ProjectPortal";
import NotFound from "./Components/NotFound";
import CookieConsent from "./Components/CookieConsent";
import PrintReturn from "./Components/PrintReturn";

import CreateReturn from "./UseCase/CreateReturn";
import SubmitProject from "./UseCase/SubmitProject";
import UpdateProject from "./UseCase/UpdateProject";
import GenerateDisabledUISchema from "./UseCase/GenerateDisabledUISchema";
import GenerateUISchema from "./UseCase/GenerateUISchema";
import GetBaseReturn from "./UseCase/GetBaseReturn";
import CanAccessProject from "./UseCase/CanAccessProject";
import CanAccessMonitor from "./UseCase/CanAccessMonitor";
import GetProject from "./UseCase/GetProject";
import GetReturn from "./UseCase/GetReturn";
import GetReturns from "./UseCase/GetReturns"
import GetUserProjects from "./UseCase/GetUserProjects";
import SubmitReturn from "./UseCase/SubmitReturn";
import GetRole from "./UseCase/GetRole";
import UpdateReturn from "./UseCase/UpdateReturn";
import UnsubmitProject from "./UseCase/UnsubmitProject";
import RequestToken from "./UseCase/RequestToken";
import ValidateReturn from "./UseCase/ValidateReturn";
import ValidateProject from "./UseCase/ValidateProject";

import ProjectGateway from "./Gateway/ProjectGateway";
import ReturnGateway from "./Gateway/ReturnGateway";
import LocationGateway from "./Gateway/LocationGateway";
import UserGateway from "./Gateway/UserGateway";
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
const userGateway = new UserGateway(apiKeyGateway);
const getRole = new GetRole(userRoleGateway);
const validateReturnUseCase = new ValidateReturn(returnGateway);
const validateProjectUseCase = new ValidateProject(projectGateway);
const createReturnUseCase = new CreateReturn(returnGateway);
const submitProjectUseCase = new SubmitProject(projectGateway);
const generateUISchema = new GenerateUISchema(userRoleGateway);
const generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
const getBaseReturnUseCase = new GetBaseReturn(returnGateway);
const getProjectUseCase = new GetProject(projectGateway);
const getReturnUseCase = new GetReturn(returnGateway);
const getUserProjectsUseCase = new GetUserProjects(userGateway);
const canAccessProjectUseCase = new CanAccessProject(tokenGateway, apiKeyGateway, userRoleGateway, projectGateway);
const canAccessMonitorUseCase = new CanAccessMonitor(tokenGateway, apiKeyGateway, userRoleGateway);
const getReturnsUseCase = new GetReturns(returnGateway);
const requestTokenUseCase = new RequestToken(tokenGateway);
const submitReturnUseCase = new SubmitReturn(returnGateway);
const unsubmitProject = new UnsubmitProject(projectGateway)
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
    getRole={getRole}
    generateSubmittedSchema={generateDisabledUISchema}
    documentGateway={documentGateway}
  />
);

const CreateReturnButton = props => (
  <button
    data-test="new-return-button"
    className="btn btn-primary"
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

const renderNewProjectPage = (props, projectStatus, formData, formSchema, projectType, formUiSchema, timestamp) => (
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
    getRole={getRole}
    timestamp={timestamp}
  />
);

const renderSubmittedProjectPage = (props, formData, formSchema) => (
  <div className="col-md-10 col-md-offset-1">
    <ProjectSummary data={formData} schema={formSchema}  unsubmitProject={unsubmitProject} projectId={props.match.params.id}/>
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
    {({ projectStatus, formData, formSchema, projectType, formUiSchema, timestamp }) => {
      if (projectStatus === "Draft" || projectStatus === "LA Draft") {
        return renderNewProjectPage(props, projectStatus, formData, formSchema, projectType, formUiSchema, timestamp);
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
        <StaticData formData={formData} schema={formSchema} />
        <div className="col-md-2">
          <CreateReturnButton {...props} />
        </div>
      </div>
    )}
  </ProjectPage>
);

const renderPrintPage = props => (
   <PrintReturn {...props} getReturn={getReturnUseCase} >
    {({schema, data}) => (
      <div>
        <StaticData formData={data} schema={schema} />
      </div>
    )}
   </PrintReturn>
);

const renderhomepage = props => (
  <Homepage {...props} getUserProjects={getUserProjectsUseCase} >
    {({projectList}) => (
      <ProjectList projectList={projectList} {...props} />
    )}
  </Homepage>
);


const App = () => (
  <Router>
    <div className="app-container">
      <CookieConsent showCookieConsent={showCookieConsent}/>
      <Header />

      <div className="monitor-container">
          <Route
            path="/"
            render={props => (
              <Portal
                {...props}
                requestToken={requestTokenUseCase}
                token={
                  qs.parse(props.location.search, { ignoreQueryPrefix: true })
                    .token
                }
                canAccessMonitor={canAccessMonitorUseCase}
              >
                <Switch>
                  <Route 
                    exact
                    path="/"
                    render={renderhomepage}
                  />
                  <Route
                    path="/project/:id"
                    render={props => (
                      <ProjectPortal
                      {...props}
                      url={props.match.url}
                      projectId={props.match.params.id}
                      canAccessProject={canAccessProjectUseCase}

                      >
                        <Route exact path="/project/:id" render={renderProjectPage} />
                        <Route
                          exact
                          path="/project/:id/new"
                          render={renderNewProjectPage}
                        />
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
                        <Route
                          exact
                          path="/project/:projectId/return/:returnId/print"
                          render={renderPrintPage}
                        />
                      </ProjectPortal>
                    )}
                    />
                  <Route
                    path="*"
                    exact={true}
                    component={NotFound}
                  />
                </Switch>
              </Portal>
            )}
          />

      </div>

      <Footer />
    </div>
  </Router>
);

export default App;
