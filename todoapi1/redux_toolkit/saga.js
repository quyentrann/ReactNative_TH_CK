import { call, put, takeLatest } from 'redux-saga/effects';
import {
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} from './userSlice';

function* deleteNoteSaga(action) {
  const { userId, noteId } = action.payload;
  const url = `https://6555ccce84b36e3a431e5d74.mockapi.io/todo/${userId}`;

  try {
    const response = yield call(fetch, url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: action.payload.updatedNotes }),
    });

    if (!response.ok) {
      const error = yield response.text();
      throw new Error(`Failed: ${error}`);
    }

    yield put(deleteTaskSuccess({ userId, noteId }));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

export function* watchDeleteNote() {
  yield takeLatest('user/deleteTaskRequest', deleteNoteSaga);
}
