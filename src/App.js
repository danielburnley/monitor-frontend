import "core-js";
import React from "react";
import qs from "qs";

import StaticData from "./Components/StaticData";
import ProjectListProvider from "./Components/ProjectListProvider";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import InfrastructureAdditionPage from "./Components/InfrastructureAdditionPage";
import BaselinePage from "./Components/BaselinePage";
import EditBaselinePage from "./Components/EditBaselinePage";
import ProjectPage from "./Components/ProjectPage";
import ProjectSummary from "./Components/ProjectPage/ProjectSummary";
import ProjectList from "./Components/ProjectList";
import List from "./Components/List";
import ReturnListProvider from "./Components/ReturnListProvider";
import BaselineListProvider from "./Components/BaselineListProvider";
import ClaimListProvider from "./Components/ClaimListProvider";
import ReturnPage from "./Components/ReturnPage";
import ClaimPage from "./Components/ClaimPage";
import FormActions from "./Components/FormActions";
import Portal from "./Components/Portal";
import ProjectPortal from "./Components/ProjectPortal";
import NotFound from "./Components/NotFound";
import CookieConsent from "./Components/CookieConsent";
import PrintReturn from "./Components/PrintReturn";
import AdminPortal from "./Components/AdminPortal";
import AmendBaselineButton from "./Components/AmendBaselineButton";
import AmendProjectPage from "./Components/AmendProjectPage";
import ProjectOverviewProvider from "./Components/ProjectOverviewProvider"
import LogoutButton from "./Components/LogoutButton";

import AddUsersToProject from "./UseCase/AddUsersToProject";
import CreateReturn from "./UseCase/CreateReturn";
import CreateProject from "./UseCase/CreateProject";
import CreateClaim from "./UseCase/CreateClaim";
import SubmitProject from "./UseCase/SubmitProject";
import SubmitClaim from "./UseCase/SubmitClaim";
import UpdateProject from "./UseCase/UpdateProject";
import UpdateClaim from "./UseCase/UpdateClaim";
import GenerateInfrastructureUISchema from "./UseCase/GenerateInfrastructureUISchema";
import GenerateDisabledUISchema from "./UseCase/GenerateDisabledUISchema";
import GenerateHEReturnUISchema from "./UseCase/GenerateHEReturnUISchema";
import GenerateUISchema from "./UseCase/GenerateUISchema";
import GetInfrastructures from "./UseCase/GetInfrastructures"
import GetBaseReturn from "./UseCase/GetBaseReturn";
import GetBaseClaim from "./UseCase/GetBaseClaim";
import CanAccessProject from "./UseCase/CanAccessProject";
import CanAccessMonitor from "./UseCase/CanAccessMonitor";
import GetProject from "./UseCase/GetProject";
import GetProjectURL from "./UseCase/GetProjectURL";
import GetReturn from "./UseCase/GetReturn";
import GetClaim from "./UseCase/GetClaim";
import GetClaims from "./UseCase/GetClaims";
import GetReturns from "./UseCase/GetReturns"
import GetUserProjects from "./UseCase/GetUserProjects";
import SubmitReturn from "./UseCase/SubmitReturn";
import GetRole from "./UseCase/GetRole";
import UpdateReturn from "./UseCase/UpdateReturn";
import UpdateSubmittedReturn from "./UseCase/UpdateSubmittedReturn";
import RequestToken from "./UseCase/RequestToken";
import Validate from "./UseCase/Validate";
import AmendBaseline from "./UseCase/AmendBaseline";
import GetBaselines from "./UseCase/GetBaselines";
import SubmitBaseline from "./UseCase/SubmitBaseline";
import Logout from "./UseCase/Logout";
import GetProjectOverview from "./UseCase/GetProjectOverview"

import ProjectGateway from "./Gateway/ProjectGateway";
import ReturnGateway from "./Gateway/ReturnGateway";
import ClaimGateway from "./Gateway/ClaimGateway";
import LocationGateway from "./Gateway/LocationGateway";
import UserGateway from "./Gateway/UserGateway";
import CookieApiKey from "./Gateway/CookieApiKey";
import ApiKeyGateway from "./Gateway/ApiKeyGateway";
import TokenGateway from "./Gateway/TokenGateway";
import DocumentGateway from "./Gateway/DocumentGateway";
import CookieConsentGateway from "./Gateway/CookieConsent";
import ShowCookieConsent from "./UseCase/ShowCookieConsent";
import BaselineGateway from "./Gateway/BaselineGateway";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserRoleGateway from "./Gateway/UserRoleGateway";

