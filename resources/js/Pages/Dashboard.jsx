import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Product from '@/Components/Product';
import Modal from '@/Components/Modal';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ auth, products }) {
    // State to manage modal visibility
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form handling using Inertia's useForm
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        description: '',
        price: '',
        quantity: ''
    });

    // Open and close modal functions
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        reset();
    };

    // Submit function for creating a new product
    const submitCreateProduct = (e) => {
        e.preventDefault();
        post(route('product.store'), {
            onSuccess: () => closeCreateModal()
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Product
                    </h2>
                    
                    {/* Create button that opens the modal */}
                    <button 
                        type="button" 
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white transition duration-150 ease-in-out hover:bg-gray-800 focus:outline-none"
                        onClick={openCreateModal}
                    >
                        Create
                    </button>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                {products.map(product =>
                    <Product key={product.id} product={product} />
                )}
            </div>

            {/* Create Product Modal */}
            <Modal show={isCreateModalOpen} onClose={closeCreateModal} maxWidth="lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold">Create New Product</h2>

                    <form onSubmit={submitCreateProduct} className="mt-4 space-y-4">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={(e) => setData('name', e.target.value)} 
                                className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" 
                            />
                            {errors.name && <div className="mt-2 text-sm text-red-600">{errors.name}</div>}
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea 
                                value={data.description} 
                                onChange={(e) => setData('description', e.target.value)} 
                                className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            ></textarea>
                            {errors.description && <div className="mt-2 text-sm text-red-600">{errors.description}</div>}
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input 
                                type="number" 
                                value={data.price} 
                                onChange={(e) => setData('price', e.target.value)} 
                                className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            {errors.price && <div className="mt-2 text-sm text-red-600">{errors.price}</div>}
                        </div>

                        {/* Product Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input 
                                type="number" 
                                value={data.quantity} 
                                onChange={(e) => setData('quantity', e.target.value)} 
                                className="mt-1 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            {errors.quantity && <div className="mt-2 text-sm text-red-600">{errors.quantity}</div>}
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Create Product
                            </button>
                            <button 
                                type="button" 
                                onClick={closeCreateModal} 
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
