import "./index.css";
import { Container } from "react-bootstrap";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIcons from "./ReactIcons";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";
import Dimensions from "./Dimensions";

export default function Lab2() {
  return (
    <Container>
      <div id="wd-lab2">
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <h3>Styling with the STYLE attribute</h3>
        <p>
          Style attribute allows configuring look and feel
          right on the element. Although it's very convenient
          it is considered bad practice and you should avoid
          using the style attribute
        </p>

        <div id="wd-css-id-selectors">
          <h3>ID selectors</h3>
          <p id="wd-id-selector-1">
            Instead of changing the look and feel of all the
            elements of the same name, e.g., P, we can refer
            to a specific element by its ID
          </p>
          <p id="wd-id-selector-2">
            Here's another paragraph using a different ID and
            a different look andfeel
          </p>
        </div>

        <div id="wd-css-class-selectors">
          <h3>Class selectors</h3>
          <p className="wd-class-selector">
            Instead of using IDs to refer to elements, you can
            use an element's CLASS attribute
          </p>
          <h4 className="wd-class-selector">
            This heading has same style as paragraph above
          </h4>
        </div>

        <div id="wd-css-document-structure">
          <div className="wd-selector-1">
            <h3>Document structure selectors</h3>
            <div className="wd-selector-2">
              Selectors can be combined to refer elements in particular places in
              the document
              <p className="wd-selector-3">
                This paragraph's red background is referenced as
                <br />
                .selector-2 .selector3
                <br />
                meaning the descendant of some ancestor.
                <br />
                <span className="wd-selector-4">
                  Whereas this span is a direct child of its parent
                </span>
                <br />
                You can combine these relationships to create specific styles
                depending on the document structure
              </p>
            </div>
          </div>
        </div>

        <br />
        <div id="wd-css-foreground-colors">
          <ForegroundColors />
        </div>

        <br />
        <div id="wd-css-background-colors">
          <BackgroundColors />
        </div>

        <br />
        <div id="wd-css-borders">
          <Borders />
        </div>

        <br />
        <div id="wd-css-paddings">
          <Padding />
        </div>

        <br />
        <div id="wd-css-margins">
          <Margins />
        </div>

        <br />
        <div id="wd-css-dimensions">
          <Dimensions />
        </div>

        <br />
        <div id="wd-css-positions">
          <Positions />
        </div>

        <br />
        <div id="wd-z-index">
          <Zindex />
        </div>

        <br />
        <div id="wd-float-divs">
          <Float />
        </div>

        <br />
        <div id="wd-css-grid-layout">
          <GridLayout />
        </div>

        <br />
        <div id="wd-css-flex">
          <Flex />
        </div>

        <br />
        <div id="wd-react-icons">
          <ReactIcons />
        </div>

        <br />
        <div id="wd-bs-grid">
          <BootstrapGrids />
        </div>

        <br />
        <div id="wd-screen-size-label">
          <ScreenSizeLabel />
        </div>

        <br />
        <div id="wd-bootstrap-tb">
          <BootstrapTables />
        </div>

        <br />
        <div id="wd-bootstrap-lists">
          <BootstrapLists />
        </div>

        <br />
        <div id="wd-bootstrap-form">
          <BootstrapForms />
        </div>

        <br />
        <div id="wd-bootstrap-nav">
          <BootstrapNavigation />
        </div>
      </div>
    </Container>
  )
}