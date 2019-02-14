import APISimulator from "../test/ApiSimulator";
import AppPage from "../test/AppPage";
import nock from "nock";
import Cookies from "js-cookie";

let projectSchema = {
  title: "Cat Return",
  type: "object",
  properties: {
    summary: {
      type: "object",
      title: "Cats",
      properties: {
        projectName: {type: 'string', title: "Name"},
        noise: { type: "string", currency: true, title: "Noise" },
        projectDescription: { type: "string", title: "Description" },
        toes: { type: "string", title: "Toes" }
      }
    }
  }
};

let projectData = {
  summary: {
    noise: "13",
    projectName: "My NAme",
    projectDescription: "Fluffy balls of friendship",
    toes: "Beans"
  }
};

let draftProjectData = {
  summary: {
    noise: "16",
    projectDescription: "Fluffy balls of friendship",
    toes: "Beans"
  }
};

let projectStatus = 'Submitted';

let submittedProjectData = {
  summary: {
    noise: "16",
    projectName: "cat",
    projectDescription: "cat",
    toes: "cat"
  }
}

let returnSchema = {
  title: "Cat Return",
  type: "object",
  properties: {
    summary: {
      type: "object",
      title: "Cats",
      properties: {
        noise: { type: "string", title: "Noise" },
        projectDescription: { type: "string", title: "Description" },
        toes: { type: "string", title: "Toes" },
        playtime: { type: "string", title: "Total playtime" }
      }
    }
  }
};

let returnData = {
  summary: {
    noise: "16",
    projectDescription: "Fluffy balls of friendship",
    toes: "Beans"
  }
};

let projectType = 'hif';

describe("Authentication against routes", () => {
  let api;

  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
    api.expendEmptyTokenForProject().unauthorised();
    api.getUserProjects().successfully();
    api.getProject({}, 0).unsuccessfully();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("Asks for authentication against the project page", async () => {
    let page = new AppPage("/project/0");
    await page.load();

    expect(page.find("GetToken").length).toEqual(1);
  });

  it("Asks for authentication against the home page", async () => {
    let page = new AppPage("/");
    await page.load();

    expect(page.find("GetToken").length).toEqual(1);
  });

  it("Asks for authentication against the base return page", async () => {
    let page = new AppPage("/project/0/return");
    await page.load();

    expect(page.find("GetToken").length).toEqual(1);
  });

  it("Asks for authentication against the view return page", async () => {
    let page = new AppPage("/project/0/return/1");
    await page.load();

    expect(page.find("GetToken").length).toEqual(1);
  });

  it("Asks for authentication against any other page", async () => {
    let page = new AppPage("/not-a-page");
    await page.load();

    expect(page.find("GetToken").length).toEqual(1);
  });
});

describe("Viewing the Homepage", () => {
  let api;
  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
    api.expendToken("Cats", "Homes England").successfully();
    api.expendToken("Cats", "Homes England").successfully();
    api.expendEmptyTokenForProject().successfully();
    api.expendEmptyTokenForProject().successfully();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("will not show get token", async () => {
    api.getUserProjects().successfully();


    let page = new AppPage("/?token=Cats");

    await page.load();


    expect(page.find("GetToken").length).toEqual(0);
    expect(page.find("Homepage").length).toEqual(1);
  });

  it("will show the Project list from the api.", async () => {
    api.getUserProjects().successfully();

    let page = new AppPage("/?token=Cats");
    await page.load();
    await page.load();



    expect(page.find("GetToken").length).toEqual(0);
    expect(page.find("ProjectList").length).toEqual(1);
  });
});
  
