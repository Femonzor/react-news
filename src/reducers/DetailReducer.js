import * as actionTypes from "../constants/ActionTypes";
import InfoReducer from "./InfoReducer";
import PicInfoReducer from "./PicInfoReducer";

const initState = {
    show: false,
    dataId: null,
    subjectName: "",
    items: {}
};

export default function DetailReducer(state = initState, action) {
    let data;
    switch (action.type) {
        case actionTypes.DETAIL_SHOW:
            return { ...state, ...{
                show: action.payload.show,
                subjectName: action.payload.subjectName,
                dataId: action.payload.dataId
            } };
        case actionTypes.DETAIL_HIDE:
            return { ...state, ...{
                show: action.payload.show
            } };
        case actionTypes.DETAIL_RESET:
            return { ...state, ...{
                subjectName: action.payload.subjectName,
                dataId: action.payload.dataId
            } };
        case actionTypes.DETAIL_INFO_GET:
            data = { ...state, ...{
                items: { ...state.items, ...{
                    [action.payload.dataId]: InfoReducer(state[action.payload.dataId], action)
                } }
            } };
            return data;
        case actionTypes.DETAIL_PIC_GET:
            data = { ...state, ...{
                items: { ...state.items, ...{
                    [action.payload.dataId]: PicInfoReducer(state[action.payload.dataId], action)
                } }
            } };
            return data;
        default:
            return state;
    }
}