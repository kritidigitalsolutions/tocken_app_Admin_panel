import React from 'react';

export default function Plans() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Plans</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Plan Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-6 py-3 text-sm text-gray-600">No plans found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
