import * as actionTypes from "../constants/ActionTypes";
import { siteRoot } from "../config";
import { get } from "../js/ajax";

const fetchSubjectData = (subjectId, type, page) => {
    page += 1;
    return dispatch => {
        get(`${siteRoot}src/data/subjects/${subjectId}.json`, null, (response) => {
            response.downStatus = 0;
            let data = null;
            if (type !== 0) {
                if (type === 1) data = response.infos;
                else if (type === 2) data = response.picInfos;
                for (let i = 0, len = data.length; i < len; i++) {
                    if (type === 1) data[i].id = 10 * (page - 1) + i + 1;
                    else if (type === 2) data[i].id = 6 * (page - 1) + i + 1;
                }
            }
            dispatch(setSubjectData(subjectId, type, response, page, page > 4 || type === 0 ? true : false));
        }, (settings, err) => {
            throw err;
        });
    };
}

const switchPicCarousel = (subjectId, picInfoId) => {
    return {
        type: actionTypes.PIC_CAROUSEL_SWITCH,
        payload: {
            id: subjectId,
            data: {
                selectId: picInfoId
            }
        }
    };
}

const setRefreshStatus = (subjectId, downStatus) => {
    return {
        type: actionTypes.REFRESH_STATUS_SET,
        payload: {
            id: subjectId,
            data: {
                downStatus
            }
        }
    };
}

const setSubjectData = (id, type, data, page, end) => {
    return {
        type: actionTypes.SUBJECT_DATA_GET,
        payload: {
            id,
            type,
            data,
            page,
            end
        }
    };
}

export default {
    fetchSubjectData,
    switchPicCarousel,
    setRefreshStatus
};