import axios, { Axios } from 'axios';
import React, { useState } from 'react'

export default function Create() {

    const [state, setstate] = useState({
        title: "custom",
        description: "custom description",

    });

    const [files, setFiles] = useState([]);

    function handleFileChange(e) {
        setFiles(e.target.files)
    }

    function handleSubmit(e) {

        e.preventDefault();

        let url = `${process.env.REACT_APP_SERVER_DOMAIN}/tickets`;

        let { title, description } = state

        let form_data = new FormData();

        form_data.append("title", title)
        form_data.append("description", description)

        // console.log("tuype",typeof(files))
        // console.log("tuype _) arr ",typeof([]))
        // console.log("111 ",Array.isArray(files))
        // console.log("222 ",Array.isArray([]))

        let new_arr  = [...files];
        // [...files].forEach(el => {
        new_arr.forEach(el => {
            form_data.append("photos", el)
        })

        axios.post(url, form_data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        })
    }

    function handleChange(e) {
        setstate({ ...state, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label required-field">Title</label>
                    <input type="text"
                        name='title'
                        value={state.title}
                        onChange={handleChange}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label required-field">Description</label>
                    <textarea type="text"
                        rows="5"
                        name='description'
                        value={state.description}
                        onChange={handleChange}
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    />
                </div>

                <input
                    type="file"
                    accept='image/*'
                    onChange={handleFileChange}
                    multiple
                />

                <button
                    type="submit" className="btn btn-primary"
                >Submit</button>

            </form>

        </div>


    )
}
