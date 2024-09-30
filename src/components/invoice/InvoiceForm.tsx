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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!customer.trim()) {
      newErrors.customer = "Customer name is required";
    }

    if (lineItems.length === 0) {
      newErrors.lineItems = "At least one line item is required";
    } else {
      lineItems.forEach((item, index) => {
        if (!item.description.trim()) {
          newErrors[`lineItem${index}Description`] = "Description is required";
        }
        if (item.quantity <= 0) {
          newErrors[`lineItem${index}Quantity`] =
            "Quantity must be greater than 0";
        }
        if (item.rate <= 0) {
          newErrors[`lineItem${index}Rate`] = "Rate must be greater than 0";
        }
      });
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label
          htmlFor="customer"
          className="block text-sm font-medium text-gray-700"
        >
          Customer Name
        </label>
        <input
          id="customer"
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.customer ? "border-red-500" : ""
          }`}
          placeholder="Enter customer name"
        />
        {errors.customer && (
          <p className="mt-2 text-sm text-red-600">{errors.customer}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Items
        </label>
        {lineItems.map((item, index) => (
          <div
            key={item.id}
            className="space-y-4 mb-6 p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleLineItemChange(index, "description", e.target.value)
              }
              className={`block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base ${
                errors[`lineItem${index}Description`] ? "border-red-500" : ""
              }`}
              placeholder="Description"
            />
            {errors[`lineItem${index}Description`] && (
              <p className="mt-2 text-sm text-red-600">
                {errors[`lineItem${index}Description`]}
              </p>
            )}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleLineItemChange(
                      index,
                      "quantity",
                      Number(e.target.value)
                    )
                  }
                  className={`block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base ${
                    errors[`lineItem${index}Quantity`] ? "border-red-500" : ""
                  }`}
                  placeholder="Quantity"
                />
                {errors[`lineItem${index}Quantity`] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors[`lineItem${index}Quantity`]}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleLineItemChange(index, "rate", Number(e.target.value))
                  }
                  className={`block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base ${
                    errors[`lineItem${index}Rate`] ? "border-red-500" : ""
                  }`}
                  placeholder="Rate"
                />
                {errors[`lineItem${index}Rate`] && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors[`lineItem${index}Rate`]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddLineItem}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Line Item
        </button>
        {errors.lineItems && (
          <p className="mt-2 text-sm text-red-600">{errors.lineItems}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Add any additional notes"
        />
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.dueDate ? "border-red-500" : ""
          }`}
        />
        {errors.dueDate && (
          <p className="mt-2 text-sm text-red-600">{errors.dueDate}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingInvoiceId ? "Update Invoice" : "Create Invoice"}
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
