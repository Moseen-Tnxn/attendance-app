"use client";

import { useState } from "react";
// 1. useRouter ko import karein
import { useRouter } from "next/navigation"; 
import { useEffect } from "react";



export default function HomePage() {
  const router = useRouter(); // 2. Router instance initialize karein
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

const getRecords = () => {
  return JSON.parse(localStorage.getItem("attendanceRecords") || "[]");
};

const saveRecords = (records: any[]) => {
  localStorage.setItem("attendanceRecords", JSON.stringify(records));
};

useEffect(() => {
  const today = getTodayDate();
  const records = getRecords();
  const todayRecord = records.find((r: any) => r.date === today);

  if (todayRecord) {
    setCheckInTime(todayRecord.checkIn);
    setCheckOutTime(todayRecord.checkOut);
    setCheckedIn(!!todayRecord.checkIn && !todayRecord.checkOut);
  }
}, []);

const handleCheckIn = () => {
  const time = new Date().toLocaleTimeString();
  const today = getTodayDate();

  const records = getRecords();

  // agar aaj ka record already nahi hai
  if (!records.find((r: any) => r.date === today)) {
    records.push({
      date: today,
      checkIn: time,
      checkOut: null,
    });
  }

  saveRecords(records);
  setCheckedIn(true);
  setCheckInTime(time);
};



const handleCheckOut = () => {
  const time = new Date().toLocaleTimeString();
  const today = getTodayDate();

  const records = getRecords();
  const todayRecord = records.find((r: any) => r.date === today);

  if (todayRecord) {
    todayRecord.checkOut = time;
  }

  saveRecords(records);
  setCheckedIn(false);
  setCheckOutTime(time);
};



  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Attendance Tracker
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Check in when you arrive, check out when you leave
        </p>

        {/* Status Section */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-center">
          {!checkedIn && !checkInTime && (
            <p className="font-semibold text-gray-700">Not checked in yet</p>
          )}
          {checkedIn && (
            <p className="font-semibold text-green-600">Checked in at {checkInTime}</p>
          )}
          {checkOutTime && !checkedIn && (
            <p className="font-semibold text-red-600">Checked out at {checkOutTime}</p>
          )}
        </div>

        {/* Main Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleCheckIn}
            disabled={checkedIn}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition"
          >
            Check In
          </button>

          <button
            onClick={handleCheckOut}
            disabled={!checkedIn}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition"
          >
            Check Out
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* 3. Redirect Button */}
        <button
          onClick={() => router.push("/history")} // Yahan apna path likhein
          className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2"
        >
          View Attendance History →
        </button>
      </div>
    </main>
  );
}