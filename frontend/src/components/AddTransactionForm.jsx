import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTransactionForm({ onSuccess, editingTransaction, onCancelEdit }) {
    const isEditing = !!editingTransaction;
    const [type, setType] = useState(editingTransaction?.type || 'income');
    const [categoryId, setCategoryId] = useState(editingTransaction?.category_id || '');
    const [amount, setAmount] = useState(editingTransaction?.amount || '');
    const [description, setDescription] = useState(editingTransaction?.description || '');
    const [date, setDate] = useState(editingTransaction?.date || '');
    const [categories, setCategories] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
    if (editingTransaction) {
        setType(editingTransaction.type);
        setCategoryId(editingTransaction.category_id);
        setAmount(editingTransaction.amount);
        setDescription(editingTransaction.description);
        setDate(editingTransaction.date);
    }
    }, [editingTransaction]);

    useEffect(() => {
    axios
        .get(`http://localhost:8081/categories/${type}`)
        .then(res => setCategories(res.data))
        .catch(err => console.log('Error fetching categories:', err));
    }, [type]);

    const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
        userId,
        categoryId,
        type,
        amount,
        description,
        date,
    };

    const endpoint = isEditing
        ? `http://localhost:8081/update-transaction/${editingTransaction.id}`
        : `http://localhost:8081/add-transaction`;

    axios
        .post(endpoint, payload)
        .then(() => {
        alert(isEditing ? 'Transaction updated!' : 'Transaction added!');
        if (onSuccess) onSuccess();
        if (onCancelEdit) onCancelEdit();
        })
        .catch(err => console.log('Error saving transaction:', err));
    };
    
    return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
        <label className="block text-sm font-medium">Type</label>
        <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 rounded text-white bg-gray-900"
        >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
        </div>

        <div>
        <label className="block text-sm font-medium ">Category</label>
        <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 rounded text-white bg-gray-900"
        >
            <option value="">Select category</option>
            {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
            ))}
        </select>
        </div>

        <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded text-white bg-gray-900"
        />
        </div>

        <div>
        <label className="block text-sm font-medium">Description</label>
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded text-white bg-gray-900"
        />
        </div>

        <div>
        <label className="block text-sm font-medium">Date</label>
        <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded text-white bg-gray-900"
        />
        </div>

        <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-500 cursor-pointer"
        >
        {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </button>

        {isEditing && (
        <button
            type="button"
            onClick={onCancelEdit}
            className="w-full mt-2 bg-red-600 text-white p-2 rounded hover:bg-red-500 cursor-pointer"
        >
            Cancel Edit
        </button>
        )}
    </form>
    );
}

export default AddTransactionForm;
