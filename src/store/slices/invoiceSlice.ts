import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  customer: string;
  lineItems: LineItem[];
  notes: string;
  status: "paid" | "outstanding" | "late";
  dueDate?: string;
}

interface InvoiceState {
  invoices: Invoice[];
  currentInvoice: Invoice | null;
}

const initialState: InvoiceState = {
  invoices: [],
  currentInvoice: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoices.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
    },
    setCurrentInvoice: (state, action: PayloadAction<string | null>) => {
      state.currentInvoice = action.payload
        ? state.invoices.find((invoice) => invoice.id === action.payload) ||
          null
        : null;
    },
    updateInvoiceStatus: (
      state,
      action: PayloadAction<{ id: string; status: Invoice["status"] }>
    ) => {
      const invoice = state.invoices.find(
        (inv) => inv.id === action.payload.id
      );
      if (invoice) {
        invoice.status = action.payload.status;
      }
    },
  },
});

export const {
  addInvoice,
  updateInvoice,
  setCurrentInvoice,
  updateInvoiceStatus,
} = invoiceSlice.actions;
export default invoiceSlice.reducer;
