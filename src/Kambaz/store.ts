import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import enrollmentReducer from "./Courses/reducer";
import quizReducer from "./Courses/Quizzes/reducer";
import questionReducer from "./Courses/Quizzes/Questions/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentReducer,
    quizReducer,
    questionReducer,
  },
});

export default store;