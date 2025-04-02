function TransactionList({ transactions, onEdit }) {
    return (
        <div className="space-y-4 mt-2">
        <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
        {transactions.length === 0 && <p className="text-gray-400">No transactions yet.</p>}

        <ul className="space-y-2 max-h-90 overflow-y-auto pr-1">
            {transactions.map(tx => (
            <li
                key={tx.id}
                className={`p-4 rounded-md border-l-4 ${
                tx.type === 'income' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
                }`}
            >
                <div className="flex justify-between items-center">
                <div>
                    <span className="text-gray-800">
                    {tx.type === 'income' ? '+' : '-'} R{tx.amount} ({tx.type})
                    </span>
                    <div className="text-sm text-gray-600">{tx.description}</div>
                    <div className="text-sm text-gray-500">{tx.date}</div>
                </div>
                <button
                    onClick={() => onEdit(tx)}
                    className="text-m text-indigo-700 hover:underline cursor-pointer"
                >
                    Edit
                </button>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default TransactionList;