import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


export default function Home() {

  const [tickets, setTickets] = useState([]);

  const [state, setstate] = useState({
    per_page: 5,
    page: 1,
    search_term:"",
  });

  const [total_tickets, setTotalTickets] = useState(0);

  function fetchTickets() {
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}/tickets?page=${state.page}&per_page=${state.per_page}&search_term=${state.search_term}`;
    axios.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(res => {
        setTickets(res.data.tickets)
        // setstate({...state,total_tickets:res.data.total_counts})
        // total_tickets = res.data.total_counts
        setTotalTickets(res.data.total_counts)

      }).catch(err => {

      })
  }

  useEffect(() => {
    fetchTickets()
  }, [state]);

  function handlePageClick(e) {
    console.log(e.selected)
    setstate({ ...state, page: (e.selected + 1) })
    // fetchTickets()
  }

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>

        <h1>Tickets</h1>
        {/* <but0ton type="button" className='btn btn-secondary'> */}
        <div>

          <input type="text" value={state.search_term} onChange={(e) => { setstate({...state,search_term:e.target.value})}} />
          <Link className="btn btn-secondary" to="/tickets/create">Create</Link>
        </div>
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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(total_tickets / state.per_page)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>


  )
}
