import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const MultiverseEdit = ({ multiverse }) => {
  const form = useForm({
    name: multiverse.name,
    description: multiverse.description,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    form.put(`/multiverse/${multiverse.id}`, {
      onSuccess: () => {
        // Redirect after successful update using Inertia's method
        window.location.href = '/multiverse';  // Use window.location.href to navigate back
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Multiverse</h1>

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
          {form.errors.name && <p className="text-red-500 text-sm mt-1">{form.errors.name}</p>}
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
            className={`w-full p-2 border rounded ${form.errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {form.errors.description && <p className="text-red-500 text-sm mt-1">{form.errors.description}</p>}
        </div>

        <button
          type="submit"
          disabled={form.processing}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {form.processing ? 'Updating...' : 'Update Multiverse'}
        </button>
      </form>
    </div>
  );
};

export default MultiverseEdit;
