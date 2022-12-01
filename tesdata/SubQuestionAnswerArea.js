import React from "react";
import { Button, Dialog, Card, Grid, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const USE_STYLES = makeStyles({});

const SubQuestionAnswerArea = (props) => {
  const classes = USE_STYLES();

  console.log('data', props.questions);

  return (
    <div>
      <Modal onClose={props.onClose} open={props.open} >
        <Grid container spacing={2} p={4} direction="column" 
          style={{ 
            backgroundColor: '#fff', 
            margin: 'auto',
            marginTop: '200px',
            borderRadius: '10px',
            height: '500px',
            padding: "5%",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            width: '50%'
          }} >
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column", width: "50%" , alignItems:"center"}}>
          <Typography
          variant="h2"
          sx={{
            fontWeight: 400,
            fontStyle: "regular",
            color: "#634699",
            fontSize: "16px",
            lineHeight: "22.4px",
          }}>
          {props.questions.subqntext}
          {/* qwerty */}
          </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={props.onClose}
              component="span"
              sx={{
                textTransform: "none",
                backgroundColor: "#ffffff",
                color: "#634699",
                padding: "5px 40px",
                "&:hover": { backgroundColor: "#ffffff" },
              }}
            >
              Close
            </Button>
          </div>
          </Grid>
      </Modal>
    </div>
  );
};

export default SubQuestionAnswerArea;
