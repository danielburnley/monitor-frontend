import React from 'react';
import QuarterlyBreakdown from '.';

import { storiesOf } from '@storybook/react';


storiesOf('QuarterlyBreakdown', module)
.add('ReadOnly Data', () => {
  let data = [
    {
      period: "2015",
      quarter1: "Bernard",
      quarter2: "Barks",
      quarter3: "Woof",
      quarter4: "Spot",
      total: "2 new dogs"
    },
    {
      period: "2016",
      quarter1: "Wag",
      quarter2: "floppy",
      quarter3: "Wolf",
      quarter4: "Scout",
      total: "3 new dogs"
    },
    {
      period: "2017",
      quarter1: "Bear",
      quarter2: "cuddletons",
      quarter3: "Melissa",
      quarter4: "Ben",
      total: "4 new dogs"
    }
  ]

  let schema = {
      type: "array",
      title: "Installments",
      items: {
        type: 'object',
        properties: {
          period: {
            title: 'Period',
            type: 'string',
            readonly: true
          },
          quarter1: {
            title: '1st Quarter',
            type: 'string',
            readonly: true
          },
          quarter2: {
            title: '2nd Quarter',
            type: 'string',
            readonly: true
          },
          quarter3: {
            title: '3rd Quarter',
            type: 'string',
            readonly: true
          },
          quarter4: {
            title: '4th Quarter',
            type: 'string',
            readonly: true
          },
          total: {
            title: 'Total',
            type: 'string',
            readonly: true
          }
        }
    }
  }

  return (<QuarterlyBreakdown schema={schema} formData={data} onChange={data => console.log(data)} />)
})
.add('Input Fields- Empty', () => {
  let data = [
    {
      period: "2015"
    },
    {
      period: "2016"
    },
    {
      period: "2017"
    }
  ]

  let schema = {
      type: "array",
      addable: true,
      title: "Installments",
      items: {
        type: 'object',
        properties: {
          period: {
            title: 'Period',
            type: 'string',
            readonly: true
          },
          quarter1: {
            title: '1st Quarter',
            type: 'string'
          },
          quarter2: {
            title: '2nd Quarter',
            type: 'string'
          },
          quarter3: {
            title: '3rd Quarter',
            type: 'string'
          },
          quarter4: {
            title: '4th Quarter',
            type: 'string'
          },
          total: {
            title: 'Total',
            type: 'string'
          }
        }
    }
  }
  return (<QuarterlyBreakdown schema={schema} formData={data} onChange={data => console.log(data)} />)

})
.add('Input Fields- Enum', () => {
  let data = [
    {
      period: "2015"
    },
    {
      period: "2016"
    },
    {
      period: "2017"
    }
  ]

  let schema = {
      type: "array",
      addable: true,
      title: "Installments",
      items: {
        type: 'object',
        properties: {
          period: {
            title: 'Period',
            type: 'string',
            readonly: true
          },
          quarter1: {
            title: '1st Quarter',
            type: 'string',
            enum: [
              "Yes",
              "No"
            ]
          },
          quarter2: {
            title: '2nd Quarter',
            type: 'string',
            enum: [
              "Yes",
              "No"
            ]
          },
          quarter3: {
            title: '3rd Quarter',
            type: 'string',
            enum: [
              "Yes",
              "No"
            ]
          },
          quarter4: {
            title: '4th Quarter',
            type: 'string',
            enum: [
              "Yes",
              "No"
            ]
          },
          total: {
            title: 'Total',
            type: 'string'
          }
        }
    }
  }
  return (<QuarterlyBreakdown schema={schema} formData={data} onChange={data => console.log(data)} />)

})
.add('InputFields - Prepopulated', () => {
  let data = [
    {
      period: "2015",
      quarter1: "Bernard",
      quarter2: "Barks",
      quarter3: "Woof",
      quarter4: "Spot",
      total: "2 new dogs"
    },
    {
      period: "2016",
      quarter1: "Wag",
      quarter2: "floppy",
      quarter3: "Wolf",
      quarter4: "Scout",
      total: "3 new dogs"
    },
    {
      period: "2017",
      quarter1: "Bear",
      quarter2: "cuddletons",
      quarter3: "Melissa",
      quarter4: "Ben",
      total: "4 new dogs"
    }
  ]

  let schema = {
      type: "array",
      addable: true,
      title: "Installments",
      items: {
        type: 'object',
        properties: {
          period: {
            title: 'Period',
            type: 'string',
            readonly: true
          },
          quarter1: {
            title: '1st Quarter',
            type: 'string',
          },
          quarter2: {
            title: '2nd Quarter',
            type: 'string',
          },
          quarter3: {
            title: '3rd Quarter',
            type: 'string',
          },
          quarter4: {
            title: '4th Quarter',
            type: 'string',
          },
          total: {
            title: 'Total',
            type: 'string',
          }
        }
    }
  }

  return (<QuarterlyBreakdown schema={schema} formData={data} onChange={data => console.log(data)} />)

})
.add('Hidden Quarter 2', () => {
  let data = [
    {
      period: "2015",
      quarter1: "Bernard",
      quarter2: "Barks",
      quarter3: "Woof",
      quarter4: "Spot",
      total: "2 new dogs"
    },
    {
      period: "2016",
      quarter1: "Wag",
      quarter2: "floppy",
      quarter3: "Wolf",
      quarter4: "Scout",
      total: "3 new dogs"
    },
    {
      period: "2017",
      quarter1: "Bear",
      quarter2: "cuddletons",
      quarter3: "Melissa",
      quarter4: "Ben",
      total: "4 new dogs"
    }
  ]

  let schema = {
      type: "array",
      title: "Installments",
      items: {
        type: 'object',
        properties: {
          period: {
            title: 'Period',
            type: 'string',
            readonly: true
          },
          quarter1: {
            title: '1st Quarter',
            type: 'string',
            readonly: true
          },
          quarter2: {
            title: '2nd Quarter',
            type: 'string',
            readonly: true,
            hidden: true
          },
          quarter3: {
            title: '3rd Quarter',
            type: 'string',
            readonly: true
          },
          quarter4: {
            title: '4th Quarter',
            type: 'string',
            readonly: true
          },
          total: {
            title: 'Total',
            type: 'string',
            readonly: true
          }
        }
    }
  }

  return (<QuarterlyBreakdown schema={schema} formData={data} onChange={data => console.log(data)} />)
})