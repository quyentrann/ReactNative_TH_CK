import { all } from 'redux-saga/effects';
import { watchAddTask, watchDeleteTask, watchUpdateTask } from './saga';

export default function* rootSaga() {
  yield all([
    watchAddTask(),
    watchDeleteTask(),
    watchUpdateTask(),
  ]);
}
