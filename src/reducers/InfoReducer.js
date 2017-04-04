import * as actionTypes from "../constants/ActionTypes";

const initState = {
    time: "",
    org: "",
    content: "",
    title: ""
};

export default function InfoReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.DETAIL_INFO_GET:
            return { ...state, ...{
                time: action.payload.time,
                org: action.payload.org,
                content: action.payload.content,
                title: action.payload.title
            } };
        default:
            return state;
    }
}