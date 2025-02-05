import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <Form>
        <Form.Group>
          <Form.Label className="fs-3">
            Profile
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control id="wd-username" className="mb-2" defaultValue="alice" type="text" />
          <Form.Control id="wd-password" className="mb-2" defaultValue="123" type="number" />
          <Form.Control id="wd-firstname" className="mb-2" defaultValue="Alice" type="text" />
          <Form.Control id="wd-lastname" className="mb-2" defaultValue="Wonderland" type="text" />
          <Form.Control id="wd-dob" className="mb-2" defaultValue="2000-01-01" type="date" />
          <Form.Control id="wd-email" className="mb-2" defaultValue="alice@wonderland" type="email" />
          <Form.Control id="wd-role" className="mb-2" defaultValue="User" type="text">
          </Form.Control>
          <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100 mb-2" >
            Sign out
          </Link>
        </Form.Group>
      </Form>
    </div>
  )
}