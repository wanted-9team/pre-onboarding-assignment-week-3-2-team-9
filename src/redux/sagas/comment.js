import {
  createCommentAPI,
  deleteCommentAPI,
  getCommentsAPI,
  getCommentsByIdAPI,
  updateCommentAPI,
  getCommentsByCurrentPageAPI,
} from 'api'
import { setCommentSlice } from 'redux/slice/comment'
import { put, takeEvery, call } from 'redux-saga/effects'
import { getCommentsSlice, getCurrentPageSlice } from 'redux/slice/comments'
import {
  CREATE_COMMENT,
  DELETE_COMMENT_BY_ID,
  GET_COMMENTS,
  GET_COMMENT_BY_ID,
  UPDATE_COMMENT_BY_ID,
  GET_CURRENT_PAGE,
} from 'redux/type'

export function* getCommentsSaga() {
  const comments = yield getCommentsAPI()
  yield put(getCommentsSlice(comments.data))
}

export function* getCurrentPageSaga(action) {
  const currentPage = yield call(getCommentsByCurrentPageAPI, action.currentPage)
  yield put(getCurrentPageSlice(currentPage.data))
}

export function* getCommentByIdSaga(action) {
  yield call(getCommentsByIdAPI, action.id)
  yield put(setCommentSlice(action.id))
}

export function* createCommentSaga(action) {
  yield call(createCommentAPI, action.comment)
  const currentPage = yield call(getCommentsByCurrentPageAPI, action.currentPage)
  yield put(getCurrentPageSlice(currentPage.data))
}

export function* updateCommentSaga(action) {
  yield call(updateCommentAPI, action.comment)
  const currentPage = yield call(getCommentsByCurrentPageAPI, action.currentPage)
  yield put(getCurrentPageSlice(currentPage.data))
}

export function* deleteCommentByIdSaga(action) {
  yield call(deleteCommentAPI, action.id)
  const currentPage = yield call(getCommentsByCurrentPageAPI, action.currentPage)
  yield put(getCurrentPageSlice(currentPage.data))
}

export function* watchCommentsAsync() {
  yield takeEvery(GET_COMMENTS, getCommentsSaga)
  yield takeEvery(GET_CURRENT_PAGE, getCurrentPageSaga)
  yield takeEvery(GET_COMMENT_BY_ID, getCommentByIdSaga)
  yield takeEvery(CREATE_COMMENT, createCommentSaga)
  yield takeEvery(CREATE_COMMENT, getCommentsSaga)
  yield takeEvery(UPDATE_COMMENT_BY_ID, updateCommentSaga)
  yield takeEvery(UPDATE_COMMENT_BY_ID, getCommentsSaga)
  yield takeEvery(DELETE_COMMENT_BY_ID, deleteCommentByIdSaga)
  yield takeEvery(DELETE_COMMENT_BY_ID, getCommentsSaga)
}
