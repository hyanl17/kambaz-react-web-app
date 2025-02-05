import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/CS.jpg" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/ACCT.webp" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">ACCT1234 Accounting</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Accounting & Reporting</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/BUSN.jpeg" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">BUSN1234 Business</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Leveraging AI for Business</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/CY.jpg" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CY1234 Cybersecurity</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Foundations of Cybersecurity</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/ECON.webp" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">ECON1234 Economy</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Principles of Economy</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/SOCL.jpg" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">SOCL1234 Sociology</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Introduction to Sociology</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/MKTG.webp" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">MKTG1234 Marketing</Card.Title>
                  <Card.Text  className="wd-dashboard-course-description">Introduction to Marketing</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}