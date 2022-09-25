import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import { UserContext } from "../../context/user.context";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

const JournalEntryCard = ({ journalEntry, journalDate }) => {
    const { currentUser, setJournals, journals } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [journalEditedEntry, setJournalEditedEntry] = useState({
        title: "",
        content: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
        // get the id of the journal entry that was clicked
        setJournalEditedEntry({
            ...journalEntry,
            date:journalDate, 
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setJournalEditedEntry({ ...journalEditedEntry, [name]: value });
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        try {
            if(currentUser) {
             const {data} = await axios.put(`/api/user/${currentUser._id}/journal`, {journalEditedEntry});
                setJournals([...journals, data]);
            } else {
                console.log("no user");
            }
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            if(currentUser) {
           const {data} = await axios.delete(`/api/user/${currentUser._id}/journal`, {data: {journalEditedEntry: {
                ...journalEntry,
                date:journalDate,
            }}});
            setJournals([...journals, data]);
            } else {
                console.log("no user");
            }
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                name="title"
                value={journalEditedEntry.title}
                label="Title"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
            />
            <TextField
                autoFocus
                margin="dense"
                id="content"
                name="content"
                value={journalEditedEntry.content}
                label="Content"
                placeholder="Write your thoughts here..."
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                onChange={handleInputChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleEdit}>Save Edit</Button>
        </DialogActions>
    </Dialog>

            
        
      <Card
        key={journalEntry._id}
        sx={{ width: "300px", height: "250px", marginTop: "20px" }}
      >
        <CardContent>
          <Typography
            variant="h3"
            sx={{ fontSize: 16, fontWeight: "bold", mb: 3 }}
          >
            {journalEntry.title}
          </Typography>
          <Typography color="text.secondary">{journalEntry.content}</Typography>
        </CardContent>
        <CardActions sx={{ mt: 4 }}>
          <Button size="small" onClick={handleClickOpen}>Edit</Button>
          <Button size="small" onClick={handleDelete} >Delete</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default JournalEntryCard;
