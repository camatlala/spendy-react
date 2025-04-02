import React, { useState, useEffect } from 'react';
import NavBar from './UI Elements/NavBar';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';
import TransactionChart from './TransactionChart';
import axios from 'axios';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');

  const fetchTransactions = () => {
    axios.get(`http://localhost:8081/transactions/${userId}`)
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Error fetching transactions:", err));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-800">
      <NavBar />
      <div className="px-6 py-10 lg:px-20">
        <h1 className="text-3xl font-semibold mb-10 text-white">
          Welcome in{userName ? `, ${userName}` : ''} 👋
        </h1>

        <div className="grid gap-6 lg:grid-cols-3 auto-rows-min">
          <div className="col-span-3 flex flex-col md:flex-row justify-between gap-4">
            <div className="w-full bg-gray-800 rounded-3xl text-white text-center py-10 px-6">
              <div className="text-2xl font-medium">Current Balance is</div>
              <div className="text-6xl font-bold mt-2">
                R{(getTotal(transactions, 'income') - getTotal(transactions, 'expense')).toLocaleString()}
              </div>
            </div>
            <div className="flex-1 bg-gray-800 rounded-3xl text-white text-center py-10 px-6">
              <div className="text-2xl font-medium text-green-400">Total Income</div>
              <div className="text-4xl font-semibold mt-2">R{getTotal(transactions, 'income').toLocaleString()}</div>
            </div>
            <div className="flex-1 bg-gray-800 rounded-3xl text-white text-center py-10 px-6">
              <div className="text-2xl font-medium text-red-400">Total Expenses</div>
              <div className="text-4xl font-semibold mt-2">R{getTotal(transactions, 'expense').toLocaleString()}</div>
            </div>
          </div>

          {/* Add Transaction Form (left) */}
          <div className="bg-gray-800 rounded-3xl text-white p-6 row-span-1">
            <AddTransactionForm
              onSuccess={fetchTransactions}
              editingTransaction={editingTransaction}
              onCancelEdit={() => setEditingTransaction(null)}
            />
          </div>
          
          {/* Recent Transactions */}
          <div className="bg-gray-800 rounded-3xl text-white p-6 col-span-2">
            
          <TransactionList
            transactions={transactions}
            onEdit={(tx) => setEditingTransaction(tx)}
          />

          <br />
          <div className="flex justify-between items-center mb-4">
          <button
            onClick={fetchTransactions}
            className="text-sm px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white transition cursor-pointer"
          >
      Refresh
    </button>
  </div>
  
        </div>
        
          <div className="bg-gray-800 rounded-3xl text-white p-6 col-span-3">
            <h2 className="text-xl font-semibold mb-4">Spending Overview</h2>
            <div>
              <p><TransactionChart transactions={transactions}/></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTotal(transactions, type) {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
}
