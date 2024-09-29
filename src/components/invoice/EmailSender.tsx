import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface EmailSenderProps {
  invoiceId: string;
}

const EmailSender: React.FC<EmailSenderProps> = ({ invoiceId }) => {
  const [emailSent, setEmailSent] = useState(false);
  const invoice = useSelector((state: RootState) =>
    state.invoice.invoices.find((inv) => inv.id === invoiceId)
  );

  const handleSendEmail = () => {
    // Simulate email sending
    setTimeout(() => {
      setEmailSent(true);
      alert(`Email sent for invoice ${invoiceId}`);
    }, 1000);
  };

  if (!invoice) return null;

  return (
    <div>
      <h3>Send Invoice to {invoice.customer}</h3>
      <button onClick={handleSendEmail} disabled={emailSent}>
        {emailSent ? "Email Sent" : "Send Email"}
      </button>
    </div>
  );
};

export default EmailSender;
