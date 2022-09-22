import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {UserContext} from '../../context/user.context.jsx';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Rating,
  styled,
} from '@mui/material';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const EmotionModal = () => {
  const [open, setOpen] = useState(true);
  const [show, setShow] = useState(true);
  const [emotion, setEmotion] = useState('Neutral');
  const [journalEntry, setJournalEntry] = useState('');
  const { currentUser, isAuthenticated } = useContext(UserContext);

  const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
    },
  }));

  const Icons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Angry',
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Angry',
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Happy',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Happy',
    },
  };

  const IconContainer = (props) => {
    const { value, ...other } = props;
    return <span {...other}>{Icons[value].icon}</span>;
  };

  const handleClose = () => {
    setOpen(false);
    setShow(false);
  };

  const handleEmotionChange = (event) => {
    setEmotion(Icons[event.target.value].label);
  };

  const handleJournalEntryChange = (event) => {
    setJournalEntry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/api/user/${currentUser._id}/emotionOfTheDay`, {
        emotion: {
          emotion: emotion,
          emotion_summary: journalEntry,
        },
      });
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  // check if user is authenticatd and if show is true to open modal
  useEffect(() => {
    if (isAuthenticated && show) {
      setOpen(true);
    }
  }, [isAuthenticated, show]);

  //set show to false if user closes modal and clear the local storage after 24 hours to show modal again
  useEffect(() => {
    if (show === false) {
      localStorage.setItem('show', false);
      setTimeout(() => {
        localStorage.clear();
      }, 86400000);
    }
  }, [show]);

  useEffect(() => {
    if (localStorage.getItem('show') === 'false') {
      setShow(false);
    }
  }, []);

  return (
    <>
      {show && isAuthenticated ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>How are you feeling today?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select an emotion and write a short journal entry.
            </DialogContentText>
            <StyledRating
              name="highlight-selected-only"
              defaultValue={
                emotion === 'Very Angry'
                  ? 1
                  : emotion === 'Angry'
                    ? 2
                    : emotion === 'Neutral'
                      ? 3
                      : emotion === 'Happy'
                        ? 4
                        : 5
              }
              getLabelText={(value) => Icons[value].label}
              IconContainerComponent={IconContainer}
              onChange={handleEmotionChange}
              highlightSelectedOnly
            />

            <TextField
              autoFocus
              margin="dense"
              id="journalEntry"
              label="Journal Entry"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={journalEntry}
              onChange={handleJournalEntryChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Dismiss</Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

export default EmotionModal;
