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
    <div style={{ marginTop: "20px" }}>
      <h2>Invoices</h2>
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Invoice for {invoice.customer}</h3>
          <p>Status: {invoice.status}</p>
          <p>
            Total: $
            {invoice.lineItems
              .reduce((sum, item) => sum + item.quantity * item.rate, 0)
              .toFixed(2)}
          </p>
          <button
            onClick={() => onEditInvoice(invoice.id)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </button>
          <button onClick={() => onSelectInvoice(invoice.id)}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
