import React from 'react'

import Select from 'react-select'

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    height: '53px',
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: 'transparent',
      borderRadius: '10px',
      border: '1px solid #989898',
    }
  },
}

const CustomSelect = ({ options, handleChange }) => (
  <Select
    // defaultValue={options[0]}
    options={options}
    onChange={(e) => handleChange(e)}
    isMulti
    styles={colourStyles}
  />
)

export default CustomSelect
