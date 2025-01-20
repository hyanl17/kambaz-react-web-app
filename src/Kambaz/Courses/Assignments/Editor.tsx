export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3 id="wd-name">Assignment Name</h3>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online
        Submit a link to the landing page of
      </textarea>
      <br /> <br />

      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select defaultValue="ASSIGNMENTS" id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select defaultValue="Percentage" id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
            </select>
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select defaultValue="Online" id="wd-submission-type">
              <option value="Online">Online</option>
            </select>
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-online-entry-options">Online Entry Options</label>
          </td>
          <td>
            <input type="checkbox" name="check-online-entry" id="wd-chkbox-text-entry"/>
            <label htmlFor="wd-chkbox-text-entry">Text Entry</label> <br/>
            
            <input type="checkbox" name="check-online-entry" id="wd-chkbox-website-url"/>
            <label htmlFor="wd-chkbox-website-url">Website URL</label> <br/>

            <input type="checkbox" name="check-online-entry" id="wd-chkbox-media-recordings"/>
            <label htmlFor="wd-chkbox-media-recordings">Media Recordings</label> <br/>

            <input type="checkbox" name="check-online-entry" id="wd-chkbox-student-annotation"/>
            <label htmlFor="wd-chkbox-student-annotation">Student Annotation</label> <br/>

            <input type="checkbox" name="check-online-entry" id="wd-chkbox-file-uploads"/>
            <label htmlFor="wd-chkbox-file-uploads">File Uploads</label>
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign To</label>
          </td>
          <td>
            <input id="wd-assign-to" value={"Everyone"} />
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" value={"1/20/2025"} />
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available From</label>
          </td>
          <td>
            <input id="wd-available-from" value={"1/12/2025"} />
          </td>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input id="wd-available-until" value={"1/23/2025"} />
          </td>
        </tr> <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-cancel"></label>
            <button type="button">Cancel</button>
          </td>
          <td>
            <label htmlFor="wd-save"></label>
            <button type="button">Save</button>
          </td>
        </tr>
      </table>
    </div>
  )
}