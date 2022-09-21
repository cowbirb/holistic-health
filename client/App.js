import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.component.jsx';
import Home from './routes/home/home.component.jsx';
import Profile from './routes/profile/profile.component.jsx';
import Exercise from './routes/exercise/exercise.component.jsx';
import Meals from './routes/meals/meals.component.jsx';
import Meditation from './routes/meditation/meditation.component.jsx';
import Journal from './routes/journal/journal.component.jsx';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="exercise" element={<Exercise />} />
      <Route path="meals" element={<Meals />} />
      <Route path="meditation" element={<Meditation />} />
      <Route path="journal" element={<Journal />} />
    </Route>
  </Routes>
);

export default App;