import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { isInvoiceLate, getDaysOverdue } from "../../utils/InvoiceUtils";

const LateInvoiceAlert: React.FC = () => {
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const lateInvoices = invoices.filter(isInvoiceLate);

  if (lateInvoices.length === 0) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg shadow-md">
      <div className="flex items-center mb-3">
        <svg
          className="h-6 w-6 text-yellow-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-yellow-800">
          Late Invoices Alert
        </h3>
      </div>
      <ul className="space-y-2">
        {lateInvoices.map((invoice) => (
          <li key={invoice.id} className="flex items-center text-yellow-700">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Invoice for{" "}
              <span className="font-medium">{invoice.customer}</span> is{" "}
              <span className="font-bold">{getDaysOverdue(invoice)} days</span>{" "}
              overdue
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LateInvoiceAlert;
