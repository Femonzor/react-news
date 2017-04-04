import * as actionTypes from "../constants/ActionTypes";

const initState = {
    downStatus: 2,
    picInfos: [],
    selectId: 0,
    infos: []
};

export default function IndexReducer(state = initState, action) {
    let data;
    switch (action.type) {
        case actionTypes.SUBJECT_DATA_GET:
            data = { ...state, ...action.payload.data };
            return data;
        case actionTypes.PIC_CAROUSEL_SWITCH:
            data = { ...state, ...action.payload.data };
            return data;
        default:
            return state;
    }
}