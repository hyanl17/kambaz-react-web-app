import { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as questionClient from "./client";
import { setQuestions, addQuestion, deleteQuestion, updateQuestion } from "./reducer";

export default function Editor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionReducer);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [originalQuestion, setOriginalQuestion] = useState<any>(null);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const fetchQuestions = async () => {
    if (!qid) return;
    const questions = await questionClient.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };

  const handleAddQuestion = () => {
    const questionData = {
      type: "Multiple Choice",
      title: "New Question",
      question: "",
      choices: [""]
    };
    dispatch(addQuestion(questionData));
    const newQuestionId = new Date().getTime().toString();
    setEditingQuestionId(newQuestionId);
    setEditingQuestion({ _id: newQuestionId, ...questionData });
    setOriginalQuestion({ _id: newQuestionId, ...questionData });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setEditingQuestion((prev: any) => {
      if (prev) {
        const updatedQuestion = { ...prev, [name]: type === "checkbox" ? checked : value };
        dispatch(updateQuestion(updatedQuestion));
        return updatedQuestion;
      }
      return prev;
    });
  };

  const handleDescriptionChange = (value: string) => {
    setEditingQuestion((prev: any) => {
      if (prev) {
        const updatedQuestion = { ...prev, question: value };
        dispatch(updateQuestion(updatedQuestion));
        return updatedQuestion;
      }
      return prev;
    });
  };

  const handleChoiceInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (editingQuestion) {
      const newChoices = [...editingQuestion.choices];
      newChoices[index] = e.target.value;
      const updatedQuestion = { ...editingQuestion, choices: newChoices };
      setEditingQuestion(updatedQuestion);
      dispatch(updateQuestion(updatedQuestion));
    }
  };

  const handleRadioChange = (_e: ChangeEvent<HTMLInputElement>, choice: string) => {
    if (editingQuestion) {
      const updatedQuestion = { ...editingQuestion, answer: choice };
      setEditingQuestion(updatedQuestion);
      dispatch(updateQuestion(updatedQuestion));
    }
  };

  const handleDeleteChoice = (choiceIndex: number) => {
    if (editingQuestion) {
      const newChoices = editingQuestion.choices.filter((_: any, index: any) => index !== choiceIndex);
      const updatedQuestion = { ...editingQuestion, choices: newChoices };
      setEditingQuestion(updatedQuestion);
      dispatch(updateQuestion(updatedQuestion));
    }
  };

  const handleAddChoice = () => {
    if (editingQuestion) {
      const newChoices = [...editingQuestion.choices, ""];
      const updatedQuestion = { ...editingQuestion, choices: newChoices };
      setEditingQuestion(updatedQuestion);
      dispatch(updateQuestion(updatedQuestion));
    }
  };

  const handleSave = async () => {
    const existingQuestions = await questionClient.findQuestionsForQuiz(qid as string);

    const deletedQuestions = existingQuestions.filter(
      (existingQuestion: any) => !questions.find((question: any) => question._id === existingQuestion._id)
    );

    deletedQuestions.map(async (question: any) => {
      await questionClient.deleteQuestion(question._id);
    });

    questions.map(async (question: any) => {
      if (!existingQuestions.find((q: any) => q._id === question._id)) {
        const questionToSave = { ...question };
        delete questionToSave._id;
        await questionClient.createQuestion(qid as string, questionToSave);
      } else {
        await questionClient.updateQuestion(question._id, question);
      }
    });
    navigate(`/kambaz/Courses/${cid}/Quizzes`);
  }

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  return (
    <div className="wd-question-editor">
      <ul className="wd-question-list list-group mt-3">
        {questions.map((question: any) => (
          <li key={question._id} className="list-group-item mb-3 border border-dark rounded-1">
            <div className="d-flex justify-content-between align-items-center">
              {question.title}
              <div className="fs-5">
                <FaPencilAlt className="text-primary me-2"
                  onClick={() => {
                    setEditingQuestionId(editingQuestionId === question._id ? null : question._id);
                    setEditingQuestion(question);
                    setOriginalQuestion(question);
                  }} />
                <FaTrash className="text-danger"
                  onClick={() => { dispatch(deleteQuestion(question._id)) }} />
              </div>
            </div>
            {editingQuestionId === question._id && (
              <div className="mt-3">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="question-title"><b>Name</b></label>
                  <input
                    type="text" className="form-control" id="question-title" name="title"
                    value={question?.title || ""} onChange={handleInputChange} />
                </div>
                <div className="form-group mb-3 d-flex justify-content-between">
                  <div className="w-50">
                    <label className="form-label" htmlFor="question-type"><b>Question Type</b></label>
                    <select
                      className="form-control" id="question-type" name="type"
                      value={question?.type || ""} onChange={handleInputChange}>
                      <option value="Multiple Choice">Multiple Choice</option>
                      <option value="True/False">True/False</option>
                      <option value="Fill-in-the-Blank">Fill in the Blank</option>
                    </select>
                  </div>
                  <div className="w-25">
                    <label className="form-label" htmlFor="question-points"><b>Points</b></label>
                    <input
                      type="number" className="form-control" id="question-points" name="points"
                      value={question?.points || ""} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="question-description"><b>Question</b></label>
                  <ReactQuill
                    theme="snow"
                    value={question?.question || ""}
                    onChange={handleDescriptionChange}
                    modules={modules}
                    formats={formats}
                    className="bg-white"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label"><b>Potential Answers</b></label>
                  {editingQuestion?.type === "Multiple Choice" && editingQuestion.choices.map((choice: any, index: any) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text" className="form-control" placeholder="Answer" name="choices"
                        value={choice} onChange={(e) => handleChoiceInputChange(e, index)} />
                      <div className="input-group-text">
                        <input
                          type="radio" name="answer"
                          checked={choice === editingQuestion.answer} onChange={(e) => handleRadioChange(e, choice)}
                        />
                      </div>
                      <button
                        type="button" className="btn btn-danger"
                        onClick={() => handleDeleteChoice(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  {question?.type === "True/False" && (
                    <div>
                      <div className="form-check">
                        <input
                          id="wd-question-true-input" className="form-check-input" type="checkbox" name="answer"
                          checked={question.answer === "True"} onChange={(e) => handleRadioChange(e, "True")} />
                        <label className="form-check-label" htmlFor="wd-question-true-input">
                          True
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          id="wd-question-false-input" className="form-check-input" type="checkbox" name="answer"
                          checked={question.answer === "False"} onChange={(e) => handleRadioChange(e, "False")} />
                        <label className="form-check-label" htmlFor="wd-question-false-input">
                          False
                        </label>
                      </div>
                    </div>
                  )}
                  {question?.type === "Fill-in-the-Blank" && question.choices.map((choice: any, index: any) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text" className="form-control" placeholder="Correct Answer" value={choice}
                        name="choices" onChange={(e) => handleChoiceInputChange(e, index)} />
                      <button
                        type="button" className="btn btn-danger"
                        onClick={() => handleDeleteChoice(index)} >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  {(question?.type === "Multiple Choice" || question?.type === "Fill-in-the-Blank") && (
                    <a onClick={() => { handleAddChoice() }}
                      className="float-end text-danger text-decoration-none d-flex align-items-center"
                      style={{ cursor: "pointer" }}>
                      <FaPlus className="me-2" />
                      Add Another Answer
                    </a>
                  )}
                </div>
                <br /><hr />
                <div className="d-flex justify-content-start">
                  <button type="button" className="btn btn-light border texxt-secondary me-2"
                    onClick={() => {
                      dispatch(updateQuestion(originalQuestion));
                      setEditingQuestionId(null);
                    }}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger"
                    onClick={() => {
                      if (editingQuestion.type === "True/False") {
                        const newChoices = ["True", "False"];
                        const updatedQuestion = { ...editingQuestion, choices: newChoices };
                        dispatch(updateQuestion(updatedQuestion));
                      }
                      setEditingQuestionId(null);
                    }}>
                    Update Question
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="text-center mt-3">
        <button className="btn btn-lg btn-secondary" onClick={handleAddQuestion}>
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          New Question
        </button>
      </div>
      <hr />
      <div className="d-flex float-end">
        <Link to={`/kambaz/Courses/${cid}/Quizzes`}>
          <button className="btn btn-light border text-secondary mx-1">Cancel</button>
        </Link>
        <button type="button" className="btn btn-danger border border-dark mx-1"
          onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}