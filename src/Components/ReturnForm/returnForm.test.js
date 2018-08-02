import React from 'react'
import ReturnForm from '.'
import {mount} from 'enzyme'

describe('<ReturnForm>', () => {
  it('Calls the onsubmit function when submitted', () => {
    let submitSpy = jest.fn()
    let wrapper = mount(<ReturnForm data={{}} schema={{}} onSubmit={submitSpy} />)
    wrapper.find('button').simulate('submit')
    expect(submitSpy).toHaveBeenCalled()
  })
})
