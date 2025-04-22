import { useState } from "react";
import DetailsEditor from "./Editor";
import QuestionEditor from "../Questions/Editor";
import { useSelector } from "react-redux";

export default function Tabs() {
  const { questions } = useSelector((state: any) => state.questionReducer);
  const [activeTab, setActiveTab] = useState("details");

  const totalPoints = () => {
    let total = 0;
    questions.forEach((question: any) => {
      total += Number(question.points) || 0;
    });
    return total;
  };

  return (
    <div id="wd-details-tabs" className=" w-100 ms-2">
      <h4 className="text-end">Points: {totalPoints()}</h4>
      <hr />
      <ul className="nav nav-tabs mb-2">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "details" ? "active" : "text-danger"}`}
            data-bs-toggle="tab"
            onClick={() => setActiveTab("details")}>
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === "questions" ? "active" : "text-danger"}`}
            data-bs-toggle="tab"
            onClick={() => setActiveTab("questions")}>
            Questions
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === "details" && <DetailsEditor />}
        {activeTab === "questions" && <QuestionEditor />}
      </div>
    </div>
  );
}