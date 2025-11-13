import { useState } from "react";

export default function Sidebar({ data, applyItems, removeInvoice }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedInvoice, setExpandedInvoice] = useState(null);

  const toggleInvoice = (index) => {
    setExpandedInvoice(expandedInvoice === index ? null : index);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-green-500 text-white rounded-md shadow-lg hover:bg-green-600 transition-colors"
      >
        {isOpen ? "Close" : "Open"} Sidebar
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white transform transition-transform duration-300 shadow-xl z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 py-20 overflow-y-auto h-full">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Invoice History</h2>
          <ul className="space-y-4">
            {data.map((invoice, index) => (
              <li key={index} className="bg-gray-800 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleInvoice(index)}
                    className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <span>{invoice.clientData.client || "Customer"}</span>
                    <span className="text-gray-400">{expandedInvoice === index ? "-" : "+"}</span>
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={() => removeInvoice(index)}
                    className="ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>

                {expandedInvoice === index && (
                  <div className="p-4 border-t border-gray-700 bg-gray-700 rounded-b-lg space-y-2">
                    <p><span className="font-semibold">Country:</span> {invoice.clientData.country}</p>
                    <p><span className="font-semibold">Due Date:</span> {invoice.clientData.dueDate}</p>
                    <p><span className="font-semibold">Location:</span> {invoice.clientData.locationArea}</p>
                    <p><span className="font-semibold">Phone:</span> {invoice.clientData.phone}</p>
                    <h4 className="mt-2 font-semibold border-b border-gray-600 pb-1">Items:</h4>
                    <ul className="mt-1 space-y-1">
                      {invoice.items.map((item, i) => (
                        <li key={i} className="text-sm bg-gray-600 p-1 rounded flex justify-between">
                          <span>{item.itemDescription}</span>
                          <span>{item.quantity} PCS</span>
                          <span>{item.rate} PKR</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => applyItems(invoice.clientData, invoice.items)}
                      className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition-colors"
                    >
                      Apply to Current Invoice
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
