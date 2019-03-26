import "core-js";
import React from "react";
import qs from "qs";

import StaticData from "./Components/StaticData";
import Homepage from "./Components/Homepage";
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
import UnsubmitProject from "./UseCase/UnsubmitProject";
import RequestToken from "./UseCase/RequestToken";
import Validate from "./UseCase/Validate";
import AmendBaseline from "./UseCase/AmendBaseline";
import GetBaselines from "./UseCase/GetBaselines";
import SubmitBaseline from "./UseCase/SubmitBaseline";

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
const generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
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
const unsubmitProject = new UnsubmitProject(projectGateway)
const updateReturnUseCase = new UpdateReturn(returnGateway);
const updateClaimUseCase = new UpdateClaim(claimGateway);
const updateProjectUseCase = new UpdateProject(projectGateway);
const addUsersToProject = new AddUsersToProject(projectGateway);
const amendBaseline = new AmendBaseline(baselineGateway);
const getBaselines = new GetBaselines(baselineGateway);
const submitBaseline = new SubmitBaseline(baselineGateway);

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

const renderClaimPage = props => (
  <ClaimPage
    {...props}
    getClaim={getClaimUseCase}
    generateSubmittedUiSchema={generateDisabledUISchema}
    generateUiSchema={generateUISchema}
    getBaseClaim={getBaseClaimUseCase}
    >
    {({formData, schema, type, uiSchema, status}) => {
    return <FormActions
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
    />
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
    <div className="col-md-10">
      <div className="row">
        <BackToProjectOverviewButton {...props} />
      </div>
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
        />
      </div>
    </div>
  )}
  </EditBaselinePage>
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
    <ProjectSummary data={formData} schema={formSchema}  unsubmitProject={unsubmitProject} projectId={props.match.params.projectId}/>
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
        <BaselineListProvider 
            {...props}
            getBaselines={getBaselines}
          >
            {({baselines}) => (
              <List
                {...props}
                items={baselines}
                listType={"baseline"}
                prettyListType={"Baseline Version"}
              />
            )}
        </BaselineListProvider>
      </div>
      <div className="col-md-4">
        <ReturnListProvider projectId={props.match.params.projectId} getReturns={getReturnsUseCase}>
          {({ returns }) => (
            <List
              {...props}
              data-test="return-list"
              items={returns}
              listType={"return"}
              prettyListType={"Return"}
            />
          )}
        </ReturnListProvider>
      </div>
      <div className="col-md-4">
        <ClaimListProvider 
            {...props}
            getClaims={getClaims}
          >
            {({claims}) => (
              <List
                {...props}
                items={claims}
                listType={"claim"}
                prettyListType={"Claim"}
              />
            )}
        </ClaimListProvider>
      </div>
    </div>
  </div>
);

const renderProjectPage = props => (
    <ProjectPage {...props} getProject={getProjectUseCase} generateUISchema={generateUISchema} generateSubmittedUiSchema={generateDisabledUISchema}>
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

const renderBaseline = props => (
  <ProjectPage {...props} getProject={getProjectUseCase} generateUISchema={generateUISchema} generateSubmittedUiSchema={generateDisabledUISchema}>
    {({ projectStatus, formData, formSchema, disabledUiSchema, projectType, formUiSchema, timestamp  }) => {
      if (projectStatus === 'Submitted') {
        formUiSchema = disabledUiSchema
      }
      return <div className="col-md-10">
        <div className="row">
          <BackToProjectOverviewButton {...props} />
        </div>
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
