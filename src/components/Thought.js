import React from 'react';

const Thought = () => {
  return (
    <div className="font-roboto text-sm">
      <div className="bg-white rounded-lg shadow-md p-6 m-8 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-left text-blue-600">Twenty Four Hours a Day</h1>
          <div className="text-right text-blue-600">
            <p className="text-blue-300">Tuesday</p>
            <p className="text-lg font-bold">Jan</p>
            <p className="text-lg font-bold">09</p>
          </div>
        </div>
        <hr className="border-gray-300 my-4" />
        <div className="text-center mb-4">
          <button className="px-2 py-1 border rounded-md mx-1">A</button>
          <button className="px-2 py-1 border rounded-md mx-1">A</button>
          <button className="px-2 py-1 border rounded-md mx-1">A</button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Thought for the Day</h2>
          <p className="text-gray-700 mb-4">
            When we were drinking, most of us had no real faith in anything. We may have said that we believed in God, but we didn’t act as though we did. We never honestly asked God to help us and we never really accepted His help. To us, faith looked like helplessness. But when we came into A.A., we began to have faith in God. And we found out that faith gave us the strength we needed to overcome drinking. Have I learned that there is strength in faith?
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Meditation for the Day</h2>
          <p className="text-gray-700 mb-4">
            I will have faith, no matter what may befall me. I will be patient, even in the midst of troubles. I will not fear the strain of life, because I believe that God knows just what I can bear. I will look to the future with confidence. I know that God will not ask me to bear anything that could overcome or destroy me.
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Prayer for the Day</h2>
          <p className="text-gray-700 mb-4">
            I pray that I may put this day in the hands of God. I pray for faith, so that nothing will upset me or weaken my determination to stay sober.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Thought;
