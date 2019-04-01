import React from 'react';
import ie from 'ie-version';

function dataURItoBlob(dataURI) {
  let byteString, fileType

  if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
      byteString = atob(dataURI.split(',')[1])
  } else {
      byteString = decodeURI(dataURI.split(',')[1])
  }

  fileType = dataURI.split(',')[0].split(':')[1].split(';')[0]

  let content = [];
  for (var i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i)
  }

  return new Blob([new Uint8Array(content)], {type: fileType});
}

function unlinkNameFromDataURL(dataURL) {
  let index1 = dataURL.indexOf(';')
  let index2 = dataURL.indexOf(';', index1 + 1)

  return {
    dataURL: dataURL.substring(0, index1) + dataURL.substring(index2 + 1),
    name: dataURL.substring(index1 + 6, index2)
  }
}

export default class UploadFileField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: this.props.formData || []
    }
  }

  onChange = (file) => {
    let newFiles = this.state.files
    if (this.props.schema.uploadFile === "multiple") {
      newFiles.push(file);
    } else {
      newFiles = [file]
    }

    this.setState({ files: newFiles }, () => {
      this.props.onChange(this.state.files)
    })
  }

  renderNewFileUpload = () => {
    if (this.props.schema.readonly ||
      (
        this.props.uiSchema &&
        (
          this.props.uiSchema["ui:disabled"] ||
          (
            this.props.uiSchema["ui:options"] &&
            !this.props.uiSchema["ui:options"].addable
          )
        )
      )
    )
    {
      return <p data-test="title">
        <b>{this.props.schema.title}</b>
      </p>;
    }

    return <this.props.registry.fields.SchemaField
      onChange={e => this.onChange(e)}
      schema = { {type: "string", title: this.props.schema.title} }
      uiSchema = {{"ui:widget": "file"}}
      registry = { this.props.registry }
      data-test = {"file-upload"}
    />
  }

  renderSavedFiles = () => {
    if(this.state.files.length === 0 ) return null;
    return (<div>

      <em>{
          (ie.version)?
          "Right click and save as to download the files below."
           : "Click on the link(s) below to download the file(s)."
         } Once downloaded please save with an appropriate file name and extension.</em>
      {this.renderFileLinks()}
    </div>)
  }

  renderFileLinks = () => {
    return this.state.files.map((file, index) => {
      return <div key={`${index}`}>
        {this.renderFileDownloadLink(file, index)}
        {this.renderRemoveButton(index)}
      </div>
    })
  }

  renderFileDownloadLink = (file, index) => {
    let fileInfo = unlinkNameFromDataURL(file)
    let link = URL.createObjectURL(dataURItoBlob(fileInfo.dataURL));
    return <div>
    <a data-test={`file_${index}`} href={link} target="_blank">{fileInfo.name}</a>
    </div>
  }

  removeFile(index) {
    let newFiles = this.state.files
    newFiles.splice(index, 1)

    this.setState({ files: newFiles }, () => {
      this.props.onChange(this.state.files)
    })
  }

  renderRemoveButton = (index) => {
    if (
      this.props.schema.readonly || (
        this.props.uiSchema &&
        this.props.uiSchema["ui:options"] &&
        !this.props.uiSchema["ui:options"].removable
      )
    ) return null;
    return <button
      className="btn btn-sm btn-link"
      data-test={`remove-file_${index}`}
      value={index}
      onClick={e => this.removeFile(e.target.value)}
      >
      Remove this file
    </button>
  }

  render = () => {
      return <div>
        {this.renderNewFileUpload()}
        {this.renderSavedFiles()}
      </div>
  };
}
