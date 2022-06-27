import React from 'react'

export default function ErrorMessage({ submitted_once, message, state, name }) {

  // let messsage = props.message ??

  if (!submitted_once) {
    return null;
  }

  if(state[name]){
    return null;
  }

  return (
    <small className='text-danger'>{ (message ? message : "required")}</small>
  )
}
