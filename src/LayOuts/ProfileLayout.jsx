import React from 'react'
import UserSidebar from '../Profiles/UserSidebar'

const ProfileLayout = () => {
    return (
        <div>
            <div className="flex">
                <UserSidebar />
                <main className="flex-1 p-6 bg-gray-50 min-h-screen">
                    hi
                </main>
            </div>
        </div>
    )
}

export default ProfileLayout