import { Route, Routes, useParams, useLocation } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as usersClient from "./client"
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizDetailsTabs from "./Quizzes/Details/Tabs";
import QuizView from "./Quizzes/View";
import GradedQuiz from "./Quizzes/GradedQuiz";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);

  useEffect(() => {
    if (cid) {
      usersClient.findUsersForCourse(cid).then((students) => {
        setEnrolledStudents(students);
      });
    }
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}  &gt; {pathname.split("/")[4]} </h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/new" element={<QuizDetailsTabs />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/view" element={<QuizView />} />
            <Route path="Quizzes/:qid/edit" element={<div style={{ width: "700px" }}><QuizDetailsTabs /></div>} />
            <Route path="Quizzes/:qid/Graded" element={<GradedQuiz />} />
            <Route path="People" element={<PeopleTable users={enrolledStudents} />} />
          </Routes>
        </div></div>
    </div>
  )
}