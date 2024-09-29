import { Invoice } from "../store/slices/invoiceSlice";

export const isInvoiceLate = (invoice: Invoice): boolean => {
  if (!invoice.dueDate) return false;
  const dueDate = new Date(invoice.dueDate);
  const today = new Date();
  return today > dueDate && invoice.status !== "paid";
};

export const getDaysOverdue = (invoice: Invoice): number | null => {
  if (!invoice.dueDate) return null;
  const dueDate = new Date(invoice.dueDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - dueDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return today > dueDate ? diffDays : null;
};
