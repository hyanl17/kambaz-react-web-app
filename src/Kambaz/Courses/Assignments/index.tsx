import { Button, ListGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Link } from "react-router-dom";
import { LuNotebookPen } from "react-icons/lu";

export default function Assignments() {
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

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-2">
              <AssignmentControlButtons />
              <BsGripVertical className="fs-5" />
              <LuNotebookPen className="me-2 fs-5" />
              <Link to="123" className="wd-assignment-link text-black" >
                A1 - ENV + HTML
              </Link>
              <span className="wd-assigment-info d-block mt-1 ps-5">
                <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
              </span>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-2">
              <AssignmentControlButtons />
              <BsGripVertical className="fs-5" />
              <LuNotebookPen className="me-2 fs-5" />
              <Link to="123" className="wd-assignment-link text-black" >
                A2 - CSS + BOOTSTRAP
              </Link>
              <span className="wd-assigment-info d-block mt-1 ps-5">
                <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
              </span>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-2">
              <AssignmentControlButtons />
              <BsGripVertical className="fs-5" />
              <LuNotebookPen className="me-2 fs-5" />
              <Link to="123" className="wd-assignment-link text-black" >
                A3 - JAVASCRIPT + REACT
              </Link>
              <span className="wd-assigment-info d-block mt-1 ps-5">
                <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
              </span>
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  )
}