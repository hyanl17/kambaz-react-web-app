import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { deleteQuiz } from "./reducer";
import * as quizClient from "./client";

export default function QuizControlButtons({ courseId, quizId, published }:
  { courseId: string; quizId: string; published: boolean }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteQuiz = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(quizId));
      quizClient.deleteQuiz(quizId);
    }
  };
  const handleEditQuiz = () => {
    navigate(`/kambaz/Courses/${courseId}/Quizzes/${quizId}/edit`);
  };
  const togglePublishStatus = async () => {
    await quizClient.updateQuiz(quizId, { published: !published });
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <span
        className="text-primary cursor-pointer" onClick={handleEditQuiz} title="Edit Quiz">
        <FaPencilAlt className="fs-5" />
      </span>
      <span
        className="text-danger cursor-pointer" onClick={handleDeleteQuiz} title="Delete Quiz">
        <FaTrash className="fs-5" />
      </span>
      <span
        className="cursor-pointer" onClick={togglePublishStatus} title={published ? "Unpublish quiz" : "Publish quiz"}>
        {published ? (
          <IoIosCheckmarkCircle className="fs-5 text-success" />
        ) : (
          <IoIosCloseCircle className="fs-5 text-danger" />
        )}
      </span>
    </div>
  );
}