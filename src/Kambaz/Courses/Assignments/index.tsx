import { Button, ListGroup } from "react-bootstrap";
import { FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <input id="wd-search-assignment" className="me-2" placeholder="Search..." />
        <Button id="wd-add-group" className="me-2" variant="secondary">
          <FaPlus className="me-2" />
          Group
        </Button>
        <Button id="wd-add-assignment" className="me-2" variant="danger">
          <FaPlus className="me-2" />
          Assignment
        </Button>
      </div>

      <ListGroup id="wd-assignments" className="rounded-0 mt-2">
        <ListGroup.Item id="wd-assignment-title" className="p-0 border-gray">
          <div className="align-items-center d-flex justify-content-between p-3 ps-2 bg-secondary">
            <span>
              <BsGripVertical className="fs-3" />
              <IoMdArrowDropdown className="me-2" />
              ASSIGNMENTS
            </span>
            <div className="d-flex align-items-center">
              <div className="border border-dark rounded-4 ps-2 pe-2">
                <span className="fs-6">40% of total</span>
              </div>
              <BsPlus className="fs-3" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup className="wd-assignment-list rounded-0">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroup.Item
              key={assignment._id}
              className="p-3 ps-2 d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LuNotebookPen className="me-2 fs-3 green-file" />
                <div className="flex-column ms-2">
                  <h3>{assignment.title}</h3>
                  <span style={{ color: "red" }}>Multiple Modules </span>
                  <span>
                    | <b>Not available until</b>{" "}
                    <span>
                      | <b>Not available until</b> May 6 at 12:00am | <b> Due</b> May 13 at 11:59pm | 100 pts
                    </span>
                    {assignment.pts} pts
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                {["FACULTY", "ADMIN"].includes(currentUser.role) && (
                  <>
                    <FaPencil
                      onClick={() =>
                        navigate(`/Kambaz/Courses/${assignment.course}/Assignments/${assignment._id}`)
                      }
                      className="text-primary me-3"
                    />
                    <FaTrash
                      className="text-danger me-2 mb-1"
                      onClick={() => dispatch(deleteAssignment(assignment._id))}
                    />
                  </>
                )}
                <AssignmentControlButtons />
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}