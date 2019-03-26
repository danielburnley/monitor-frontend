import React from "react";
export default class DownloadPseudoWidget extends React.Component {
  render = () =>
    <a data-test="file-link" href={this.props.schema.downloadURI} download>{this.props.schema.label}</a>
}
