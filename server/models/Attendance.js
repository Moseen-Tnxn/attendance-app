import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