const locationGateway = new LocationGateway(window.location);
const tokenGateway = new TokenGateway();
const cookieConsentGateway = new CookieConsentGateway();
const showCookieConsent = new ShowCookieConsent(cookieConsentGateway);
const apiKeyCookieGateway = new CookieApiKey();
const apiKeyGateway = new ApiKeyGateway(apiKeyCookieGateway);
const userRoleGateway = new UserRoleGateway();
const projectGateway = new ProjectGateway(apiKeyCookieGateway, locationGateway);
const returnGateway = new ReturnGateway(apiKeyCookieGateway, locationGateway);
const claimGateway = new ClaimGateway(apiKeyCookieGateway, locationGateway);
const documentGateway = new DocumentGateway(document)
const userGateway = new UserGateway(apiKeyCookieGateway);
const baselineGateway = new BaselineGateway(apiKeyCookieGateway);
const getRole = new GetRole(userRoleGateway);

const logoutUsecase = new Logout(apiKeyCookieGateway);
const generateInfrastructureUISchemaUseCase = new GenerateInfrastructureUISchema();
const validateReturnUseCase = new Validate(returnGateway);
const validateProjectUseCase = new Validate(projectGateway);
const validateClaimUseCase = new Validate(claimGateway);
const createReturnUseCase = new CreateReturn(returnGateway);
const createClaimUseCase = new CreateClaim(claimGateway);
const createProjectUseCase = new CreateProject(projectGateway);
const submitProjectUseCase = new SubmitProject(projectGateway);
const submitClaimUseCase = new SubmitClaim(claimGateway);
const generateUISchema = new GenerateUISchema(userRoleGateway);
const generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema, userRoleGateway);
const generateHEReturnUISchema = new GenerateHEReturnUISchema(generateUISchema);
const getBaseReturnUseCase = new GetBaseReturn(returnGateway);
const getBaseClaimUseCase = new GetBaseClaim(claimGateway);
const getInfrastructuresUseCase = new GetInfrastructures(projectGateway);
const getProjectUseCase = new GetProject(projectGateway);
const getProjectURL = new GetProjectURL(locationGateway);
const getReturnUseCase = new GetReturn(returnGateway);
const getClaimUseCase = new GetClaim(claimGateway);
const getClaims = new GetClaims(claimGateway);
const getUserProjectsUseCase = new GetUserProjects(userGateway);
const canAccessProjectUseCase = new CanAccessProject(tokenGateway, apiKeyCookieGateway, userRoleGateway, apiKeyGateway);
const canAccessMonitorUseCase = new CanAccessMonitor(tokenGateway, apiKeyCookieGateway, userRoleGateway, apiKeyGateway);
const getReturnsUseCase = new GetReturns(returnGateway);
const requestTokenUseCase = new RequestToken(tokenGateway);
const submitReturnUseCase = new SubmitReturn(returnGateway);
const updateReturnUseCase = new UpdateReturn(returnGateway);
const updateSubmittedReturnUseCase = new UpdateSubmittedReturn(returnGateway);
const updateClaimUseCase = new UpdateClaim(claimGateway);
const updateProjectUseCase = new UpdateProject(projectGateway);
const addUsersToProject = new AddUsersToProject(projectGateway);
const amendBaseline = new AmendBaseline(baselineGateway);
const getBaselines = new GetBaselines(baselineGateway);
const submitBaseline = new SubmitBaseline(baselineGateway);
const getProjectOverview = new GetProjectOverview({ projectGateway })

