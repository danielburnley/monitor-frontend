import React from 'react';
import { mount } from "enzyme";
import FileUpload from '.';
import FieldFake from '../../../test/FieldFake'

function fileUploadField(formData, multiple, onChangeSpy, readonly, title = "File Uploader", uiSchema) {
  let fileSchema = "single"
  if (multiple) fileSchema = "multiple"
  return mount(
    <FileUpload
      onChange = { onChangeSpy }
      registry = { {fields: {SchemaField: FieldFake, extraField: FieldFake}}}
      schema = {{type: "array", uploadFile: fileSchema, readonly, title: title}}
      formData = { formData }
      uiSchema = { uiSchema }
    />
  )
};

let file1 = "data:image/gif;name=file one;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs="
let file2 = "data:image/gif;name=file two;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
let file3 = "data:application/pdf;name=file three;base64,R0lGODdh"
let file4 = "data:text/plain;name=file four;base64,the data2321234//we5678"

describe("FileUpload", () => {
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jest.fn()
  });

  describe("With no uiSchema", () => {
    describe("Uploading files", () => {
      global.URL.createObjectURL = jest.fn();
      describe("Using the file widget", () => {
        let fileUpload

        beforeEach(() => {
          fileUpload = fileUploadField([], false, onChangeSpy)
        });

        it("Renders the schemafield", () => {
          expect(fileUpload.find("FieldFake").length).toEqual(1)
        });

        it("Passes a schema of type string to the schema field", () => {
          expect(fileUpload.find("FieldFake").props().schema).toEqual({type: "string", title: "File Uploader"})
        });

        it("Passes a file widget ui schema to the schema field", () => {
          expect(fileUpload.find("FieldFake").props().uiSchema).toEqual({"ui:widget": "file"})
        });

        it("Passes the registry to the schema field", () => {
          expect(fileUpload.find("FieldFake").props().registry).toEqual({fields: {SchemaField: FieldFake, extraField: FieldFake}})
        });
      });

      describe("Storing a single file", () => {
        describe("Example 1", () => {
          it("Calls the onChange method", () => {
            let fileUpload = fileUploadField([], false, onChangeSpy)
            fileUpload.find('#root_file-upload').simulate('change', {target: {value: file1}})
            expect(onChangeSpy).toHaveBeenCalledWith([file1])
          });
        });

        describe("Example 2", () => {
          it("Calls the onChange method", () => {
            let fileUpload = fileUploadField([file1], false, onChangeSpy)

            fileUpload.find('#root_file-upload').simulate('change', {target: {value: file2}})
            expect(onChangeSpy).toHaveBeenCalledWith([file2])
          });
        });
      });

      describe("Storing multiple files", () => {
        describe("Example 1", () => {
          it("Adds the file name onto the list", () => {
            let fileUpload = fileUploadField([file1], true, onChangeSpy)

            fileUpload.find('#root_file-upload').simulate('change', {target: {value: file2}})
            expect(onChangeSpy).toHaveBeenCalledWith([file1, file2])
          });
        });

        describe("Example 2", () => {
          it("Adds the file name onto the list", () => {
            let fileUpload = fileUploadField([file2], true, onChangeSpy)

            fileUpload.find('#root_file-upload').simulate('change', {target: {value:  file1}})
            expect(onChangeSpy).toHaveBeenCalledWith([file2, file1])
          });
        });
      });
    });

    describe("Viewing files", () => {
      describe("If readonly", () => {
        describe("Viewing no files", () => {
          it("Doesn't render the file widget", () => {
            let fileUpload = fileUploadField([], true, onChangeSpy, true)
            expect(fileUpload.find("FieldFake").length).toEqual(0)
          });

          it("Doesn't render the remove button", () => {
            let fileUpload = fileUploadField([file1], true, onChangeSpy, true)
            expect(fileUpload.find("[data-test='remove-file_0']").length).toEqual(0)
          });

          describe("Example 1", () => {
            it("Displays the schema title", () => {
              let fileUpload = fileUploadField([], true, onChangeSpy, true)
              expect(fileUpload.find("[data-test='title']").text()).toEqual("File Uploader")
            });
          });

          describe("Example 2", () => {
            it("Displays the schema title", () => {
              let fileUpload = fileUploadField([], true, onChangeSpy, true, "A different file uploader")
              expect(fileUpload.find("[data-test='title']").text()).toEqual("A different file uploader")
            });
          });
        });
      });
      describe("If disabled", () => {
        describe("Viewing no files", () => {
          it("Doesn't render the file widget", () => {
            let fileUpload = fileUploadField([], true, onChangeSpy, false, "File Uploader", {"ui:disabled": true})
            expect(fileUpload.find("FieldFake").length).toEqual(0)
          });

          it("Doesn't render the remove button", () => {
            let fileUpload = fileUploadField([file2], true, onChangeSpy, true)
            expect(fileUpload.find("[data-test='remove-file_0']").length).toEqual(0)
          });

          describe("Example 1", () => {
            it("Displays the schema title", () => {
              let fileUpload = fileUploadField([], true, onChangeSpy, false, "A different file uploader", {"ui:disabled": true})
              expect(fileUpload.find("[data-test='title']").text()).toEqual("A different file uploader")
            });
          });

          describe("Example 2", () => {
            it("Displays the schema title", () => {
              let fileUpload = fileUploadField([], true, onChangeSpy, false, "A different file uploader", {"ui:disabled": true})
              expect(fileUpload.find("[data-test='title']").text()).toEqual("A different file uploader")
            });
          });
        });
      });
      describe("Viewing a single file", () => {
        describe("Example 1", () => {
          global.URL.createObjectURL = jest.fn(() => "mynewurl");
          let fileUpload = fileUploadField([file1], true, onChangeSpy, true)

          it("Display the file names", () => {
            expect(fileUpload.find("[data-test='file_0']").text()).toEqual("file one")
          });
        });

        describe("Example 2", () => {
          global.URL.createObjectURL = jest.fn(() => "anotherurl");
          let fileUpload = fileUploadField([file2], true, onChangeSpy, true)

          it("Display the file names", () => {
            expect(fileUpload.find("[data-test='file_0']").text()).toEqual("file two")
          });
        });
      });

      describe("Viewing multiple files", () => {
        describe("Example 1", () => {
          let fileUpload

          beforeEach(()=> {
            fileUpload = fileUploadField([file1, file2], true, onChangeSpy, false)
          });

          it("Displays links to all the files", () => {
            expect(fileUpload.find("[data-test='file_0']").length).toEqual(1)
            expect(fileUpload.find("[data-test='file_1']").length).toEqual(1)
          });

          it("Renders a button to remove the saved file", () => {
            expect(fileUpload.find("[data-test='remove-file_0']").length).toEqual(1)
            expect(fileUpload.find("[data-test='remove-file_1']").length).toEqual(1)
          });

          it("When clicking the remove button it calls the onchange method with the file removed", () => {
            fileUpload.find("[data-test='remove-file_0']").simulate('click')
            expect(onChangeSpy).toHaveBeenCalledWith([file2])
          });

          it("Displays the file names for all the files", () => {
            expect(fileUpload.find("[data-test='file_0']").text()).toEqual("file one")
            expect(fileUpload.find("[data-test='file_1']").text()).toEqual("file two")
          });
        });

        describe("Example 2", () => {
          let fileUpload;

          beforeEach(()=> {
            fileUpload = fileUploadField([file3, file4], true, onChangeSpy, false)
          });

          it("Displays links to all the files", () => {

            expect(fileUpload.find("[data-test='file_0']").length).toEqual(1)
            expect(fileUpload.find("[data-test='file_1']").length).toEqual(1)
          });

          it("Renders a button to remove the saved file", () => {
            expect(fileUpload.find("[data-test='remove-file_0']").length).toEqual(1)
            expect(fileUpload.find("[data-test='remove-file_1']").length).toEqual(1)
          });

          it("When clicking the remove button it calls the onchange method with the file removed", () => {
            fileUpload.find("[data-test='remove-file_1']").simulate('click')
            expect(onChangeSpy).toHaveBeenCalledWith([file3])
          });

          it("Displays the file names for all the files", () => {
            expect(fileUpload.find("[data-test='file_0']").text()).toEqual("file three")
            expect(fileUpload.find("[data-test='file_1']").text()).toEqual("file four")
          });
        });
      });
    });
  });

  describe("With addable marked false", () => {
    it("Doesn't render the file widget", () => {
      let fileUpload = fileUploadField([], true, onChangeSpy, false,
        "File Uploader",
        {
          "ui:options": {addable: false}
        }
      )
      expect(fileUpload.find("FieldFake").length).toEqual(0)
    });
  });

  describe("With removable marked false", () => {
    it("Doesn't render the remove button", () => {
      let fileUpload = fileUploadField([file1], true, onChangeSpy, false,
        "File Uploader",
        {
          "ui:options": {removable: false}
        }
      )
      expect(fileUpload.find("[data-test='remove-file_0']").length).toEqual(0)
    });
  });
});

describe("Downloading (via js-file-download)", () => {
  it("IE", () => {
    window.navigator.msSaveBlob = jest.fn();
    let fileUpload = fileUploadField([file1], true, () => {}, true);
    fileUpload.find("[data-test='file_0']").simulate("click");
    expect(window.navigator.msSaveBlob).toHaveBeenCalledWith(expect.anything(), 'file one');
    window.navigator.msSaveBlob = undefined;
  });

  it("Standard", () => {
    window.URL.createObjectURL = jest.fn();
    window.URL.revokeObjectURL = jest.fn();
    let fileUpload = fileUploadField([file1], true, () => {}, true);
    fileUpload.find("[data-test='file_0']").simulate("click");
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
