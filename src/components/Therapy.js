import React from 'react'

function Therapy() {
  return (
    <div className='font-Ubuntu'>
    <div className='flex justify-center '>
      <div>
        <h1 className=' text-lg my-6'>Help us match you to the right therapits.</h1>
        <h1 className='text-lg my-6'>What type of therapy are you looking for?</h1>
       <div>
        <ul>
            <li className='bg-green-500 rounded-lg py-2 px-3 mx-3 my-4'>individual (for myself)</li>
            <li className='bg-green-500 rounded-lg  py-2 px-3 mx-3 my-4'>Couples (for myself and my partner)</li>
            <li className='bg-green-500 rounded-lg  py-2 px-3 mx-3 my-4'>Teen (for my child)</li>
        </ul>
       </div>

      </div>
    </div>
    <h1 className='text-2xl font-bold my-6'>Online Addiction Counseling</h1>
       <p>Get professional hep from an online addiction and mental health counselor from BetterHelp.</p>
       <p>Start receiving support via phone, video or live-chat.</p>
    </div>
  )
}

export default Therapy
