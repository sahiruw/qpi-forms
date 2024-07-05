import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import Popup from "reactjs-popup";
import { FiImage, FiEdit } from "react-icons/fi";
import EmployeeForm from "./Form02";

const MachineRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const [filter, setFilter] = useState("all");
  const [visibleData, setVisibleData] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const [recordTOChangeStatus, setRecordTOChangeStatus] = useState({});
  const [recordToEdit, setRecordToEdit] = useState(null)

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [requests, filter]);

  const fetchRequests = async () => {
    setLoading(true);
    const requestsQuery = query(
      collection(db, "MachineRequests"),
      orderBy("createdAt", "desc"),
      limit(perPage)
    );
    const documentSnapshots = await getDocs(requestsQuery);
    const lastVisibleDocument =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastVisible(lastVisibleDocument);

    setRequests(
      documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Store document ID for updates
        // createdAt: doc.data().createdAt.toDate().toLocaleString(), // Convert Firestore Timestamp to Date
      }))
    );
    setLoading(false);
    if (documentSnapshots.docs.length < perPage) {
      setNoMoreData(true);
    }
  };

  const fetchMoreRequests = async () => {
    if (!lastVisible) return;
    setLoading(true);
    const moreRequestsQuery = query(
      collection(db, "MachineRequests"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(perPage)
    );
    const documentSnapshots = await getDocs(moreRequestsQuery);
    const lastVisibleDocument =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastVisible(lastVisibleDocument);

    setRequests((prevRequests) => [
      ...prevRequests,
      ...documentSnapshots.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        // createdAt: doc.data().createdAt.toDate().toLocaleString(),
      })),
    ]);
    setLoading(false);
    if (documentSnapshots.docs.length < perPage) {
      setNoMoreData(true);
    }
  };

  const applyFilter = () => {
    console.log(requests)
    if (filter === "all") {
      setVisibleData(requests);
    } else {
      setVisibleData(requests.filter((request) => request.status === filter));
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleStatusChange = async (id, status) => {
    setRecordTOChangeStatus({ id, status });
  };

  const changeStatus = async () => {
    if (recordTOChangeStatus) {
      const requestDoc = doc(db, "MachineRequests", recordTOChangeStatus.id);
      await updateDoc(requestDoc, { status: recordTOChangeStatus.status });
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === recordTOChangeStatus.id
            ? { ...request, status: recordTOChangeStatus.status }
            : request
        )
      );
    }

    setRecordTOChangeStatus({});
  };

  const openPopup = (imageUrl) => {
    console.log("Opening");
    setPopupImage(imageUrl);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  const openEditPop = () => {

  }

  return (
    <div className="p-2 md:p-4 mt-20 w-full h-full   flex flex-col items-center justify-center    md:place-self-center  text-navy_blue">
      <div className="w-full bg-white md:m-6 rounded-md p-4 md:p-8 ">
        <h2 className="text-2xl font-bold mb-5 text-center">Machine Requests</h2>
        <div className=" text-sm mb-4 justify-center">
          <button
            onClick={() => handleFilterChange("all")}
            className={`px-4 py-2 mx-2 my-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("pending")}
            className={`px-4 py-2 mx-2 rounded ${
              filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => handleFilterChange("approved")}
            className={`px-4 py-2 mx-2 rounded ${
              filter === "approved" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => handleFilterChange("rejected")}
            className={`px-4 py-2 mx-2 rounded ${
              filter === "rejected" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Rejected
          </button>
        </div>
        <div className="overflow-y-scroll overflow-x-scroll md:overflow-auto  mt-2">
          <table className="w-full table-auto overflow-scroll md:overflow-auto  text-left font-inter border-separate border-spacing-y-0 ">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Employee Number</th>
                <th className="px-4 py-2 border">Machine Number</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleData.map((request, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{request.employeeNumber}</td>
                  <td className="px-4 py-2 border">{request.machineNumber}</td>
                  <td className="px-4 py-2 border">{request.description}</td>
                  <td className="px-4 py-2 border">
                    <select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(request.id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <button className="flex items-center text-blue-500 hover:underline"
                    onClick={() => setRecordToEdit(request)}
                    >
                      <FiEdit className="mr-1" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-5">
          <button
            onClick={fetchMoreRequests}
            disabled={loading || noMoreData}
            className={`px-4 py-2 rounded ${
              loading || noMoreData ? "bg-gray-400" : "bg-blue-500 text-white"
            } disabled:opacity-50`}
          >
            {loading ? "Loading..." : noMoreData ? "No More Data" : "Load More"}
          </button>
        </div>

        

        <Popup
          position="center center"
          closeOnDocumentClick
          modal
          contentStyle={{
            border: "none",
            background: "none",
            width: "fit-content",
          }}
          open={recordTOChangeStatus.id ? true : false}
        >
          <div className=" bg-white shadow dark:bg-gray-700 m-0">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => setRecordTOChangeStatus({})}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to change the status?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-navy_blue-600 hover:bg-navy_blue-800 focus:ring-4 focus:outline-none focus:ring-navy_blue-300 dark:focus:ring-navy_blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={changeStatus}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setRecordTOChangeStatus({})}
              >
                No, cancel
              </button>
            </div>
          </div>
        </Popup>

        <Popup
            position="center center"
            closeOnDocumentClick
            modal
            contentStyle={{ border: "none", background: "none" , width:"fit-content"}}
            open={recordToEdit ? true: false}
            onClose={() => setRecordToEdit(null)}
          >
            <EmployeeForm
              setRecordToEdit={setRecordToEdit}
              record={recordToEdit}
              setRequests={setRequests}
              applyFilter={applyFilter}
            />
          </Popup>

      </div>
    </div>
  );
};

export default MachineRequestsTable;
