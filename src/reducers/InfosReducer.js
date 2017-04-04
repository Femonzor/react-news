import * as actionTypes from "../constants/ActionTypes";

const initState = {
    downStatus: 2,
    infos: [],
    end: false,
    page: 0
};

export default function InfosReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SUBJECT_DATA_GET:
            return { ...state, ...{
                infos: action.payload.page === 1 ? action.payload.data.infos : [...state.infos, ...action.payload.data.infos],
                end: action.payload.end,
                page: action.payload.page,
                downStatus: action.payload.data.downStatus
            } };
        default:
            return state;
    }
}