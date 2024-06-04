import React from 'react';
import "../App.css"

const Emergency = () => {
  return (
    <div className="font-roboto" style={{ fontFamily: 'roboto' }}>
      <div className="bg-white rounded-lg shadow-md mt-20 p-6 m-8 border border-green-500">
        <h1 className="text-2xl font-bold text-center mb-4">How to Do an Intervention</h1>
        <div className="flex justify-center mb-4">
         
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">It May Be the Nudge People Need to Get Help</h2>
          <p className="mb-4">
            It is extremely painful to stand by and watch someone’s life be destroyed. Yet that’s the position family members find themselves in when a loved one addicted to drugs or alcohol denies having a problem. Until that person admits the need for help, there is usually little that can be done.
          </p>
          <p className="mb-4">
            Professionals who conduct formal interventions for a living help family members and friends hold up a mirror to the loved one’s behavior, increasing the motivation to confront their addiction before hitting bottom—losing their job, health and family.
          </p>
          <h2 className="text-xl font-semibold mb-2">Share your Concerns</h2>
          <p className="mb-4">
            The power of an addiction intervention comes from having participants express concern and compassion for the addicted person, without anger. Mary McMahon, an intervention specialist who has conducted interventions for many families, Minnesota.
          </p>
          <p className="mb-4">
            McMahon has trained members and friends prepare for the intervention by writing letters to the alcoholic or addict.
          </p>
        </div>
      </div>
      <div className="bg-indigo-100 text-center p-4 mt-4">
        <p className="text-lg font-semibold mb-2">Are you or a loved one struggling with alcohol or other drugs? Call today to speak confidentially with a recovery expert. Most insurance accepted.</p>
        <div className="flex justify-center items-center gap-2">
          <span className="bg-blue-200 px-4 py-2 rounded-md text-blue-900 font-semibold">
            For Help, Call:
          </span>
          <span className="bg-yellow-200 px-4 py-2 rounded-md text-yellow-900 font-semibold">
            2575
          </span>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
