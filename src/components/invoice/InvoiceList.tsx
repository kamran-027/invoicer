import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface InvoiceListProps {
  onEditInvoice: (id: string) => void;
  onSelectInvoice: (id: string) => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  onEditInvoice,
  onSelectInvoice,
}) => {
  const invoices = useSelector((state: RootState) => state.invoice.invoices);

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Invoices List</h2>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Invoice for {invoice.customer}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Status: {invoice.status}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Total</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    $
                    {invoice.lineItems
                      .reduce((sum, item) => sum + item.quantity * item.rate, 0)
                      .toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                onClick={() => onEditInvoice(invoice.id)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Edit
              </button>
              <button
                onClick={() => onSelectInvoice(invoice.id)}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;
