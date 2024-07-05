import React, { useEffect, useState } from "react";
import { db, store } from "../config/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EmployeeForm = ({ setRecordToEdit, record, setRequests , applyFilter}) => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (record) {
      setEmployeeNumber(record.employeeNumber);
      setMachineNumber(record.machineNumber);
      setDescription(record.description);
    }
  }, [record]);

  const validateForm = () => {
    if (
      !employeeNumber ||
      !machineNumber ||
      !description 
    ) {
      setError("All fields are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    if (record) {
      await updateData();
      applyFilter()
    } else {
      await addNew();
    }
  };

  const updateData = async () => {
    if (record) {
      let updatedData = {
        employeeNumber,
        machineNumber,
        description,
      };
      updatedData = {  ...updatedData }
      const requestDoc = doc(db, "MachineRequests", record?.id);
      await updateDoc(requestDoc, updatedData);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === record?.id ? {...request, ...updatedData } : request
        )
      );
    }

    applyFilter()
    setRecordToEdit(null);
  };

  const addNew = async () => {
    try {
      
      await addDoc(collection(db, "MachineRequests"), {
        employeeNumber,
        machineNumber,
        description,
        status: "pending",
        createdAt: new Date(),
      });

      setEmployeeNumber("");
      setMachineNumber("");
      setDescription("");
      setSuccess("Upload successful!");
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={"min-w-fit my-20 md:mt-24 mx-auto p-6 bg-white rounded-lg shadow w-11/12" + (record? "  border-navy_blue border-2 p-4": "")}
    >
      <h2 className="text-3xl mb-4 font-bold text-navy_blue">{record? "Edit" : "Submit"} Request</h2>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <div className="mb-4 md:w-1/3">
        <label className="block text-sm font-bold mb-2">Employee Number</label>
        <input
          type="text"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          className=" p-2 border rounded min-w-80"
        />
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        <div className="mb-4 md:w-1/3">
          <label className="block text-sm font-bold mb-2">Machine Number</label>
          <input
            type="text"
            value={machineNumber}
            onChange={(e) => setMachineNumber(e.target.value)}
            className="w-full p-2 border rounded  min-w-80"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
      </div>


      <button
        type="submit"
        className="bg-navy_blue text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {!record
          ? loading
            ? "Submitting..."
            : "Submit"
          : loading
          ? "Updating..."
          : "Update"}
      </button>

      {record && (
        <button
        type="submit"
        className="bg-navy_blue/60 text-white py-2 px-4 rounded ml-4"
        disabled={loading}
        onClick={() => setRecordToEdit(null)}
      >Cancel</button>
      )}
    </form>
  );
};

export default EmployeeForm;
