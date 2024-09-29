// src/App.tsx
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import InvoiceForm from "./components/invoice/InvoiceForm";
import InvoiceList from "./components/invoice/InvoiceList";
import EmailSender from "./components/invoice/EmailSender";
import StatusUpdater from "./components/invoice/StatusUpdater";
import LateInvoiceAlert from "./components/invoice/LateInvoiceAlert";
import styles from "./App.module.css";

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
      <div className={styles.app}>
        <h1>Invoicing App</h1>
        <LateInvoiceAlert />
        <div className={styles.contentArea}>
          <div className={styles.leftPanel}>
            <InvoiceForm editingInvoiceId={editingInvoiceId} />
            <InvoiceList
              onEditInvoice={handleEditInvoice}
              onSelectInvoice={handleSelectInvoice}
            />
          </div>
          <div className={styles.rightPanel}>
            {selectedInvoiceId && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
