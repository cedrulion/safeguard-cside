import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"

function Browse() {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-green-50" style={{ fontFamily: 'roboto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-900 sm:text-5xl">
            Recovery Starts Today
          </h1>
          <p className="mt-4 text-xl text-green-700">
            It's time to make a change. Start exploring your recovery options.
          </p>
        </div>
        <div className="mt-20">
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <li>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-green-900"
                  >
                    Online Addiction Therapy
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Get professional help from certified therapists online.
                      Convenient and confidential sessions tailored to your needs.
                    </p>
                  </div>
                  <div className="mt-5">
                    <a
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={()=>navigate("/dashboard/question")}
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-green-900">
                    Browse Treatment Centers
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Explore a wide range of treatment centers near you. Find
                      the right program that suits your specific needs and
                      preferences.
                    </p>
                  </div>
                  <div className="mt-5">
                    <a
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={()=>window.location.href="https://nderahospital.prod.risa.rw/1/icyizere-1"}
                    >
                      Browse Centers
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Browse;