import * as actionTypes from "../constants/ActionTypes";

const initState = {
    title: "",
    imgs: []
};

export default function PicInfoReducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.DETAIL_PIC_GET:
            return { ...state, ...{
                title: action.payload.title,
                imgs: action.payload.imgs
            } };
        default:
            return state;
    }
}