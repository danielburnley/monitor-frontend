import "core-js";
import React from "react";
import qs from "qs";

import StaticData from "./Components/StaticData";
import Homepage from "./Components/Homepage";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import InfrastructureAdditionPage from "./Components/InfrastructureAdditionPage";
import NewProjectPage from "./Components/NewProjectPage";
import ProjectPage from "./Components/ProjectPage";
import ProjectSummary from "./Components/ProjectPage/ProjectSummary";
import ProjectList from "./Components/ProjectList";
import ReturnList from "./Components/ReturnList";
import ReturnListProvider from "./Components/ReturnListProvider";
import ReturnPage from "./Components/ReturnPage";
import FormActions from "./Components/FormActions";
import Portal from "./Components/Portal";
import ProjectPortal from "./Components/ProjectPortal";
import NotFound from "./Components/NotFound";
import CookieConsent from "./Components/CookieConsent";
import PrintReturn from "./Components/PrintReturn";
import AdminPortal from "./Components/AdminPortal";

import AddUsersToProject from "./UseCase/AddUsersToProject";
import CreateReturn from "./UseCase/CreateReturn";
import CreateProject from "./UseCase/CreateProject";
import SubmitProject from "./UseCase/SubmitProject";
import UpdateProject from "./UseCase/UpdateProject";
import GenerateInfrastructureUISchema from "./UseCase/GenerateInfrastructureUISchema";
import GenerateDisabledUISchema from "./UseCase/GenerateDisabledUISchema";
import GenerateUISchema from "./UseCase/GenerateUISchema";
import GetInfrastructures from "./UseCase/GetInfrastructures"
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
const generateInfrastructureUISchemaUseCase = new GenerateInfrastructureUISchema();
const validateReturnUseCase = new ValidateReturn(returnGateway);
const validateProjectUseCase = new ValidateProject(projectGateway);
const createReturnUseCase = new CreateReturn(returnGateway);
const createProjectUseCase = new CreateProject(projectGateway);
const submitProjectUseCase = new SubmitProject(projectGateway);
const generateUISchema = new GenerateUISchema(userRoleGateway);
const generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
const getBaseReturnUseCase = new GetBaseReturn(returnGateway);
const getInfrastructuresUseCase = new GetInfrastructures(projectGateway);
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
const addUsersToProject = new AddUsersToProject(projectGateway);

const renderReturnPage = props => (
  <ReturnPage
    {...props}
    getReturn={getReturnUseCase}
    getBaseReturn={getBaseReturnUseCase}
    generateUISchema={generateUISchema}
    generateSubmittedSchema={generateDisabledUISchema}
    >
  {({data, schema, type, uiSchema, status}) => {
    return <FormActions
      {...props}
      validate={validateReturnUseCase}
      create={createReturnUseCase}
      submit={submitReturnUseCase}
      update={updateReturnUseCase}
      getInfrastructures={getInfrastructuresUseCase}
      documentGateway={documentGateway}
      data={data}
      schema={schema}
      type={type}
      uiSchema={uiSchema}
      getRole={getRole}
      status={status}
      formType="return"
    />
    }
  }
  </ReturnPage>
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

const FillInBaselineButton = props => (
  <div>
    <p>Add the baseline information for your project here.</p>
    <button
      data-test="fill-in-baseline-button"
      className="btn btn-link"
      onClick={() =>
        props.history.push(`/project/${props.match.params.id}/baseline`)
      }
      >
      Fill in Baseline
    </button>
  </div>
);

const EditInfrastructuresButton = (props) => {
  if (props.type === "ff") {
    return <div>
      <p>Add information about the deliverables on this project here.</p>
      <button
        data-test="edit-infrastructures-button"
        className="btn btn-link"
        onClick={() =>
          props.history.push(`/project/${props.match.params.id}/infrastructures`)
        }
      >
        View/Edit Deliverables
      </button>
      </div>
  } else {
    return null;
  }
};

const BackToProjectOverviewButton = props => (
  <button
    className="btn btn-link btn-lg"
    onClick={() => props.history.push(`/project/${props.match.params.id}`)}
  >
    Back to project overview
  </button>
);

const renderInfrastructuresPage = (props) => (
  <div className="col-md-10">
    <div className="row ">
      <BackToProjectOverviewButton {...props} />
    </div>
    <div className="row  col-md-offset-1">
      <InfrastructureAdditionPage
        {...props}
        updateProject={updateProjectUseCase}
        getProject={getProjectUseCase}
        generateInfrastructureUISchema={generateInfrastructureUISchemaUseCase}
      />
    </div>
  </div>
);

const renderBaselineEditorPage = (props, projectStatus, formData, formSchema, projectType, formUiSchema, timestamp  ) => (
  <div className="col-md-10">
    <div className="row">
      <BackToProjectOverviewButton {...props} />
    </div>
    <div className="row">
      <NewProjectPage
        {...props}
        uiSchema={formUiSchema}
        status={projectStatus}
        schema={formSchema}
        data={formData}
        getInfrastructures={getInfrastructuresUseCase}
        projectType={projectType}
        getProject={getProjectUseCase}
        submitProject={submitProjectUseCase}
        updateProject={updateProjectUseCase}
        validateProject={validateProjectUseCase}
        documentGateway={documentGateway}
        getRole={getRole}
        timestamp={timestamp}
      />
    </div>
  </div>
  );

const renderNewProjectPageOverview = (props, projectStatus, formData, formSchema, projectType, formUiSchema, timestamp) => (
  <div className="col-md-10 col-md-offset-1">
    <div className="row">
      <h1>{projectType === "ac" && "Accelerated Construction"}</h1>
      <h1>{projectType === "hif" && "Marginal Viability Fund"}</h1>
      <h1>{projectType === "ff" && "Forward Funding"}</h1>
    </div>
    <div className="row">
      <h4>This is where we will create the primary profile for your project.</h4>
    </div>
    <div className="row">

      <EditInfrastructuresButton {...props} type={projectType} />
    </div>

    <div className="row">
      <FillInBaselineButton {...props} />
    </div>
  </div>
  )


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
      if (projectStatus === "Draft") {
        return renderNewProjectPageOverview(props, projectStatus, formData, formSchema, projectType, formUiSchema, timestamp);
      }
      if (projectStatus === "Submitted") {
        return renderSubmittedProjectPage(props, formData, formSchema);
      }
    }}
  </ProjectPage>
);

const renderBaselinePage = props => (
  <ProjectPage {...props} getProject={getProjectUseCase} generateUISchema={generateUISchema}>
    {({ projectStatus, formData, formSchema, projectType, formUiSchema, timestamp  }) => {
      if (projectStatus === "Submitted") {
        return <div className="col-md-10 col-md-offset-1">
          <BackToProjectOverviewButton {...props} />
          <StaticData formData={formData} schema={formSchema} />
          <div className="col-md-2">
            <CreateReturnButton {...props} />
          </div>
        </div>
      }
      if (projectStatus === "Draft") {
        return renderBaselineEditorPage(props, projectStatus, formData, formSchema, projectType, formUiSchema, timestamp  )
      }
    }}
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
      <div>
      <ProjectList projectList={projectList} {...props} />
      <AdminPortal
        getRole={getRole}
        createProject={createProjectUseCase}
        addUsersToProject={addUsersToProject}
        />
      </div>
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
                          path="/project/:id/infrastructures"
                          render={renderInfrastructuresPage}
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
