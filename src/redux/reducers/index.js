import { combineReducers } from "redux";

import movieListReducer from "./movieList.reducer";

const rootReducer = combineReducers({
    movieListReducer
});

export default rootReducer;