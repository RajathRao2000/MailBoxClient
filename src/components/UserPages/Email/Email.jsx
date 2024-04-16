import React, { useEffect } from "react";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import keys from "../../../keys";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import classes from "./Email.module.css";

const Email = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());

    setConvertedContent(html);
  }, [editorState]);
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const res = await fetch(`${keys.firebaseUrl}.json`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: e.target.to.value,
          subject: e.target.subject.value,
          emailBody: createMarkup(convertedContent),
        }),
      });
      let data = await res.json();
      console.log("data", data);
      if (data.error) {
        alert(data.error.message);
      } else {

      }
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(convertedContent);
  return (
    <div className="email-box">
      <div className={classes["email-editor"]}>
        <Form className={`{classes["signin-form"]}`} onSubmit={sendEmail}>
          <Form.Group md="4" controlId="validationCustomUsername">
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">To:</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="E-mail"
                aria-describedby="inputGroupPrepend"
                name="to"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group md="4" controlId="validationCustomUsername">
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">Subject:</InputGroup.Text>
              <Form.Control
                name="subject"
                type="text"
                placeholder="Subject of the E-mail"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Editor
            editorState={editorState}
            toolbarClassName={classes["toolbar"]}
            wrapperClassName={classes["wrapper"]}
            editorClassName={classes["editor"]}
            onEditorStateChange={setEditorState}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      {console.log(createMarkup(convertedContent))}
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
};

export default Email;
