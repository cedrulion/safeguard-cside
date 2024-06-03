import React from 'react'
import Nav from './Nav'

function Browse() {
  return (
    <div>
        
        <div className='border-b border-gray-400'>
      <h1 className='text-2xl font-bold'>Recovery Starts Today</h1>
      <p className='font-serif font-semibold mb-7'>It's time to make a change. Start exploring your recovery options </p>
    </div>
    <div className='pt-32 flex justify-center'>
        <ul className='grid grid-rows-2 gap-3'>
            <li className='text-green-800 border border-green-700 px-3 py-4'>online Addiction Therapy
            </li>
            <li className='text-blue-800 border border-blue-700 px-3 py-4'>Browse Treatment Centers</li>
        </ul>
    </div>
    </div>
  )

}

export default Browse
