import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute() {

    //TODO: check for authentication. 

    return <Outlet />
}
