import React from 'react'

export default function ErrorMessage(props) {

    // let messsage = props.message ??

    let message = props.message  ?  props.message : "required";
    
  return (
    <small className='text-danger'>{message}</small>
  )
}