describe("Viewing a project", () => {
  let api;

  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
    api.getProject({}, 0).unsuccessfully();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("Given invalid token project page is not shown", async () => {
    api.getProject({}, 0).unsuccessfully();
    api.expendEmptyTokenForProject().unauthorised();
    api.expendToken("Hello").unauthorised();

    let page = new AppPage("/project/0?token=Hello");
    await page.load();

    expect(page.find("ProjectPage").length).toEqual(0);
  });

   describe("Given valid token", () => {
    beforeEach(() => {
      api.expendToken("Cats").successfully();
      api.expendEmptyTokenForProject().successfully();
    });
    
    afterEach(() => {
      nock.cleanAll();
    });

    it("will not show GetToken", async () => {
      api.getProject(projectSchema, projectData).successfully();
      api.getReturns({returns: []}).successfully();

      let page = new AppPage("/project/0/?token=Cats");
      await page.load();
      await page.load();


      expect(page.find("GetToken").length).toEqual(0);
      expect(page.find("ProjectPage").length).toEqual(1);
    });

    describe("Project Status is submitted", () => {
      it("Renders the project summary with information from the API", async () => {
        api.getProject(projectSchema, projectData, projectStatus, projectType).successfully();
        api.getReturns({returns: []}).successfully();

        let page = new AppPage("/project/0?token=Cats");
        await page.load();

        let summary = page.summary();

        expect(summary.find('[data-test="project_name"]').text()).toEqual(
          "My NAme"
        );

        expect(
          summary.find('div[data-test="project_description"]').text()
        ).toEqual("Fluffy balls of friendship");

        expect(summary.find('div[data-test="summary_toes"]').length).toEqual(0)
      });


      it("Renders the return list within the project sumary page with information from the API", async () => {
        let data = {
          returns: [
            {
              id: 1,
              project_id: 1,
              status: "Draft",
              updates: [
                {
                  changed: "Yes"
                }
              ]
            },
            {
              id: 2,
              project_id: 1,
              status: "Submitted",
              updates: [
                {
                  changed: "something"
                }
              ]
            },
            {
              id: 3,
              project_id: 1,
              status: "Platypus",
              updates: [
                {
                  changed: "Duck!?"
                }
              ]
            },
            {
              id: 4,
              project_id: 1,
              status: "Duck",
              updates: [
                {
                  changed: "Quack"
                }
              ]
            }
          ]
        };
        api.getProject(projectSchema, projectData, projectStatus, projectType).successfully();
        api.getReturns(data).successfully();

        let page = new AppPage("/project/0?token=Cats");
        await page.load();

        let returnList = page.find("ReturnList")

        expect(returnList.length).toEqual(1);

        expect(returnList.find("[data-test='return-1']").text()).toEqual("Return 1");
      });


      it("Renders the project baseline page", async () => {
        api.getProject(projectSchema, projectData, projectStatus, projectType).successfully();
        api.getReturns({returns: []}).successfully();

        let page = new AppPage("/project/0?token=Cats");
        await page.load();

        api.getProject(projectSchema, projectData, projectStatus, projectType).successfully();
        await page.viewBaseline();

        expect(page.find('StaticData').length).toEqual(1)
      });

      it("Renders the return with information from the API when creating a new return", async () => {
        api.getProject(projectSchema, projectData, projectStatus, projectType).successfully();
        api.getBaseReturn(returnSchema, returnData).successfully();
        api.getReturns({returns: []}).successfully();

        let page = new AppPage("/project/0?token=Cats");
        await page.load();
        await page.createNewReturn();

        let expectedInputValues = [
          "16",
          "Fluffy balls of friendship",
          "Beans",
          ""
        ];

        expect(page.getFormInputs()).toEqual(expectedInputValues);
      });

      it("Renders the return with information from the API", async () => {
        api.getReturn(returnSchema, returnData).successfully();
        let page = new AppPage("/project/0/return/1?token=Cats");
        await page.load();

        let expectedInputValues = [
          "16",
          "Fluffy balls of friendship",
          "Beans",
          ""
        ];
        expect(page.getFormInputs()).toEqual(expectedInputValues);
      });
    });
  });
});

