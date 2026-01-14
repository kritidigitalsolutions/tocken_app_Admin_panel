import React from 'react';

export default function Orders() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Plan</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-3 text-sm text-gray-600">No orders found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
