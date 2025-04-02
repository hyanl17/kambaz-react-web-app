import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    addEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: uuidv4(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    deleteEnrollment: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === user && e.course === course));
    },
  },
});
export const { addEnrollment, deleteEnrollment, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;