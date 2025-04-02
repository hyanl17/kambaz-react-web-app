import { Button, Card, Col, FormControl, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { enrollUser, unenrollUser } from './Account/reducer';
import * as client from './Account/client';

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  function isEnrolled(courseId: string) {
    return enrollments.some((e: any) => e.course === courseId);
  }
  const dispatch = useDispatch();
  const { currentUser, enrollments } = useSelector(
    (state: any) => state.accountReducer
  );
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
  const toggleEnrollmentView = () => setShowAllCourses(!showAllCourses);
  const enroll = async (courseId: string) => {
    await client.enrollUser(currentUser._id, courseId);
    dispatch(enrollUser(courseId));
  };

  const unenroll = async (courseId: string) => {
    await client.unenrollUser(currentUser._id, courseId);
    dispatch(unenrollUser(courseId));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === 'FACULTY' && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {' '}
              Add{' '}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <div className="d-flex flex-row justify-content-between">
        <h2 id="wd-dashboard-published">
          Published Courses ({courses.length})
        </h2>
        {currentUser.role === 'STUDENT' && (
          <button
            className={`btn float-end ${showAllCourses ? 'btn-secondary' : 'btn-primary'}`}
            id="wd-add-new-course-click"
            onClick={toggleEnrollmentView}
          >
            Enrollments
          </button>
        )}
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter(
              (course) =>
                showAllCourses ||
                enrollments.some(
                  (enrollment: any) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                )
            )
            .map((course: any) => (
              <Col className="wd-dashboard-course" style={{ width: '300px' }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src={course.image}
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{' '}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: '100px' }}
                      >
                        {course.description}{' '}
                      </Card.Text>
                      <Button variant="primary"> Go </Button>

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

                      {currentUser.role === 'STUDENT' && (
                        <button
                          onClick={async (event) => {
                            event.preventDefault();
                            if (isEnrolled(course._id)) {
                              await unenroll(course._id);
                            } else {
                              await enroll(course._id);
                            }
                          }}
                          className={`btn float-end me-2 ${isEnrolled(course._id) ? 'btn-warning' : 'btn-success'}`}
                          id="wd-enroll-course-click"
                        >
                          {`${isEnrolled(course._id) ? 'Enroll' : 'Unenroll'}`}
                        </button>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}