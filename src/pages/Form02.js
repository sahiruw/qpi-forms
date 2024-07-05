import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const EmployeeForm2 = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validateForm = () => {
    if (!employeeNumber || !machineNumber || !description ) {
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
      setError("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-20 md:mt-24 mx-auto p-6 bg-white rounded-lg shadow w-11/12"
    >
      <h2 className="text-3xl mb-4 font-bold text-navy_blue">Submit Request</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <div className="mb-4 md:w-1/3">
        <label className="block text-sm font-bold mb-2">Employee Number</label>
        <input
          type="text"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        <div className="mb-4 md:w-1/3">
          <label className="block text-sm font-bold mb-2">Machine Number</label>
          <input
            type="text"
            value={machineNumber}
            onChange={(e) => setMachineNumber(e.target.value)}
            className="w-full p-2 border rounded"
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
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default EmployeeForm2;
