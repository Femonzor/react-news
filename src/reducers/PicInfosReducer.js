import * as actionTypes from "../constants/ActionTypes";

const initState = {
    downStatus: 2,
    picInfos: [],
    end: false,
    page: 0
};

export default function PicInfosReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SUBJECT_DATA_GET:
            return { ...state, ...{ 
                picInfos: action.payload.page === 1 ? action.payload.data.picInfos : [...state.picInfos, ...action.payload.data.picInfos],
                end: action.payload.end,
                page: action.payload.page,
                downStatus: action.payload.data.downStatus
            } };
        default:
            return state;
    }
}