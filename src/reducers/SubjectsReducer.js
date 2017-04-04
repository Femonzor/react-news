import * as actionTypes from "../constants/ActionTypes";

const initState = {
    subjects: [],
    selectId: 0,
    curIdx: -1,
    showMore: false
};

export default function SubjectsReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SUBJECT_LIST:
            return { ...state, ...action.payload };
        case actionTypes.SUBJECT_SWITCH_BY_ID:
            return { ...state, ...action.payload };
        case actionTypes.SUBJECT_SWITCH_BY_IDX:
            return { ...state, ...action.payload };
        case actionTypes.SUBJECT_SHOW_MORE:
            return { ...state, ...{
                showMore: action.payload.showMore
            } };
        default:
            return state;
    }
}