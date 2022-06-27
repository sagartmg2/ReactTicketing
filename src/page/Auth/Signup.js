import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../../component/ErrorMessage';
import Select from 'react-select';

export default function Signup() {

  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
  });

  const [role_options, setRoleOptions] = useState([]);


  useEffect(() => {
    // call role api
    setRoleOptions([
      { "_id": "6298970d01e42754cd2956cd", "name": "admin" },
      { "_id": "6298970d01e42754cd2956ce", "name": "developer" },
      { "_id": "6298970d01e42754cd2956cf", "name": "customer" }
    ])

  }, []);


  const [submitted_once, setSubmittedOnce] = useState(false);

  const navigate = useNavigate();

  function handleSumbit(event) {

    event.preventDefault();

    setSubmittedOnce(true)

    let { email, password, name, role_id } = state

    axios.post("http://localhost:8000/api/users/login", {
      email,
      password,
      name,
      role_id
    })
      .then(res => {
        console.log({ res });
        localStorage.setItem("access_token", res.data.access_token)
        // setSignup(true)
        // dispatch(login())

        navigate(-1)
      })
      .catch(err => {
        // setSignup(false)
      })
  }

  function handleChange(e) {
    console.log(e);
    setstate({ ...state, [e.target.name]: e.target.value })
  }

  function handleRoleChange(e, action) {
    setstate({ ...state, [action.name]: e.value })
  }

  let roles_mapping = role_options.map(el => {
    return {
      label: el.name,
      value: el._id,
    }
  })

  return (
    <div className='d-flex justify-content-center mt-5'>
      <div className='col-md-6'>
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label required-field">Name</label>
            <input type="text"
              name='name'
              value={state.name}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
              className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            />
            <ErrorMessage submitted_once={submitted_once} state={state} name="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label required-field">Email address</label>
            <input type="email"
              name='email'
              value={state.email}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={handleChange}
              className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            />
            <ErrorMessage submitted_once={submitted_once} state={state} name="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label required-field">Password</label>
            <input type="password"
              name="password"
              value={state.password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleChange}
              className="form-control" id="exampleInputPassword1"
            />
            <ErrorMessage submitted_once={submitted_once} state={state} name="password" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label required-field">Role ID</label>
            <Select
              options={roles_mapping}
              onChange={handleRoleChange}
              name="role_id"
            />
            {/* <input type="text"
              name="password"
              value={state.password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange={handleChange}
              className="form-control" id="exampleInputPassword1"
            /> */}
            {/* <ErrorMessage submitted_once={submitted_once} state={state} name="password" /> */}
          </div>
          <button
            disabled={(state.email && state.password) ? false : true}
            type="submit" className="btn btn-primary"
          >Submit</button>

        </form>
      </div>
    </div>
  )
}