describe('Submitting a draft project', () => {
  let api;
  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
    api.expendToken("Hello", "Homes England").successfully();
    api.getProject(projectSchema, draftProjectData, "Draft", projectType, "5").successfully();
    api.getProject(projectSchema, draftProjectData, "Draft", projectType, "8").successfully();
    api.updateProject(submittedProjectData, 0, {errors: []}, "8").successfully();
    api.submitProject(0).successfully();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('Allows you to edit, save and submit a draft project', async () => {
    let page = new AppPage("/project/0?token=Hello");
    let response = {
      valid: true,
      invalidPaths: [],
      prettyInvalidPaths: []
    };
    await page.load();

    page.find("input").map((textfield) => {
      textfield.simulate('change', { target: { value: 'cat'}})
    });

    page.find("[data-test='currency-input']").map((currencyfield) => {
      currencyfield.simulate('change', { target: { value: '16' }})
    });

    api.validateProject(0, projectType, submittedProjectData, response).successfully();

    await page.load();

    page.find('[data-test="update-project-button"]').simulate("click");
    await page.load();
    expect(page.find('[data-test="project-update-success"]').length).toEqual(1);

    api.validateProject(0, projectType, submittedProjectData, response).successfully();

    page.find('[data-test="submit-project-button"]').simulate("click");
    await page.load();
    expect(page.find('[data-test="project-create-success"]').length).toEqual(1);
  });

  it('Presents you with validation when you attempt to save and submit an invalid draft project', async () => {
    let page = new AppPage("/project/0?token=Hello");
    let response = {
      valid: false,
      invalidPaths: [['cats'], ['meow']],
      prettyInvalidPaths: [['Cats'], ['Meow']]
    }
    await page.load();

    page.find("input").map((textfield) => {
      textfield.simulate('change', { target: { value: 'cat'}})
    });

    page.find("[data-test='currency-input']").map((currencyfield) => {
      currencyfield.simulate('change', { target: { value: '16' }})
    });

    api.validateProject(0, projectType, submittedProjectData, response).successfully();

    await page.load();

    page.find('[data-test="update-project-button"]').simulate("click");
    await page.load();
    expect(page.find('[data-test="validationWarning"]').length).toEqual(1);

    api.validateProject(0, projectType, submittedProjectData, response).successfully();


    page.find('[data-test="submit-project-button"]').simulate("click");
    await page.load();
    expect(page.find('[data-test="project-create-success"]').length).toEqual(1);
  });

  it('Present you with an error when you attempt to save over data which has been previously saved', async () => {
    Cookies.remove('userrole');    
    let page = new AppPage("/project/0");
    let response = {
      valid: true,
      invalidPaths: [],
      prettyInvalidPaths: []
    };

    api.validateProject(0, projectType, returnData, response).successfully();
    
    api.updateProject(returnData, 0, {successful: false, errors: ["incomplete_timestamp"]}, "8").successfully();

    await page.load();


    page.find('[data-test="update-project-button"]').simulate("click");

    await page.load();

    expect(page.find('[data-test="overwriting-error"]').length).toEqual(1);
  });
});

describe("Printing a return", () => {
  let api;
  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
    api = new APISimulator("http://dog.woof");
  });

  afterEach(()=> {
    nock.cleanAll();
  })

  it("Renders the return data", async () => {
    let data = {
      cat: "meow",
      dog: "woof"
    }
    let schema = {
      type: "object",
      properties: {
        cat: {type: "string"},
        dog: {type: "string"}
      }
    }
    api.getProject(schema, data, "Submitted", "hif").successfully();
    api.getReturn(data, schema).successfully();
    
    let page = new AppPage("/project/0/return/1/print?token=Cats");
    await page.load();


    expect(page.find('PrintReturn').length).toEqual(1)
    expect(page.find('StaticData').length).toEqual(1)
  });
});

describe("Page not found", () => {
  let api
  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
    api.expendToken("Cats").successfully();
    api.expendToken("Cats").successfully();
  });

  it("Renders a 404 page", async () => {
    let page = new AppPage("/non-existent");
    await page.load();

    expect(page.find('div[id="not-found"]').text()).toMatch(/404 page not found/);
  });
});

describe("Cookie consent", () => {
  let api
  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
    api.expendEmptyTokenForProject().successfully();
    api.expendEmptyTokenForProject().successfully();
    api.getUserProjects().successfully();
    api.getUserProjects().successfully();
  });

  it("Renders a cookie notice once", async () => {
    Cookies.remove('consent');
    let page = new AppPage("/");
    await page.load();

    expect(page.find("div[data-test='cookie-notice']").length).toEqual(1);

    page = new AppPage("/");
    await page.load();
    expect(page.find("div[data-test='cookie-notice']").length).toEqual(0);
  });
});