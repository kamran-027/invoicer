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

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "outstanding":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "late":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Update Status
      </h3>
      <div className="relative">
        <select
          value={currentStatus}
          onChange={(e) =>
            handleStatusChange(e.target.value as Invoice["status"])
          }
          className={`block appearance-none w-full ${getStatusColor(
            currentStatus
          )} border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        >
          <option value="outstanding">Outstanding</option>
          <option value="paid">Paid</option>
          <option value="late">Late</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdater;
