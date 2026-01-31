"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Record = {
  date: string;
  checkIn: string;
  checkOut: string | null;
};

export default function HistoryPage() {
  const [records, setRecords] = useState<Record[]>([]);

  const loadRecords = () => {
    const data = JSON.parse(
      localStorage.getItem("attendanceRecords") || "[]"
    );
    setRecords(data);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleDelete = (index: number) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
    localStorage.setItem("attendanceRecords", JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    const record = records[index];
    const newCheckIn = prompt("Edit Check-In Time:", record.checkIn);
    const newCheckOut = prompt("Edit Check-Out Time:", record.checkOut ?? "");

    if (newCheckIn !== null && newCheckOut !== null) {
      const updated = [...records];
      updated[index] = {
        ...updated[index],
        checkIn: newCheckIn,
        checkOut: newCheckOut || null,
      };
      setRecords(updated);
      localStorage.setItem("attendanceRecords", JSON.stringify(updated));
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Attendance History</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back
          </Link>
        </div>

        {records.length === 0 ? (
          <p className="text-gray-500 text-center">
            No attendance records found
          </p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Check In</th>
                <th className="border p-2">Check Out</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{r.date}</td>
                  <td className="border p-2 text-green-600">{r.checkIn}</td>
                  <td className="border p-2 text-red-600">{r.checkOut ?? "-"}</td>
                  <td className="border p-2 flex justify-center gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded"
                      onClick={() => handleEdit(i)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
