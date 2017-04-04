import * as actionTypes from "../constants/ActionTypes";
import IndexReducer from "./IndexReducer";
import InfosReducer from "./InfosReducer";
import PicInfosReducer from "./PicInfosReducer";

const initState = {
};

export default function SubjectDataReducer(state = initState, action) {
    let data;
    switch (action.type) {
        case actionTypes.SUBJECT_DATA_GET:
            if (action.payload.type === 0) {
                data = { ...state, ...{
                    [action.payload.id]: IndexReducer(state[action.payload.id], action)
                } };
            } else if (action.payload.type === 1) {
                data = { ...state, ...{
                    [action.payload.id]: InfosReducer(state[action.payload.id], action)
                } };
            } else if (action.payload.type === 2) {
                data = { ...state, ...{
                    [action.payload.id]: PicInfosReducer(state[action.payload.id], action)
                } };
            }
            return data;
        case actionTypes.PIC_CAROUSEL_SWITCH:
            data = { ...state, ...{
                [action.payload.id]: IndexReducer(state[action.payload.id], action)
            } };
            return data;
        case actionTypes.REFRESH_STATUS_SET:
            data = { ...state, ...{
                [action.payload.id]: { ...state[action.payload.id], ...action.payload.data }
            } };
            return data;
        default:
            return state;
    }
}