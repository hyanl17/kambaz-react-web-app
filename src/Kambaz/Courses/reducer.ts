import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleEnrollment: (state, action) => {
      const { user, course } = action.payload;
      const isEnrolled = state.enrollments.some(
        (e) => e.user === user && e.course === course
      );
      if (isEnrolled) {
        state.enrollments = state.enrollments.filter(
          (e) => !(e.user === user && e.course === course)
        );
      } else {
        state.enrollments.push({
          user: user,
          course: course,
          _id: uuidv4(),
        });
      }
    },
  },
})

export const { toggleEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;