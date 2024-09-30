import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import InvoiceForm from "./components/invoice/InvoiceForm";
import InvoiceList from "./components/invoice/InvoiceList";
import EmailSender from "./components/invoice/EmailSender";
import StatusUpdater from "./components/invoice/StatusUpdater";
import LateInvoiceAlert from "./components/invoice/LateInvoiceAlert";

const App: React.FC = () => {
  const [editingInvoiceId, setEditingInvoiceId] = useState<string | undefined>(
    undefined
  );
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<
    string | undefined
  >(undefined);

  const handleEditInvoice = (id: string) => {
    setEditingInvoiceId(id);
    setSelectedInvoiceId(undefined);
  };

  const handleSelectInvoice = (id: string) => {
    setSelectedInvoiceId(id);
    setEditingInvoiceId(undefined);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-8 text-center">
            Invoicing App
          </h1>
          <LateInvoiceAlert />
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 space-y-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <InvoiceForm editingInvoiceId={editingInvoiceId} />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <InvoiceList
                  onEditInvoice={handleEditInvoice}
                  onSelectInvoice={handleSelectInvoice}
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              {selectedInvoiceId && (
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                  <EmailSender invoiceId={selectedInvoiceId} />
                  <StatusUpdater
                    invoiceId={selectedInvoiceId}
                    currentStatus={
                      store
                        .getState()
                        .invoice.invoices.find(
                          (inv) => inv.id === selectedInvoiceId
                        )?.status || "outstanding"
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