const renderReturnPage = props => (
  <ReturnPage
    {...props}
    getReturn={getReturnUseCase}
    getBaseReturn={getBaseReturnUseCase}
    generateUISchema={generateUISchema}
    getRole={getRole}
    generateSubmittedSchema={generateDisabledUISchema}
    generateHEReturnUISchema={generateHEReturnUISchema}
    >
  {({data, schema, type, uiSchema, status}) => {
    return <div>
      <BackToProjectOverviewButton {...props} />
      <FormActions
        {...props}
        validate={validateReturnUseCase}
        create={createReturnUseCase}
        submit={submitReturnUseCase}
        update={updateReturnUseCase}
        updateSubmitted={updateSubmittedReturnUseCase}
        getInfrastructures={getInfrastructuresUseCase}
        documentGateway={documentGateway}
        data={data}
        schema={schema}
        type={type}
        uiSchema={uiSchema}
        getRole={getRole}
        status={status}
        formType="return"
        submissionRoleRequirement={["Superuser", "Homes England"]}
      />
    </div>
    }
  }
  </ReturnPage>
);

const renderClaimPage = props => (
  <ClaimPage
    {...props}
    getClaim={getClaimUseCase}
    generateSubmittedUiSchema={generateDisabledUISchema}
    generateUiSchema={generateUISchema}
    getBaseClaim={getBaseClaimUseCase}
    >
    {({formData, schema, type, uiSchema, status}) => {
    return <div>
      <BackToProjectOverviewButton {...props} />
      <FormActions
        {...props}
        validate={validateClaimUseCase}
        create={createClaimUseCase}
        submit={submitClaimUseCase}
        update={updateClaimUseCase}
        documentGateway={documentGateway}
        data={formData}
        schema={schema}
        type={type}
        uiSchema={uiSchema}
        getRole={getRole}
        status={status}
        formType="claim"
        submissionRoleRequirement={["Local Authority"]}
      />
    </div>
    }
  }
    </ClaimPage>

    )

const CreateReturnButton = props => (
  <button
    data-test="new-return-button"
    className="btn btn-primary"
    onClick={() =>
      props.history.push(`/project/${props.match.params.projectId}/return`)
    }
  >
    Create new return
  </button>
);

const CreateClaimButton = props => (
  <button
    data-test="new-claim-button"
    className="btn btn-primary"
    onClick={() =>
      props.history.push(`/project/${props.match.params.projectId}/claim`)
    }
  >
    Create new claim
  </button>
);

const ViewBaselineButton = props => (
  <button
    data-test="view-baseline-button"
    className="btn btn-secondary"
    onClick={() =>
      props.history.push(`/project/${props.match.params.projectId}/baseline`)
    }
  >
    View baseline
  </button>
);

