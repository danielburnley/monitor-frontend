import React from "react";
import Form from "react-jsonschema-form";
import Sidebar from '../Sidebar'
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";

class SpikeSubform extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      selectedSection: 'details',
      formData: [{
        details: {infraType: 'a', description: 'b'},
        otherStuff: {cars: 'c', cats: 'd'}
      }, {details: {infraType: 'e', description: 'f'}, otherStuff: {cars: 'g', cats: 'h'}}]
    }
  }

  renderSidebar() {
    let items = new GenerateSidebarItems().execute(
      this.props.schema,
      this.state.formData
    ).items;
    return <Sidebar items={items} onItemClick={this.handleSidebarClick}/>;
  }

  handleSidebarClick = (subSection, index) => {
    this.setState({selectedIndex: index, selectedSection: subSection})
  }

  handleChange = ({formData}) => {
    let clone = [...this.state.formData]
    clone[this.state.selectedIndex][this.state.selectedSection] = formData
    this.setState({formData: clone}, () => {
      this.props.handleChange(clone)
    })
  }

  render() {
    return (
      <div data-test="subform">
        <div>{this.state.selectedSection}</div>
        <div>{this.renderSidebar()}</div>
        <Form
          schema={this.props.schema.items.properties[this.state.selectedSection]}
          formData={this.state.formData[this.state.selectedIndex][this.state.selectedSection]}
          onChange={this.handleChange}
        >
          <div/>
        </Form>
        <button className='btn btn-primary' onClick={() => console.log(this.state.formData)}>Submit that sucker</button>
      </div>
    );
  }
}

export default class SubForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formData: props.data,
      selectedSection: Object.keys(props.schema.items.properties)[0],
      selectedIndex: 0
    }
  }

  renderSidebar() {
    let items = new GenerateSidebarItems().execute(
      this.props.schema,
      this.props.data
    ).items;
    return <Sidebar items={items} onItemClick={(section, index) => {
      this.setState({selectedSection: section, selectedIndex: index})
    }}/>;
  }

  onFormChange = (formData) => {
    let updatedData = [...this.state.formData]
    updatedData[this.state.selectedIndex][this.state.selectedSection] = formData
    this.setState({formData: updatedData})  
  } 

  render() {
    return (
      <div>
        {this.renderSidebar()}
        <Form data-test={`${this.state.selectedSection}-form`}
              schema={this.props.schema.items.properties[this.state.selectedSection]}
              formData={this.state.formData[this.state.selectedIndex][this.state.selectedSection]}
              onChange={({formData})=>{
                this.onFormChange(formData)
              }}
        />
      </div>
    )
  }
}
