import React from 'react';

const MultiverseShow = ({ multiverse }) => {
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Multiverse Details</h1>

      <div>
        <p className="font-semibold">Name: {multiverse.name}</p>
        {multiverse.description && <p className="font-semibold">Description: {multiverse.description}</p>}
      </div>

      {/* Back Button */}
      <div className="mt-6">
        <button
          onClick={() => window.history.back()}  // Go back to the previous page
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
        >
          Back to Multiverses
        </button>
      </div>
    </div>
  );
};

export default MultiverseShow;
