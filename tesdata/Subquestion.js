import React, { useState } from "react";
import parse from "html-react-parser";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Scrollbars } from "react-custom-scrollbars-2";
import SubQuestionAnswerArea from "./SubQuestionAnswerArea";
import { purple } from "@mui/material/colors";

const questions = [
  {
    id: 1,
    text: "Why does a turmeric stain on white shirt is turned to red when it is washed with soap? ",
  },
  {
    id: 2,
    text: "Name the salt formed when hydrochloric acid reacts with sodium hydroxide solution (a base).  ",
    subquestions: [
      { subid: "2 a", subqntext: "Explain why the fish were dying? ", qtype: 'multichoice' },
      {
        subid: "2 b",
        subqntext:
          "If the factory waste is acidic in nature, how can it be neutralized?  ",
        qtype: 'essay'
      },
    ],
  },
  {
    id: 3,
    text: "Rosann observed that most of the fish in the pond of her village were gradually dying. She also observed that the wastes of a factory in their village are flowing into the pond which probably caused the fish to die.  ",
    subquestions: [
      { subid: "3 a", subqntext: "Explain why the fish were dying? ", qtype: 'shortanswer' },
      {
        subid: "3 b",
        subqntext:
          "If the factory waste is acidic in nature, how can it be neutralized?  ",
        qtype: 'truefalse'
      },
    ],
  },
  {
    id: 4,
    text: "Name one indicator which turns red on adding a base.  ",
  },
  {
    id: 5,
    text: "Name one indicator which turns red on adding an acid. ",
  },
];

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#634699",
  textTransform: "none",
  align: "left",
  borderColor: "#634699",
  display: "flex",
  justifyContent: "flex-start",

  "&:hover": {
    color: "#fff",
    backgroundColor: "#634699",
    borderColor: "#634699",
    //   textAlign:"left",
  },
}));
const Subquestion = (props) => {
  const [open, setOpen] = useState(false);
  const [questionData, setQuestionData] = useState([]);

  const HANDLE_CLICK_OPEN = () => {
    setOpen(true);
  };
  const HANDLE_CLOSE = (event) => {
   
    setOpen(false);
    const handleBackdropClick = () => {
        //these fail to keep the modal open
        event.stopPropagation();
        return false;
      };
  };
  return (
    <div>
      <Scrollbars style={{ height: 330 }}>
        {questions.map((qn, index) => (
          <>
            <ul>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontStyle: "regular",
                  color: "#634699",
                  fontSize: "16px",
                  lineHeight: "22.4px",
                  width:"50rem"
                }}
              >
                {qn.id}. &nbsp;&nbsp; {qn.text}
              </Typography>
            </ul>
            <ColorButton
              onClick={() => {
                setQuestionData(qn);
                HANDLE_CLICK_OPEN();
              }}
              sx={{ marginLeft: "3rem", width: "50vw" }}
              variant="outlined"
            >
              Please type your answer here...
            </ColorButton>
            <div style={{ marginLeft: "2rem" }}>
              {qn.subquestions &&
                qn.subquestions.map((sqn, sid) => (
                  <>
                    <ul>
                      <Typography
                        sx={{
                          fontWeight: 400,
                          fontStyle: "regular",
                          color: "#634699",
                          fontSize: "16px",
                          lineHeight: "22.4px",
                        }}
                      >
                        {sqn.subid}. &nbsp;&nbsp; {sqn.subqntext}
                      </Typography>
                    </ul>
                    <ColorButton
                      onClick={() => {
                        setQuestionData(sqn);
                        HANDLE_CLICK_OPEN();
                      }}
                      sx={{ marginLeft: "3rem", width: "48vw" }}
                      variant="outlined"
                    >
                      Please type your answer here...
                    </ColorButton>
                  </>
                ))}
            </div>
          </>
        ))}
        <SubQuestionAnswerArea onClose={HANDLE_CLOSE} open={open} questions={questionData} {...props} />
      </Scrollbars>
    </div>
  );
};

export default Subquestion;
