import React from 'react'
import { Link } from 'react-router-dom'
import { HOME } from '../../RoutePaths/RoutePaths'

const ErrorPage = () => {
    
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-purple-600">
        <div id="error-page">
          <h1 className="lg:text-6xl font-bold text-2xl text-white">Oops!</h1>
          <p className="text-xl text-white mt-5">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-3xl text-white">
           Not Found
          </p>
          <div className="mt-4">
            <Link
              to={HOME}
              className="px-5 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
