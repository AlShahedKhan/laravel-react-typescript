import React, { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

// Define the structure of a multiverse object
interface Multiverse {
  id: string;
  name: string;
  description: string;
}

// Define the structure of the flash messages
interface FlashMessages {
  success?: string;
  error?: string;
}

// Define the props type for the MultiverseIndex component
interface MultiverseIndexProps {
  multiverses: Multiverse[];
}

// Extend the Inertia PageProps type to include flash data
interface PagePropsWithFlash extends PageProps {
  flash: FlashMessages;
}

const MultiverseIndex: React.FC<MultiverseIndexProps> = ({ multiverses }) => {
  // Extend `usePage` hook to include the flash data in the page props
  const { flash } = usePage<PagePropsWithFlash>().props;

  const [multiversesData, setMultiversesData] = useState<Multiverse[]>(multiverses); // State for multiverses data

  const { delete: deleteMultiverse } = useForm();

  // Handle flash messages (success or error)
  useEffect(() => {
    if (flash.success) {
      alert(flash.success);  // Display success message
    }
    if (flash.error) {
      alert(flash.error);  // Display error message if multiverse is not found
    }
  }, [flash]);

  // Delete a multiverse
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this multiverse?')) {
      // Use Inertia's delete method to send the DELETE request
      deleteMultiverse(`/multiverse/${id}`, {
        onSuccess: () => {
          // Dynamically remove the deleted item from the state without a full page reload
          setMultiversesData(multiversesData.filter((item) => item.id !== id));
        },
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Multiverses</h1>

      <div className="mb-6">
        <Link href="/multiverse/create" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Create New Multiverse
        </Link>
      </div>

      {/* Display message when there are no multiverses */}
      {multiversesData.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500">No multiverses found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {multiversesData.map((multiverse) => (
            <div key={multiverse.id} className="p-4 border rounded shadow-sm">
              <h2 className="font-semibold text-xl">{multiverse.name}</h2>
              <p className="text-gray-700">{multiverse.description}</p>

              <div className="mt-4 flex space-x-2">
                <Link href={`/multiverse/${multiverse.id}`} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  View Details
                </Link>
                <Link href={`/multiverse/${multiverse.id}/edit`} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(multiverse.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiverseIndex;
