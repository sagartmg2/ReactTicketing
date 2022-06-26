import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../../component/ErrorMessage';

export default function Login() {

    const [state, setstate] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleSumbit(event) {

        event.preventDefault();


        let { email, password } = state

        axios.post("http://localhost:8000/api/users/login", {
            email,
            password
        })
            .then(res => {
                console.log({ res });
                localStorage.setItem("access_token", res.data.access_token)
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
                        <ErrorMessage />
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
                        <ErrorMessage />
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
