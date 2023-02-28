import React from 'react'
import { Route, Routes } from 'react-router'
import { Registration } from '../components/Registration'
import Login from '../components/Login'
import HomeRoute from './HomeRoute'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/:id" element={<HomeRoute />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
            </Routes>
        </div>
    )
}

export default AllRoutes