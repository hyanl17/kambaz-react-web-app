import { Form, FormControl, Button } from "react-bootstrap";
import { useParams } from 'react-router';
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignment = db.assignments.find((assignment) => assignment._id === aid);

  return (
    <div id="wd-assignments-editor">
      <Form className="fs-5">
        <Form.Group id="wd-name" className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <input type="text" className="form-control" value={assignment?.title} />
        </Form.Group>
      </Form>

      <FormControl id="wd-description" className="mb-3" as="textarea">
        <input type="text" className="form-control" value={assignment?.description} />
      </FormControl>

      <Form.Group id="wd-points" className="mb-3 d-flex">
        <Form.Label className="me-2 mt-2 w-50 text-end">
          Points
        </Form.Label>
        <input type="number" className="form-control" placeholder="100" />
      </Form.Group>

      <Form.Group id="wd-group" className="mb-3 d-flex">
        <Form.Label className="me-3 mt-2 w-50 text-end">
          Assignment Group
        </Form.Label>
        <Form.Select>
          <option value="1">ASSIGNMENTS</option>
          <option value="2">QUIZZES</option>
        </Form.Select>
      </Form.Group>

      <Form.Group id="wd-display-grade-as" className="mb-3 d-flex">
        <Form.Label className="me-3 mt-2 w-50 text-end">
          Display Grade as
        </Form.Label>
        <Form.Select>
          <option value="1">Percentage</option>
          <option value="2">Letter Grade</option>
        </Form.Select>
      </Form.Group>

      <Form.Group id="wd-submission-type" className="mb-3 d-flex">
        <Form.Label className="me-3 mt-2 w-50 text-end">
          Submission Type
        </Form.Label>
        <Form.Group id="wd-online-entry-options" className="mb-3 p-3 w-100 border">
          <Form.Select>
            <option value="1">Online</option>
            <option value="2">In Person</option>
          </Form.Select>
          <Form.Label className="me-3 mt-3">
            <b>Online Entry Options</b>
          </Form.Label>
          <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
          <Form.Check type="checkbox" label="Website URL" id="wd-website-url" />
          <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" />
          <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" />
          <Form.Check type="checkbox" label="File Upload" id="wd-file-upload" />
        </Form.Group>
      </Form.Group>

      <Form.Group id="wd-assign" className="mb-3 d-flex">
        <Form.Label className="me-3 mt-2 w-50 text-end">
          Assign
        </Form.Label>
        <Form.Group id="wd-assign-to" className="mb-3 p-3 w-100 border">
          <Form.Label className="me-3">
            <b>Assign to</b>
          </Form.Label>
          <Form.Control type="text" placeholder="Everyone" />
          <Form.Group id="wd-due-date" className="mt-2">
            <Form.Label>
              <b>Due</b>
            </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mt-2 d-flex justify-content-end">
            <Form.Group id="wd-available-from" className="w-50">
              <Form.Label>
                <b>Available From</b>
              </Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group id="wd-available-until" className="ms-2 w-50">
              <Form.Label className="me-2">
                <b>Until</b>
              </Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form.Group>
        </Form.Group>
      </Form.Group>

      <hr />
      <Form.Group className="d-flex justify-content-end">
        <Button id="wd-cancel" variant="secondary" className="me-2">
          Cancel
        </Button>
        <Button id="wd-save" variant="danger" className="text-white">
          Save
        </Button>
      </Form.Group>
    </div>
  )
}