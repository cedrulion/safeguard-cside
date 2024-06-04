import React from 'react';

function Game() {
  return (
    <div className="min-h-screen bg-gray-200 from-gray-900 to-orange-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-8">Pure Rush</h1>
        <div className="space-y-4">
          <a
            href="#"
            className="block bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-200"
          >
            Play Pure Rush in Your Browser
          </a>
          <a
            href="#"
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