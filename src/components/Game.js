import React from 'react';
import "../App.css"

function Game() {
  return (
    <div className="min-h-screen bg-gray-200 from-gray-900 to-orange-500 flex items-center justify-center" style={{ fontFamily: 'roboto' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-8">Pure Rush</h1>
        <div className="space-y-4">
          <a
            
            className="block bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-200"
            onClick={()=>window.location.href="https://positivechoices.org.au/pure-rush/index.html"}
          >
            Play Pure Rush in Your Browser
          </a>
          <a
            onClick={()=>window.location.href="https://cracksintheice.org.au/tools-for-teachers/pure-rush-an-interactive-drug-education-game"}
            className="block bg-white text-green-500 px-6 py-3 rounded-lg text-lg font-semibold border-2 border-green-500 hover:bg-orange-500 hover:text-white transition duration-200"
          >
            Download Pure Rush from App Store
          </a>
        </div>
      </div>
    </div>
  );
}

export default Game;