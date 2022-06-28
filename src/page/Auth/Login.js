import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../../component/ErrorMessage';

export default function Login() {

    const [state, setstate] = useState({
        email: "dev@dev.com",
        password: "password",
    });

    const [submitted_once, setSubmittedOnce] = useState(false);

    const navigate = useNavigate();

    function handleSumbit(event) {

        event.preventDefault();

        setSubmittedOnce(true)

        let { email, password } = state

        axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/users/login`, {
            email,
            password
        })
            .then(res => {
                console.log({ res });
                localStorage.setItem("access_token", res.data.access_token)

                // TODO: set useContext for login status

                // setLogin(true)
                // dispatch(login())

                navigate(-1)
            })
            .catch(err => {
                // setLogin(false)
            })
    }

    function handleChange(e) {
        setstate({ ...state, [e.target.name]: e.target.value })
    }

    console.log("process.env.REACT_APP_SERVER_DOMAIN", process.env.REACT_APP_SERVER_DOMAIN)

    return (
        <div className='d-flex justify-content-center mt-5'>
            <div className='col-md-6'>
                <form onSubmit={handleSumbit}>
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
                    <button
                        disabled={(state.email && state.password) ? false : true}
                        type="submit" className="btn btn-primary"
                    >Submit</button>

                </form>
            </div>
        </div>
    )
}
