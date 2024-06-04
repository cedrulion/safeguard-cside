import React from 'react';
import "../App.css"

function Definition() {
  return (
    <div className='flex align-center mx-20 flex-col  text-center pt-3' style={{ fontFamily: 'roboto' }}>
      <div className="mt-20">
        <div className="rounded-xl shadow-md bg-white overflow-hidden px-4 py-5 border border-green-500" style={{width:"700px"}}>  
          <div className="flex justify-center items-center">  
            <p className="text-3xl font-bold text-sky-600">Drug abuse/ Substance abuse</p>
          </div>
          <p className="mt-4 text-gray-500 text-base">  
            The use of illegal drugs or the use of prescription or over-the-counter drugs for purposes other than those for which they are meant to be used, or in excessive amounts. Drug abuse may lead to social, physical, emotional, and job-related problems.
          </p>
          <div className="flex justify-center mt-4">  
            <button className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold">
              <span><i className='fa-solid fa-exclamation-triangle'></i> SAY NO TO USE OF DRUGS</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="rounded-xl shadow-md bg-white overflow-hidden px-4 py-5 border border-green-500" style={{width:"700px"}}>  
          <div className="flex justify-center items-center">  
            <p className="text-3xl font-bold text-sky-600">Drug intoxication</p>
          </div>
          <p className="mt-4 text-gray-500 text-base">  
          Drug intoxication is a temporary state of altered consciousness and behavior caused by the recent use of a psychoactive drug. It can also refer to the effects of ingesting poison or overconsuming substances that are normally harmless.
          </p>
          <div className="flex justify-center mt-4">  
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Definition;
