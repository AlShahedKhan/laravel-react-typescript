import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

interface MultiverseProps {
    multiverse?: {
        id: number;
        name: string;
        description: string;
    };
}

const MultiverseCreate: React.FC<MultiverseProps> = ({ multiverse }) => {
    const [success, setSuccess] = useState(false);
    const [createdMultiverse, setCreatedMultiverse] = useState<any>(multiverse || null);

    // Inertia form handling
    const form = useForm({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (multiverse) {
            setCreatedMultiverse(multiverse);
            setSuccess(true);
        }
    }, [multiverse]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/multiverse', {
            onSuccess: () => {
                // form.reset();
                window.location.href = '/multiverse';
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Create New Multiverse</h1>

            {success && createdMultiverse && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <p className="font-bold">Multiverse created successfully!</p>
                    <div className="mt-2">
                        <p><span className="font-semibold">Name:</span> {createdMultiverse.name}</p>
                        {createdMultiverse.description && (
                            <p><span className="font-semibold">Description:</span> {createdMultiverse.description}</p>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                        className={`w-full p-2 border rounded ${form.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {form.errors.name && (
                        <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={form.data.description}
                        onChange={(e) => form.setData('description', e.target.value)}
                        rows={4}
                        className={`w-full p-2 border rounded ${
                            form.errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {form.errors.description && (
                        <p className="text-red-500 text-sm mt-1">{form.errors.description}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-medium"
                >
                    {form.processing ? 'Creating...' : 'Create Multiverse'}
                </button>
            </form>
        </div>
    );
};

export default MultiverseCreate;