const FillInBaselineButton = props => (
  <div>
    <p>Add the baseline information for your project here.</p>
    <button
      data-test="fill-in-baseline-button"
      className="btn btn-link"
      onClick={() =>
        props.history.push(`/project/${props.match.params.projectId}/baseline`)
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
          props.history.push(`/project/${props.match.params.projectId}/infrastructures`)
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
  <a
    className="btn btn-link btn-lg"
    onClick={() => props.history.push(`/project/${props.match.params.projectId}`)}
  >
    Back to project overview
  </a>
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

const renderAmendBaselinePage = props => (
  <EditBaselinePage
    {...props}
    getProject={getProjectUseCase}
    getBaselines={getBaselines}
    generateUISchema={generateUISchema}
    generateSubmittedUiSchema={generateDisabledUISchema}
  >
    {({baselineStatus, formData, formSchema, projectType, formUiSchema, timestamp}) => (
      <div>
      <BackToProjectOverviewButton {...props} />
      <div className="col-md-10 col-offset-1">
        <div className="row">
          <AmendProjectPage
            {...props}
            projectId={props.match.params.projectId}
            projectURL={getProjectURL}
            uiSchema={formUiSchema}
            status={baselineStatus}
            schema={formSchema}
            data={formData}
            projectType={projectType}
            getProject={getProjectUseCase}
            submitBaseline={submitBaseline}
            updateProject={updateProjectUseCase}
            validateProject={validateProjectUseCase}
            documentGateway={documentGateway}
            getRole={getRole}
            timestamp={timestamp}
          >
          {({status}) =>
            <AmendBaselineButton
              {...props}
              status={status}
              amendBaseline={amendBaseline}
            />
          }
          </AmendProjectPage>
        </div>
      </div>
    </div>
  )}
  </EditBaselinePage>
);

const renderNewProjectPageOverview = (props, projectType) => (
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


const renderSubmittedProjectPage = (props, formData, baselines, claims, returns) => (
  <div className="col-md-10 col-md-offset-1" data-test="submitted-project-page">
    <ProjectSummary data={formData} />
    <div className="row">
      <div className="col-md-2">
        <CreateReturnButton {...props} />
      </div>
      <div className="col-md-2">
        <CreateClaimButton {...props} />
      </div>

      <div className="col-md-2">
        <ViewBaselineButton {...props} />
      </div>
    </div>
    <div className="row">
      <div className="col-md-4">
        <List
          {...props}
          items={baselines}
          listType={"baseline"}
          prettyListType={"Baseline Version"}
        />
      </div>
      <div className="col-md-4">
        <List
          {...props}
          data-test="return-list"
          items={returns}
          listType={"return"}
          prettyListType={"Return"}
        />
      </div>
      <div className="col-md-4">
        <List
          {...props}
          items={claims}
          listType={"claim"}
          prettyListType={"Claim"}
        />
      </div>
    </div>
  </div>
);

const renderProjectPage = props => (
  <ProjectOverviewProvider getProjectOverview={getProjectOverview} projectId={props.match.params.projectId}>
    {
      ({ name, type, status, data, baselines, claims, returns }) => {
        if (status === "Draft") {
          return renderNewProjectPageOverview(props, type);
        }
        if (status === "Submitted") {
          return renderSubmittedProjectPage(props, data, baselines, claims, returns);
        }
      }
    }
  </ProjectOverviewProvider>
);

const renderBaseline = props => (
  <ProjectPage {...props} getProject={getProjectUseCase} generateUISchema={generateUISchema} generateSubmittedUiSchema={generateDisabledUISchema}>
    {({ projectStatus, formData, formSchema, disabledUiSchema, projectType, formUiSchema, timestamp  }) => {
      if (projectStatus === 'Submitted') {
        formUiSchema = disabledUiSchema
      }
      return <div>
          <BackToProjectOverviewButton {...props} />
        <div className="row">
          <div className="col-md-10">
            <h2>Baseline</h2>
          </div>
        </div>
        <AmendBaselineButton
          {...props}
          status={projectStatus}
          amendBaseline={amendBaseline}
        />
        <div className="row">
          <BaselinePage
            {...props}
            projectId={props.match.params.projectId}
            projectURL={getProjectURL}
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
  <div className="homepage">
    <div className="row">
      <div className="col-md-2"/>
      <div className="col-md-8">
        <h1>Homes England Monitor</h1>
        <p>
          Welcome to the Homes England monitoring system. Here are the projects you are a member of.
        </p>
      </div>
      <div className="col-md-2" />
    </div>
    <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
        <AdminPortal
          {...props}
          getRole={getRole}
          createProject={createProjectUseCase}
          addUsersToProject={addUsersToProject}
        >
          {
            (lastProjectUserAddedTo) =>
              <ProjectListProvider
                {...props}
                getUserProjects={getUserProjectsUseCase}
                lastProjectUserAddedTo={lastProjectUserAddedTo}
              >
                {({projectList}) => (
                  <ProjectList projectList={projectList} {...props} />
                )}
              </ProjectListProvider>
          }
        </AdminPortal>
      </div>
      <div className="col-md-2" />
    </div>
  </div>
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
                logoutUsecase={logoutUsecase}
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
                    path="/project/:projectId"
                    render={props => (
                      <ProjectPortal
                      {...props}
                      url={props.match.url}
                      projectId={props.match.params.projectId}
                      canAccessProject={canAccessProjectUseCase}

                      >
                        <Route exact path="/project/:projectId" render={renderProjectPage} />
                        <Route
                          exact
                          path="/project/:projectId/infrastructures"
                          render={renderInfrastructuresPage}
                        />
                        <Route
                          exact
                          path="/project/:projectId/baseline"
                          render={renderBaseline}
                        />
                        <Route
                          exact
                          path="/project/:projectId/baseline/:baselineId"
                          render={renderAmendBaselinePage}
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
                        <Route
                          exact
                          path="/project/:projectId/claim"
                          render={renderClaimPage}
                        />
                        <Route
                          exact
                          path="/project/:projectId/claim/:claimId"
                          render={renderClaimPage}
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
