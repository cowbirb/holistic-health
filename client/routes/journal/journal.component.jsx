import React, { useState, useContext } from "react";
import axios from "axios";

import { UserContext } from "../../context/user.context.jsx";
import JournalEntriesList from "../../components/journal-entries-list/journal-entries-list.component.jsx";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode);

const Journal = () => {
  const { currentUser, journals, setJournals } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [journalEntry, setJournalEntry] = useState({
    title: "",
    content: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJournalEntry({ ...journalEntry, [name]: value });
  };

  //   send the data to the server and save it to the database
  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
     const {data} = await axios.post(`/api/user/${currentUser._id}/journal`, {
        journalEntry: {
          title: journalEntry.title,
          content: journalEntry.content,
          image: file && file[0].file.name,
          image_type: file && file[0].file.type,
        },
      });
        setJournals([...journals, data]);
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  return (
    <>
      {/* a card centered with inputs for the journal in a dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Write your thoughts</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />

          <TextField
            autoFocus
            margin="dense"
            name="content"
            label="Content"
            placeholder="Write your thoughts here..."
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <FilePond
            files={file}
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={setFile}
            name="file"
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmission}>Save</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          margin: "auto",
          width: "50%",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Journal
            </Typography>
            <Typography variant="h5" component="div">
              Let out your thoughts and feelings...
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Don’t judge what you’re writing – just get it out! The goal is to
              clear your head and make room for new thoughts. Don’t try to force
              something brilliant just write how you feel.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClickOpen}>
              Start Writing
            </Button>
          </CardActions>
        </Card>
      </Box>
        <JournalEntriesList />
    </>
  );
};

export default Journal;
