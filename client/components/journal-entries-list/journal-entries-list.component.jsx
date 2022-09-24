import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/user.context.jsx";
import JournalEntryCard from "../journal-entry-card/journal-entry-card.component.jsx";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const JournalEntriesList = () => {
  const { currentUser, journals } = useContext(UserContext);
  const [journalEntries, setJournalEntries] = useState([]);
  


  //   wait for the current user to be set before making the request
  useEffect(() => {
    const fetchJournalEntries = async () => {
      const { data } = await axios.get(`/api/user/${currentUser._id}/journal`);
      setJournalEntries(data);
    };
    if (currentUser) { 
      fetchJournalEntries();
    }
  }, [currentUser, journals]);



  return (
    <>
      {journalEntries.map((journalEntry) => (
        <Box key={journalEntry.date} sx={{ width: "100%"}}>
          <h1>{journalEntry.date}</h1>
            <Grid  sx={{ flexGrow: 1 }} container spacing={2}>
                {journalEntry.entries.map((entry) => (
                    <Grid key={entry._id} item>
                        <JournalEntryCard key={entry._id} journalEntry={entry} journalDate={journalEntry.date} />
                    </Grid>
                ))}
            </Grid>
        </Box>
      ))}
    </>
  );
};

export default JournalEntriesList;
