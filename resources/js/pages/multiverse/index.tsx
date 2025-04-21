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
// 
// Extend the Inertia PageProps type to include flash data
interface PagePropsWithFlash extends PageProps {
    flash: FlashMessages;
}

const MultiverseIndex: React.FC<MultiverseIndexProps> = ({ multiverses }) => {
    // Extend `usePage` hook to include the flash data in the page props
    const { flash } = usePage<PagePropsWithFlash>().props;

    const [multiversesData, setMultiversesData] = useState<Multiverse[]>(multiverses); // State for multiverses data
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false); // To control the visibility of the success message

    const { delete: deleteMultiverse } = useForm();

    useEffect(() => {
        if (flash.success) {
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 900);
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

            {/* Display the success message if available */}
            {flash.success && showSuccessMessage && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <p className="font-bold">Multiverse created successfully!</p>
                    <div className="mt-2">
                        {/* Display the name and description of the created multiverse */}
                        <p>
                            <span className="font-semibold">Name:</span> {flash.name}
                        </p>
                        {flash.description && (
                            <p>
                                <span className="font-semibold">Description:</span> {flash.description}
                            </p>
                        )}
                    </div>
                </div>
            )}

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
