import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { FaBan } from "react-icons/fa";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </Dropdown.Item>

          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>

          <Dropdown.Item id="wd-publish-modules-only">
          <GreenCheckmark /> Publish modules only
          </Dropdown.Item>

          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
          <FaBan className="me-1 fs-5"/> Unpublish all modules and items
          </Dropdown.Item>

          <Dropdown.Item id="wd-unpublish-modules-only">
          <FaBan className="me-1 fs-5"/> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button
        id="wd-view-progress"
        variant="secondary"
        size="lg"
        className="me-1 float-end">
        View Progress
      </Button>
      <Button
        id="wd-collapse-all"
        variant="secondary"
        size="lg"
        className="me-1 float-end">
        Collapse All
      </Button>
    </div>
  )
}