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
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Send Invoice to {invoice.customer}
      </h3>
      <button
        onClick={handleSendEmail}
        disabled={emailSent}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-200 ease-in-out ${
          emailSent
            ? "bg-green-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        }`}
      >
        {emailSent ? "Email Sent" : "Send Email"}
      </button>
    </div>
  );
};

export default EmailSender;
