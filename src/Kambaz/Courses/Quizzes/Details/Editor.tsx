import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as quizClient from "../client";

export default function Editor() {
  const { cid, qid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [quiz, setQuiz] = useState<any>(qid ? null : {
    title: "",
    assigned_to: "",
    type: "Graded Quiz",
    points: 0,
    assignment_group: "QUIZZES",
    shuffle_questions: true,
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
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true); // Set loading true at the start
      if (qid) {
        const fetchedQuiz = await quizClient.getQuiz(qid);
        // Assumes getQuiz returns null or the quiz object if found,
        // or throws an error which will now bubble up.
        setQuiz(fetchedQuiz);
        setLoading(false); // Set loading false after fetch
      } else {
        // For a new quiz, initialize the default state if not already done
        // The initial useState call handles this, but you could reinforce here if needed.
        setLoading(false); // Set loading false for new quiz form
      }
    };
    fetchQuiz();
    // If fetchQuiz throws an error, it might leave loading=true
    // Consider adding .catch() to the fetchQuiz() call if you want to handle errors without try/catch
    // fetchQuiz().catch(error => { console.error(error); setLoading(false); });
  }, [qid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setQuiz((prev: any) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSaveQuiz = async (courseId: string) => {
    if (!quiz || !cid) return; // Added check for cid as well

    if (qid) {
      await quizClient.updateQuiz(qid, quiz); // Assumes updateQuiz handles errors or throws
      // Navigation after successful update
      if (quiz.published) {
        navigate(`/kambaz/Courses/${courseId}/Quizzes`);
      } else {
        // Decide where to go after saving an existing unpublished quiz
        // Option 1: Stay on the page (do nothing here)
        // Option 2: Go back to the list
        navigate(`/kambaz/Courses/${courseId}/Quizzes`);
        console.log("Quiz updated, navigating back to list.");
      }
    } else {
      const newQuiz = await quizClient.createQuiz(courseId, quiz); // Assumes createQuiz handles errors or throws
      const newQid = newQuiz?._id; // Get ID from response

      if (!newQid) {
        console.error("Quiz created but no ID returned.");
        // Handle this case - maybe navigate back to list or show error
        navigate(`/kambaz/Courses/${courseId}/Quizzes`);
        return;
      }

      // Navigation after successful creation
      if (quiz.published) {
        navigate(`/kambaz/Courses/${courseId}/Quizzes`);
      } else {
        // Navigate to the edit page of the NEWLY created quiz
        navigate(`/kambaz/Courses/${courseId}/Quizzes/${newQid}/edit`);
      }
    }
  };

  const handleSaveAndPublish = (courseId: string) => {
    if (!quiz) return;
    // Create a temporary quiz object with published set to true for the save operation
    const quizToSave = { ...quiz, published: true };

    // We need to update the state *if* we intend handleSaveQuiz to use the *updated* state.
    // However, it might be cleaner to just pass the modified object directly if the client allows,
    // or handle the state update *after* the save is confirmed.
    // Let's assume handleSaveQuiz uses the component's state 'quiz'.
    // So, update state first, then call handleSaveQuiz.
    setQuiz(quizToSave);

    // Now call handleSaveQuiz. It will use the 'quiz' state which now has published: true.
    // Need to ensure handleSaveQuiz correctly navigates when published is true (which it should).
    handleSaveQuiz(courseId);

    // Alternative: If handleSaveQuiz could take the object to save:
    // const quizToPublish = { ...quiz, published: true };
    // handleSaveQuiz(courseId, quizToPublish); // Modify handleSaveQuiz signature
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!quiz && qid) { // Only show "not found" if we were actually looking for a specific quiz (qid exists)
    return <div>Quiz not found or failed to load.</div>;
  }

  if (!quiz && !qid) { // Handle case where initial state for new quiz somehow fails (unlikely)
    return <div>Error initializing quiz form.</div>
  }


  // --- RENDER ---
  // Ensure quiz is not null before rendering the form
  // The checks above should handle loading/not found, so here quiz should be valid.
  return (
    <div id="wd-details-editor">
      {/* Quiz Name Input */}
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="wd-quiz-name">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="wd-quiz-name"
          placeholder="Quiz Name"
          name="name"
          value={quiz.name || ""}
          onChange={handleInputChange}
        />
      </div>
      {/* Quiz Instructions Textarea */}
      <div className="form-group mb-3"> {/* Added margin bottom */}
        <label className="form-label" htmlFor="wd-quiz-instructions">
          Quiz Instructions:
        </label>
        <textarea
          id="wd-quiz-instructions"
          name="instructions"
          className="form-control"
          rows={5}
          placeholder="Enter quiz instructions here..."
          value={quiz.instructions || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* Settings Grid Container */}
      <div className="container mt-3 px-0">
        {/* Quiz Type */}
        <div className="row form-group mb-3 align-items-center">
          <label className="col-md-4 col-lg-3 form-label text-md-end" htmlFor="wd-quiz-type">
            Quiz Type
          </label>
          <div className="col-md-8 col-lg-9">
            <select className="form-select" id="wd-quiz-type" name="type" value={quiz.type || "GRADED"} onChange={handleInputChange}>
              <option value="GRADED">Graded Quiz</option>
              <option value="PRACTICE">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </select>
          </div>
        </div>
        {/* Assignment Group */}
        <div className="row form-group mb-4 align-items-center">
          <label className="col-md-4 col-lg-3 form-label text-md-end" htmlFor="wd-quiz-assignment-group">
            Assignment Group
          </label>
          <div className="col-md-8 col-lg-9">
            <select className="form-select" id="wd-quiz-assignment-group" name="assignment_group" value={quiz.assignment_group || "QUIZZES"} onChange={handleInputChange}>
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </select>
          </div>
        </div>

        {/* --- Options Section (General) --- */}
        <div className="row form-group mb-3">
          <div className="col-md-4 col-lg-3"></div> {/* Spacer column */}
          <div className="col-md-8 col-lg-9">
            <b>Options</b>
            <div className="form-check mt-2"> {/* Reduced top margin */}
              <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" name="shuffle_answers" checked={quiz.shuffle_answers ?? true} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="wd-shuffle-answers">
                Shuffle Answers
              </label>
            </div>
            {/* Time Limit */}
            <div className="row mt-2 mb-3 align-items-center"> {/* Adjusted margins */}
              <div className="col-auto pe-2"> {/* Adjust padding */}
                <label className="form-label m-0" htmlFor="wd-time-limit-value">
                  Time Limit:
                </label>
              </div>
              <div className="col-auto">
                <input type="number" min="0" className="form-control" style={{ width: "80px" }} id="wd-time-limit-value" name="time_limit" value={quiz.time_limit ?? 20} onChange={handleInputChange} />
              </div>
              <div className="col-auto ps-1"> {/* Adjust padding */}
                <span className="align-middle">minutes</span>
              </div>
            </div>
            {/* Allow Multiple Attempts Checkbox (moved here for grouping) */}
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="wd-multiple-attempts" name="multiple_attempts" checked={quiz.multiple_attempts || false} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="wd-multiple-attempts">
                Allow Multiple Attempts
              </label>
            </div>
            {/* Number of Attempts Input (conditionally shown) */}
            {quiz.multiple_attempts && (
              <div className="mb-3 ps-4"> {/* Indent this section */}
                <label className="form-label" htmlFor="wd-number-of-attempts">
                  Attempts Allowed: <small>(0 for unlimited)</small>
                </label>
                <input type="number" min="0" className="form-control w-auto" id="wd-number-of-attempts" placeholder="1" name="number_of_attempts" value={quiz.number_of_attempts ?? 1} onChange={handleInputChange} />
              </div>
            )}
            {/* Show Correct Answers Checkbox */}
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="wd-show-correct-answers" name="show_answers" checked={quiz.show_answers || false} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="wd-show-correct-answers">
                Let Students See Their Quiz Responses <small>(Incorrect Questions Will Be Marked)</small>
              </label>
            </div>
            {/* Access Code Input */}
            <div className="mb-3 mt-3">
              <label className="form-label" htmlFor="wd-quiz-access-code">
                Require Access Code:
              </label>
              <input type="text" className="form-control w-auto"
                id="wd-quiz-access-code" placeholder="Optional Access Code" name="access_code" value={quiz.access_code || ""} onChange={handleInputChange} />
            </div>
          </div>
        </div>


        {/* --- Options Section (Restrictions) --- */}
        <div className="row form-group mb-3">
          <div className="col-md-4 col-lg-3"></div> {/* Spacer column */}
          <div className="col-md-8 col-lg-9">
            <b>Restrictions</b> {/* Optional heading */}
            <div className="form-check mt-2 mb-2">
              <input className="form-check-input" type="checkbox" id="wd-one-question-at-a-time" name="one_at_a_time" checked={quiz.one_at_a_time ?? true} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="wd-one-question-at-a-time">
                Show one question at a time
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="wd-lock-answers" name="lock_answers" checked={quiz.lock_answers || false} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="wd-lock-answers">
                Lock Questions After Answering
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="wd-webcam-required" name="web_cam" checked={quiz.web_cam || false} onChange={handleInputChange} />
              <label className="form-check-label" htmlFor="wd-webcam-required">
                Webcam Required <small>(Requires external proctoring setup)</small>
              </label>
            </div>
            {/* Add other restriction options here if needed */}
          </div>
        </div>

        {/* --- Assign Section --- */}
        <div className="row form-group mb-3">
          <label className="col-md-4 col-lg-3 form-label text-md-end">
            Assign
          </label>
          <div className="col-md-8 col-lg-9 border rounded p-3">
            <label className="form-label fw-bold" htmlFor="wd-assign-to">
              Assign to
            </label>
            <select name="assign_to" id="wd-assign-to" className="form-select my-2" value={quiz.assign_to || "EVERYONE"} onChange={handleInputChange}>
              <option value="EVERYONE">Everyone</option>
              <option value="HONORS">Honors Section</option>
            </select>

            <label className="form-label fw-bold mt-2" htmlFor="wd-due-date">
              Due
            </label>
            <input
              type="datetime-local"
              id="wd-due-date"
              className="form-control mb-3" name="due" value={quiz.due ? quiz.due.substring(0, 16) : ""} onChange={handleInputChange} />

            <div className="row">
              <div className="col-md-6 mb-2 mb-md-0">
                <label htmlFor="wd-available-date" className="form-label fw-bold">
                  Available From
                </label>
                <input
                  type="datetime-local"
                  id="wd-available-date"
                  className="form-control" name="available" value={quiz.available ? quiz.available.substring(0, 16) : ""} onChange={handleInputChange} />
              </div>
              <div className="col-md-6">
                <label htmlFor="wd-until-date" className="form-label fw-bold">
                  Until
                </label>
                <input
                  type="datetime-local"
                  id="wd-until-date"
                  className="form-control" name="until" value={quiz.until ? quiz.until.substring(0, 16) : ""} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>
      </div> {/* End container */}
      <hr />
      {/* Save and Cancel buttons */}
      <div className="d-flex justify-content-end mb-3">
        <button onClick={() => navigate(`/kambaz/Courses/${cid}/Quizzes`)} className="btn btn-light me-2">
          Cancel
        </button>
        <button onClick={() => cid && handleSaveQuiz(cid)} className="btn btn-secondary me-2">
          {qid ? "Save Changes" : "Save"}
        </button>
        <button onClick={() => cid && handleSaveAndPublish(cid)} className="btn btn-danger">
          {/* Adjust button text based on whether it's currently published or not */}
          {quiz.published ? "Save (Keep Published)" : "Save & Publish"}
        </button>
      </div>
    </div>
  );
}