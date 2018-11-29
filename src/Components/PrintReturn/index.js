import React from 'react';

export default class PrintReturn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      formData: null
    }

  }

  presentReturnNotFound = async () => {};

  fetchData =  () => {
   this.props.getReturn.execute(this, {
      id: this.props.match.params.returnId,
      projectId: this.props.match.params.projectId
    });
  };

  componentDidMount() {
    document.title = "Return - Homes England Monitor";
    this.fetchData();
  }

  componentDidUpdate() {
    window.print()
   }

  presentReturn = async returnData => {
    await this.setState({
      loading: false,
      data: returnData.data,
      schema: returnData.schema
    });
  }

  renderChildren = () => {
    return(
      <div>{this.props.children({
        data: this.state.data,
        schema: this.state.schema
      })}
      </div>
    )
  }

  
  render = () => {
    if (this.state.loading) {
      return <div />;
    } else {
      return (
        <div >
        {this.renderChildren()}
        </div>
      )
    }
  }
}