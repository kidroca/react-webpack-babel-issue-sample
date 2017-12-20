import { combineReducers } from 'redux';
import app from './app.reducer';
import temp from './temp.reducer';

const combinedReducers = combineReducers({
  app,
  temp
});

export default combinedReducers;
