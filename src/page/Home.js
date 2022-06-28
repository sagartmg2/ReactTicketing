import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}/tickets`;
    axios.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(res => {
        setTickets(res.data)
      }).catch(err => {

      })
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>

      <h1>Tickets</h1>
      {/* <but0ton type="button" className='btn btn-secondary'> */}
        <Link className="btn btn-secondary" to="/tickets/create">Create</Link>
      {/* </button> */}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
            <th scope="col">user</th>
          </tr>
        </thead>
        <tbody>
          {
            tickets.map(el => {
              return <tr key={el._id}>
                <td>{el.title}</td>
                <td>{el.description}</td>
                <td>{el.priority}</td>
                <td>{el.status}</td>
                <td>{el.user.name}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>


  )
}
