import * as actionTypes from "../constants/ActionTypes";
import { siteRoot } from "../config";
import { get } from "../js/ajax";

const fetchSubjects = () => {
    return dispatch => {
        get(`${siteRoot}src/data/SubjectData.json`, null, (response) => {
            dispatch(setSubjects(response));
        }, (settings, err) => {
            throw err;
        });
    };
}

const switchSubjectById = (id) => {
    return (dispatch, getState) => {
        const { nav } = getState();
        const { subjects } = nav;
        dispatch(setSelectId(subjects, id));
    };
}

const switchSubjectByIdx = (idx = 0) => {
    return (dispatch, getState) => {
        const { nav } = getState();
        const { subjects } = nav;
        dispatch(setCurIdx(subjects, idx));
    };
}

const showMoreSubjects = (show = false) => {
    return {
        type: actionTypes.SUBJECT_SHOW_MORE,
        payload: {
            showMore: show
        }
    };
}

const setSubjects = (data) => {
    return {
        type: actionTypes.SUBJECT_LIST,
        payload: data
    };
}

const setSelectId = (subjects, id) => {
    const len = subjects.length;
    let i, selectId, curIdx;
    for (i = 0; i < len; i++) {
        if (subjects[i].id === id) {
            selectId = id;
            curIdx = i;
            subjects[i].loaded = true;
        }
    }
    return {
        type: actionTypes.SUBJECT_SWITCH_BY_ID,
        payload: {
            subjects,
            selectId,
            curIdx,
            showMore: false
        }
    };
}

const setCurIdx = (subjects, idx) => {
    const len = subjects.length;
    let i, selectId, curIdx;
    for (i = 0; i < len; i++) {
        if (i == idx) {
            selectId = subjects[i].id;
            curIdx = i;
            subjects[i].loaded = true;
            break;
        }
    }
    return {
        type: actionTypes.SUBJECT_SWITCH_BY_ID,
        payload: {
            subjects,
            selectId,
            curIdx
        }
    };
}

export default {
    fetchSubjects,
    switchSubjectById,
    switchSubjectByIdx,
    showMoreSubjects
};