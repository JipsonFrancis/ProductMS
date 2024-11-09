import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { useForm, usePage } from '@inertiajs/react';

export default function Product({ product }) {

    const { auth } = usePage().props;
 
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: product.message,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('product.update', product.id), { onSuccess: () => setEditing(false) });
    };

    const deletes = (e) => {
        e.preventDefault();
        patch(route('product.destroy', product.id), { onSuccess: () => setDeleting(false) });
    };

    // Sample data for product edits
    const productEdits = [
        { date: '2024-11-01', editor: 'John Doe', field: 'Price', oldValue: '$20', newValue: '$25' },
        { date: '2024-11-05', editor: 'Jane Smith', field: 'Description', oldValue: 'Basic description', newValue: 'Updated description' },
        { date: '2024-11-08', editor: 'Mike Johnson', field: 'Quantity', oldValue: '10', newValue: '15' },
    ];

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6 mt-4 relative">
            <div className="flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-lg font-semibold text-gray-800">{product.name}</span>
                            <small className="ml-2 text-sm text-gray-600">R{product.price}</small>
                        </div>
                        {true &&
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                {/* Add styles for positioning */}
                                <Dropdown.Content className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border border-gray-200 z-50">
                                    <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                        Edit
                                    </button>
                                    <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setDeleting(true)}>
                                        Delete
                                    </button>
                                    <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={openModal}>
                                        Audits
                                    </button>
                                </Dropdown.Content>
                            </Dropdown>
                        }
                    </div>

                    {editing
                        ? <form onSubmit={submit}>
                            {/* Product Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={e => setData('name', e.target.value)} 
                                    className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" 
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                        
                            {/* Product Description */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                    className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                ></textarea>
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        
                            {/* Product Price */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input 
                                    type="number" 
                                    value={data.price} 
                                    onChange={e => setData('price', e.target.value)} 
                                    className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError message={errors.price} className="mt-2" />
                            </div>
                        
                            {/* Product Quantity */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input 
                                    type="number" 
                                    value={data.quantity} 
                                    onChange={e => setData('quantity', e.target.value)} 
                                    className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                />
                                <InputError message={errors.quantity} className="mt-2" />
                            </div>
                        
                            {/* Buttons */}
                            <div className="space-x-2">
                                <PrimaryButton className="mt-4">Save</PrimaryButton>
                                <button 
                                    type="button" 
                                    className="mt-4" 
                                    onClick={() => { setEditing(false); reset(); clearErrors(); setDeleting(false)}}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    
                        : <p className="mt-4 text-lg text-gray-900">{product.description}</p>
                    }
                    {deleting
                        ? <form onSubmit={deletes}>
                            {/* Confirmation Message */}
                            <p className="text-gray-700">Are you sure you want to delete this product?</p>
                            
                            {/* Buttons */}
                            <div className="space-x-2 mt-4">
                                <PrimaryButton className="bg-red-500 text-white" type="submit">
                                    Delete
                                </PrimaryButton>
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => { setDeleting(false); reset(); clearErrors(); }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    : <></>
                    }
                </div>
            </div>

            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold">Audit Logs</h2>
                    {/* Table to show product edit history */}
                    <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 border-b">Desc.</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Price</th>
                                <th className="px-4 py-2 border-b">Product</th>
                                <th className="px-4 py-2 border-b">Update at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.logs.map((log, index) => (
                                <tr key={index} className="text-gray-700">
                                    <td className="px-4 py-2 border-b">{log.description}</td>
                                    <td className="px-4 py-2 border-b">{log.name}</td>
                                    <td className="px-4 py-2 border-b">{log.price}</td>
                                    <td className="px-4 py-2 border-b">{product.name}</td>
                                    <td className="px-4 py-2 border-b">{log.updated_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        Close Modal
                    </button>
                </div>
            </Modal>
        </div>
    );
}
