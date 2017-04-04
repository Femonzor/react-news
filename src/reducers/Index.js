import { combineReducers } from "redux";
import nav from "./SubjectsReducer";
import pageData from "./SubjectDataReducer";
import detailData from "./DetailReducer";

const reducer = combineReducers({
    nav,
    pageData,
    detailData
});

export default reducer;
