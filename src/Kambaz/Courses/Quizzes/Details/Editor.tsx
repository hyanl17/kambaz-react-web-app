import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as quizClient from "../client";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../reducer";

export default function Editor() {
  const { cid, qid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<any>({
    title: "Title",
    description: "",
    assigned_to: "EVERYONE",
    type: "GRADED",
    points: 0,
    assignment_group: "QUIZZES",
    shuffle_answers: true,
    time_limit: 20,
    multiple_attempts: false,
    number_of_attempts: 1,
    show_answers: false,
    access_code: "",
    one_at_a_time: true,
    webcam: false,
    lock_after_answering: false,
    due: "",
    available: "",
    until: "",
    published: false,
    number_of_questions: 0,
    show_responses: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      if (qid) {
        const fetchedQuiz = await quizClient.getQuiz(qid);
        setQuiz(fetchedQuiz);
      }
      setLoading(false);
    };
    fetchQuiz();
  }, [qid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { title, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setQuiz((prev: any) => ({
      ...prev,
      [title]: finalValue,
    }));
  };

  const handleSaveQuiz = async (courseId: string) => {
    if (qid) {
      await quizClient.updateQuiz(qid, quiz);
      dispatch(updateQuiz(qid));
    } else {
      await quizClient.createQuiz(courseId, quiz);
    }
  };

  const handleSaveAndPublish = (courseId: string) => {
    const quizToSave = { ...quiz, published: true };
    setQuiz(quizToSave);
    handleSaveQuiz(courseId);
  };

  return (
    <div id="wd-details-editor">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="wd-quiz-title">
              Title
            </label>
            <input
              type="text" className="form-control" id="wd-quiz-title" placeholder="Quiz Title" name="title"
              value={quiz.title || ""} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="wd-quiz-description">
              Quiz description:
            </label>
            <ReactQuill
              id="wd-quiz-description"
              value={quiz.description || ""} onChange={(value) => setQuiz((prev: any) => ({ ...prev, description: value }))}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ],
              }}
            />
          </div>
          <div className="container mt-3 px-0">
            <div className="row form-group mb-3 align-items-center">
              <label className="col-md-4 col-lg-3 form-label text-md-end" htmlFor="wd-quiz-type">
                Quiz Type
              </label>
              <div className="col-md-8 col-lg-9">
                <select className="form-select" id="wd-quiz-type" name="type"
                  value={quiz.type || "GRADED"} onChange={handleInputChange}>
                  <option value="GRADED">Graded Quiz</option>
                  <option value="UNGRADED">Ungraded Quiz</option>
                  <option value="GRADED">Graded Survey</option>
                  <option value="UNGRADED">Ungraded Survey</option>
                </select>
              </div>
            </div>
            <div className="row form-group mb-4 align-items-center">
              <label className="col-md-4 col-lg-3 form-label text-md-end" htmlFor="wd-quiz-assignment-group">
                Assignment Group
              </label>
              <div className="col-md-8 col-lg-9">
                <select className="form-select" id="wd-quiz-assignment-group" name="assignment_group"
                  value={quiz.assignment_group || "QUIZZES"} onChange={handleInputChange}>
                  <option value="QUIZZES">Quizzes</option>
                  <option value="EXAMS">Exams</option>
                  <option value="ASSIGNMENTS">Assignments</option>
                  <option value="PROJECT">Project</option>
                </select>
              </div>
            </div>
            <div className="row form-group mb-3">
              <div className="col-md-4 col-lg-3"></div>
              <div className="col-md-8 col-lg-9">
                <b>Options</b>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" name="shuffle_answers"
                    checked={quiz.shuffle_answers ?? true} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-shuffle-answers">
                    Shuffle Answers
                  </label>
                </div>
                <div className="row mt-2 mb-3 align-items-center">
                  <div className="col-auto pe-2">
                    <label className="form-label m-0" htmlFor="wd-time-limit-value">
                      Time Limit:
                    </label>
                  </div>
                  <div className="col-auto">
                    <input type="number" min="0" className="form-control" style={{ width: "80px" }} id="wd-time-limit-value" name="time_limit"
                      value={quiz.time_limit ?? 20} onChange={handleInputChange} />
                  </div>
                  <div className="col-auto ps-1">
                    <span className="align-middle">minutes</span>
                  </div>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="wd-multiple-attempts" name="multiple_attempts"
                    checked={quiz.multiple_attempts || false} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-multiple-attempts">
                    Allow Multiple Attempts
                  </label>
                </div>
                {quiz.multiple_attempts && (
                  <div className="mb-3 ps-4">
                    <label className="form-label" htmlFor="wd-number-of-attempts">
                      Attempts Allowed: <small>(0 for unlimited)</small>
                    </label>
                    <input type="number" min="0" className="form-control w-auto" id="wd-number-of-attempts" placeholder="1" name="number_of_attempts"
                      value={quiz.number_of_attempts ?? 1} onChange={handleInputChange} />
                  </div>
                )}
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="wd-show-correct-answers" name="show_answers"
                    checked={quiz.show_answers || false} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-show-correct-answers">
                    Let Students See Their Quiz Responses <small>(Incorrect Questions Will Be Marked)</small>
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="wd-show-responses" name="show_responses"
                    checked={quiz.show_responses || false} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-show-responses">
                    Show Responses
                  </label>
                </div>
                <div className="mb-3 mt-3">
                  <label className="form-label" htmlFor="wd-quiz-access-code">
                    Require Access Code:
                  </label>
                  <input type="text" className="form-control w-auto"
                    id="wd-quiz-access-code" placeholder="Optional Access Code" name="access_code"
                    value={quiz.access_code || ""} onChange={handleInputChange} />
                </div>
              </div>
            </div>
            <div className="row form-group mb-3">
              <div className="col-md-4 col-lg-3"></div>
              <div className="col-md-8 col-lg-9">
                <b>Restrictions</b>
                <div className="form-check mt-2 mb-2">
                  <input className="form-check-input" type="checkbox" id="wd-one-question-at-a-time" name="one_at_a_time"
                    checked={quiz.one_at_a_time ?? true} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-one-question-at-a-time">
                    Show one question at a time
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="wd-lock-after-answering" name="lock_after_answering"
                    checked={quiz.lock_after_answering || false} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-lock-after-answering">
                    Lock Questions After Answering
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" id="wd-webcam" name="webcam"
                    checked={quiz.webcam || false} onChange={handleInputChange} />
                  <label className="form-check-label" htmlFor="wd-webcam-required">
                    Webcam Required <small>(Requires external proctoring setup)</small>
                  </label>
                </div>
              </div>
            </div>
            <div className="row form-group mb-3">
              <label className="col-md-4 col-lg-3 form-label text-md-end">
                Assign
              </label>
              <div className="col-md-8 col-lg-9 border rounded p-3">
                <label className="form-label fw-bold" htmlFor="wd-assign-to">
                  Assign to
                </label>
                <select name="assigned_to" id="wd-assign-to" className="form-select my-2"
                  value={quiz.assigned_to || "EVERYONE"} onChange={handleInputChange}>
                  <option value="EVERYONE">Everyone</option>
                </select>

                <label className="form-label fw-bold mt-2" htmlFor="wd-due-date">
                  Due
                </label>
                <input
                  type="datetime-local" id="wd-due-date" className="form-control mb-3" name="due"
                  value={quiz.due ? quiz.due.substring(0, 16) : ""} onChange={handleInputChange} />
                <div className="row">
                  <div className="col-md-6 mb-2 mb-md-0">
                    <label htmlFor="wd-available-date" className="form-label fw-bold">
                      Available From
                    </label>
                    <input type="datetime-local" id="wd-available-date" className="form-control" name="available"
                      value={quiz.available ? quiz.available.substring(0, 16) : ""} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="wd-until-date" className="form-label fw-bold">
                      Until
                    </label>
                    <input
                      type="datetime-local" id="wd-until-date" className="form-control" name="until"
                      value={quiz.until ? quiz.until.substring(0, 16) : ""} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-end mb-3">
            <button
              onClick={() => navigate(`/kambaz/Courses/${cid}/Quizzes`)}
              className="btn btn-light me-2">
              Cancel
            </button>
            <button
              onClick={() => {
                if (cid) {
                  handleSaveQuiz(cid);
                  navigate(`/kambaz/Courses/${cid}/Quizzes`);
                }
              }}
              className="btn btn-secondary me-2">
              Save
            </button>
            <button
              onClick={() => {
                if (cid) {
                  handleSaveAndPublish(cid);
                  navigate(`/kambaz/Courses/${cid}/Quizzes`);
                }
              }}
              className="btn btn-danger">
              Save & Publish
            </button>
          </div>
        </>
      )}
    </div>
  );
}
