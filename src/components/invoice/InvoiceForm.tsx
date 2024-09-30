import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addInvoice,
  Invoice,
  LineItem,
  updateInvoice,
} from "../../store/slices/invoiceSlice";
import { RootState } from "../../store";

interface InvoiceFormProps {
  editingInvoiceId?: string;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ editingInvoiceId }) => {
  const dispatch = useDispatch();
  const editingInvoice = useSelector((state: RootState) =>
    state.invoice.invoices.find((invoice) => invoice.id === editingInvoiceId)
  );
  const [customer, setCustomer] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingInvoice) {
      setCustomer(editingInvoice.customer);
      setLineItems(editingInvoice.lineItems);
      setNotes(editingInvoice.notes);
      setDueDate(editingInvoice.dueDate || "");
    }
  }, [editingInvoice]);

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: "", quantity: 0, rate: 0 },
    ]);
  };

  const handleLineItemChange = (
    index: number,
    field: keyof LineItem,
    value: string | number
  ) => {
    const updatedLineItems = lineItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setLineItems(updatedLineItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceData: Invoice = {
      id: editingInvoiceId || Date.now().toString(),
      customer,
      lineItems,
      notes,
      status: editingInvoice?.status || "outstanding",
      dueDate: dueDate || undefined,
    };

    if (editingInvoiceId) {
      dispatch(updateInvoice(invoiceData));
    } else {
      dispatch(addInvoice(invoiceData));
    }

    // Reset form
    setCustomer("");
    setLineItems([]);
    setNotes("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={customer}
        onChange={(e: any) => setCustomer(e.target.value)}
        placeholder="Customer Name"
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      />
      {lineItems.map((item, index) => (
        <div key={item.id}>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            value={item.description}
            onChange={(e) =>
              handleLineItemChange(index, "description", e.target.value)
            }
            placeholder="Description"
            required
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleLineItemChange(index, "quantity", Number(e.target.value))
            }
            placeholder="Quantity"
            required
          />
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            value={item.rate}
            onChange={(e) =>
              handleLineItemChange(index, "rate", Number(e.target.value))
            }
            placeholder="Rate"
            required
          />
        </div>
      ))}
      <button type="button" onClick={handleAddLineItem}>
        Add Line Item
      </button>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <button type="submit">
        {editingInvoiceId ? "Update Invoice" : "Create Invoice"}
      </button>
    </form>
  );
};

export default InvoiceForm;
