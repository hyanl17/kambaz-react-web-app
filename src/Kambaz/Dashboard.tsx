import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleEnrollment } from "./Courses/reducer";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const dispatch = useDispatch();
  const isEnrolled = (courseId: string) =>
    enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId);
  const toggleEnrollmentView = () => setShowAllCourses(!showAllCourses);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      {currentUser.role === 'STUDENT' &&
        <Button className="btn btn-primary position-absolute top-0 end-0 m-3"
          onClick={toggleEnrollmentView}>
          Enrollments
        </Button>
      }
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.filter((course) => isEnrolled(course._id)).length})</h2> <hr />
      {currentUser.role === 'FACULTY' &&
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}> Add </button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5><br />
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      }
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) =>
              (showAllCourses ? true : isEnrolled(course._id)))
            .map((course) => (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link to={isEnrolled(course._id) ? `/Kambaz/Courses/${course._id}/Home` : "#"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => {
                      if (!isEnrolled(course._id)) {
                        e.preventDefault();
                        alert("You cannot access this course until you are enrolled.");
                      }
                    }} >
                    <Card.Img src={`${course.image}`} variant="top" width="100%" height={160} />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name} </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description} </Card.Text>
                      <Button variant="primary"> Go </Button>
                      {currentUser.role === 'STUDENT' &&
                        <Button
                          className={`btn float-end ${isEnrolled(course._id) ? "btn-danger" : "btn-success"}`}
                          onClick={() => dispatch(toggleEnrollment({ user: currentUser._id, course: course._id }))}
                        >
                          {isEnrolled(course._id) ? "Unenroll" : "Enroll"}
                        </Button>
                      }
                      {currentUser.role === 'FACULTY' &&
                        <>
                          <button onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }} className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                          </button>
                          <button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end">
                            Edit
                          </button>
                        </>
                      }
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  )
}