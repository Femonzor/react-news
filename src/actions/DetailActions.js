import * as actionTypes from "../constants/ActionTypes";
import { siteRoot } from "../config";
import { get } from "../js/ajax";

const fetchInfoDetail = (id) => {
    id = id % 5;
    if (id === 0) id = 5;
    return dispatch => {
        get(`${siteRoot}src/data/info/${id}.json`, null, (response) => {
            dispatch(setInfoDetail(response));
        }, (settings, err) => {
            throw err;
        });
    };
};

const fetchPicDetail = (id) => {
    id = id % 3;
    if (id === 0) id = 3;
    return dispatch => {
        get(`${siteRoot}src/data/pic/${id}.json`, null, (response) => {
            dispatch(setPicDetail(response));
        }, (settings, err) => {
            throw err;
        });
    }
}

const showDetail = (subjectName, dataId) => {
    return {
        type: actionTypes.DETAIL_SHOW,
        payload: {
            show: true,
            subjectName,
            dataId
        }
    };
}

const hideDetail = () => {
    return {
        type: actionTypes.DETAIL_HIDE,
        payload: {
            show: false
        }
    };
}

const resetDetail = () => {
    return {
        type: actionTypes.DETAIL_RESET,
        payload: {
            subjectName: "",
            dataId: null
        }
    };
}

const setInfoDetail = (data) => {
    return {
        type: actionTypes.DETAIL_INFO_GET,
        payload: {
            title: data.title,
            time: data.time,
            org: data.org,
            content: data.content,
            dataId: "info-" + data.id
        }
    };
}

const setPicDetail = (data) => {
    return {
        type: actionTypes.DETAIL_PIC_GET,
        payload: {
            title: data.title,
            imgs: data.imgs,
            dataId: "pic-" + data.id
        }
    };
}

export default {
    fetchInfoDetail,
    fetchPicDetail,
    showDetail,
    hideDetail,
    resetDetail
};