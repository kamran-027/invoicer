import React from "react";
import { useDispatch } from "react-redux";
import { updateInvoiceStatus, Invoice } from "../../store/slices/invoiceSlice";

interface StatusUpdaterProps {
  invoiceId: string;
  currentStatus: Invoice["status"];
}

const StatusUpdater: React.FC<StatusUpdaterProps> = ({
  invoiceId,
  currentStatus,
}) => {
  const dispatch = useDispatch();

  const handleStatusChange = (newStatus: Invoice["status"]) => {
    dispatch(updateInvoiceStatus({ id: invoiceId, status: newStatus }));
  };

  return (
    <div>
      <h3>Update Status</h3>
      <select
        value={currentStatus}
        onChange={(e) =>
          handleStatusChange(e.target.value as Invoice["status"])
        }
      >
        <option value="outstanding">Outstanding</option>
        <option value="paid">Paid</option>
        <option value="late">Late</option>
      </select>
    </div>
  );
};

export default StatusUpdater;
