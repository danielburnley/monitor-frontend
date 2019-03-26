import React from "react";
import {mount} from "enzyme";
import DownloadPseudoWidget from ".";

describe("<DownloadPseudoWidget>", () => {
  describe("It provides a link dependent the value in the schema", () => {
    it("Example 1", () => {
      let wrap = mount(<DownloadPseudoWidget schema={
          {
            type: "null",
            label: "Click to download the file",
            downloadURI: "/relativefile.gmk",
          }
        }
      />);

      let renderedURI = wrap.find("a[data-test='file-link'][download]").props().href;
      expect(renderedURI).toEqual("/relativefile.gmk");
      expect(wrap.text()).toEqual("Click to download the file");
    });

    it("Example 2", () => {
      let wrap = mount(<DownloadPseudoWidget schema={
          {
            type: "null",
            label: "Download here",
            downloadURI: "https://filestorage.space/whitepaper.pdf",
          }
        }
      />);

      let renderedURI = wrap.find("a[data-test='file-link'][download]").props().href;
      expect(renderedURI).toEqual("https://filestorage.space/whitepaper.pdf");
      expect(wrap.text()).toEqual("Download here");
    });
  });
});
