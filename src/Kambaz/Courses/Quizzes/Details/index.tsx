import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as quizClient from "../client";
import { useSelector } from "react-redux";

export default function Details() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [answers, setAnswers] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [maxAttempts, setMaxAttempts] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNewAttempt = async () => {
    let result = null;
    if (qid && currentUser._id) {
      result = await quizClient.newAttempt(qid, currentUser._id);
    } else {
      return;
    }
    if (result) {
      setMaxAttempts(false);
      navigate(`/kambaz/Courses/${cid}/Quizzes/${qid}/view`);
    } else {
      setMaxAttempts(true);
      return;
    }
  }

  const checkAvailableDate = () => {
    if (!quiz) return "Loading...";
    const currentDate = new Date();
    const availableDate = new Date(quiz.available);
    const untilDate = new Date(quiz.until);
    if (availableDate > currentDate) {
      return `Not available until ${availableDate.toDateString().split(' ').slice(1).join(' ')}`;
    }
    else if (untilDate < currentDate) {
      return `Closed`;
    }
    else {
      return "Begin Quiz";
    }
  };

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid) {
        const fetchedQuiz = await quizClient.getQuiz(qid);
        setQuiz(fetchedQuiz);
      }
    };
    const fetchAnswers = async () => {
      if (qid && currentUser._id) {
        const fetchedAnswers = await quizClient.getAnswers(qid, currentUser._id);
        setAnswers(fetchedAnswers);
      }
      setLoading(false);
    }
    fetchQuiz();
    fetchAnswers();
  }, [qid, currentUser._id]);

  const handleAccessCodeSubmit = () => {
    if (quiz && accessCode === quiz.access_code) {
      setIsAuthorized(true);
    } else {
      alert("Incorrect access code");
    }
  };

  const renderStudentView = () => {
    return (
      !isAuthorized && quiz?.access_code !== "" && answers === "" ? renderAccessCode() : (
        <div className="container m-0 fs-5 d-flex">
          <div className="row w-100">
            <div className="col-9 text-center">
              <div className="row w-100 text-center">
                <h1>{quiz?.title || "Loading..."}</h1><br />
                <p>{quiz?.description || ""}</p>
                <p>{quiz?.time_limit || 0} minutes</p>
                <p>Points: {quiz?.points || 0}</p>
                <p>{quiz?.number_of_attempts === 0 ?
                  `${answers?.attempt - 1 || 0}/Unlimited Attempts` :
                  `${answers?.attempt - 1 || 0}/${quiz?.number_of_attempts || 0} attempts`}</p>
                <button onClick={handleNewAttempt} className="btn btn-lg btn-danger border rounded-1 me-2">
                  {checkAvailableDate()}
                </button>
                {maxAttempts && <p>Quiz is closed</p>}
              </div>
            </div>
            <div className="col-3 text-center">
              {quiz?.show_answers ? (
                <>
                  <h3>Grade: {answers?.score || 0}</h3>
                  <a href={`#/kambaz/Courses/${cid}/Quizzes/${qid}/Graded`} className="btn btn-link">Graded Quiz</a>
                </>
              ) : (
                answers?.finished ? <h3>Quiz not graded</h3> : <h3>Quiz not finished</h3>
              )}
            </div>
          </div>
        </div>
      )
    );
  }

  const renderAccessCode = () => {
    return (
      <div className="container m-0 fs-5 d-flex justify-content-center">
        <div className="row w-50">
          <div className="col text-center">
            <h1>Enter Access Code</h1>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="form-control mb-3"
            />
            <button onClick={handleAccessCodeSubmit} className="btn btn-lg btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!quiz && !loading) {
    return <div className="container">Quiz not found</div>;
  }

  return (
    (currentUser.role === "STUDENT") ? renderStudentView() :
      <div className="w-100">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div className="d-flex justify-content-center">
              <a href={`#/kambaz/Courses/${cid}/Quizzes/${qid}/view`}>
                <button className="btn btn-lg btn-light border rounded-1 me-2">
                  Preview
                </button>
              </a>
              <a href={`#/kambaz/Courses/${cid}/Quizzes/${qid}/edit`}>
                <button className="btn btn-lg btn-light border rounded-1">
                  Edit
                </button>
              </a>
            </div>
            <br /><hr />
            <h1>{quiz?.title || "Loading..."}</h1><br />
            <div className="container m-0 fs-5">
              <div className="row">
                <p className="col col-3 text-end"><b>Quiz Description</b></p>
                <p className="col">{quiz?.description || ""}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Quiz Type</b></p>
                <p className="col">{quiz?.type || ""}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Points</b></p>
                <p className="col">{quiz?.points || 0}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Assignment Group</b></p>
                <p className="col">{quiz?.assignment_group || ""}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Shuffle Answers</b></p>
                <p className="col">{quiz?.shuffle_questions ? "Yes" : "No"}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Time Limit</b></p>
                <p className="col">{quiz?.time_limit || 0} minutes</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Multiple Attempts</b></p>
                <p className="col">{quiz?.multiple_attempts ? "Yes" : "No"}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Show Correct Answers</b></p>
                <p className="col">{quiz?.show_answers ? "Yes" : "No"}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>One Question at a Time</b></p>
                <p className="col">{quiz?.one_at_a_time ? "Yes" : "No"}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>WebcamRequired</b></p>
                <p className="col">{quiz?.webcam ? "Yes" : "No"}</p>
              </div>
              <div className="row">
                <p className="col col-3 text-end"><b>Lock Questions After Answering</b></p>
                <p className="col">{quiz?.lock_answers ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="container fs-5 m-0">
              <div className="row">
                <b className="col">Due</b>
                <b className="col">Available from</b>
                <b className="col">Until</b>
              </div>
              <hr />
              <div className="row">
                <p className="col">{quiz?.due || ""}</p>
                <p className="col">{quiz?.available || ""}</p>
                <p className="col">{quiz?.until || ""}</p>
              </div>
              <hr />
            </div>
          </>
        )}
      </div>
  );
}