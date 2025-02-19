import { Link, useLocation, useParams } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";

export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div>
      <Navbar expand="lg" className="bg-transparent m-3">
        <Container fluid>
          <Navbar.Toggle aria-controls="wd-courses-navigation">
            <GiHamburgerMenu className="fs-2 text-danger" />
          </Navbar.Toggle>
          <Navbar.Collapse id="wd-courses-navigation" className="z-1">
            <Nav id="wd-courses-navigation" className="list-group wd fs-5 rounded-0 flex-column">
              {links.map((link) => (
                <Nav.Link
                  active={pathname.includes(link)}
                  className={`list-group-item border border-0 mb-2 ${pathname.includes(link)
                    ? "active"
                    : "text-danger"
                    }`}
                  as={Link}
                  to={`/Kambaz/Courses/${cid}/${link}`}>
                  {link}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}