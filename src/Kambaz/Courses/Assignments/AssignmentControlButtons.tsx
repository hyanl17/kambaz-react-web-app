import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function AssignmentControlButtons({ assignmentId, deleteAssignment }: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void
}) {
  return (
    <div className="float-end me-2">
      <GreenCheckmark />
      <FaTrash className="text-danger" onClick={() => {
        const check = window.confirm(
          "Are you sure you want to delete this assignment?"
        );
        if (check) {
          deleteAssignment(assignmentId)
        }
      }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  )
}