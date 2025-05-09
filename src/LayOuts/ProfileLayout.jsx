import React from 'react'
import UserSidebar from '../Profiles/UserSidebar'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
    return (
        <div>
            <div className="flex">
                <UserSidebar />
                <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default ProfileLayout