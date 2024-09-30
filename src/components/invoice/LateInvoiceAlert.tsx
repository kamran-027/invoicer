import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { isInvoiceLate, getDaysOverdue } from "../../utils/InvoiceUtils";

const LateInvoiceAlert: React.FC = () => {
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const lateInvoices = invoices.filter(isInvoiceLate);

  if (lateInvoices.length === 0) return null;

  return (
    <div
      // style={{ backgroundColor: "#ffcccc", padding: "10px", margin: "10px 0" }}
      className="bg-yellow-300 p-2"
    >
      <h3>Late Invoices Alert</h3>
      <ul>
        {lateInvoices.map((invoice) => (
          <li key={invoice.id}>
            Invoice for {invoice.customer} is {getDaysOverdue(invoice)} days
            overdue
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LateInvoiceAlert;
