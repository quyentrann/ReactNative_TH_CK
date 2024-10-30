import { call, put, takeLatest, select } from 'redux-saga/effects';
import { deleteTask, addTask, updateTask, addTaskSaga, deleteTaskSaga, updateTaskSaga } from './slice';


async function updateData(users) {
  const response = await fetch(
    `https://6555ccce84b36e3a431e5d74.mockapi.io/todo/${users.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    }
  );
}



function* addTaskSagaHandler(action) {
  
  const newNote = action.payload; 
    console.log("newNote")

    console.log(newNote)

  try {
    yield put(addTask(newNote)); 
    const user = yield select((state) => state.user.users);
    const response = yield call(updateData,user ); 
  } catch (error) {
    console.error('Failed to add task:', error);
  }
}

function* deleteTaskSagaHandler(action) {
  const noteId = action.payload;
  
  try {
    yield put(deleteTask(noteId)); 
    const user = yield select((state) => state.user.users);
    const response = yield call(updateData, user);
  } catch (error) {
    console.error('Failed to delete task:', error);
  }
}

function* updateTaskSagaHandler(action) {
  try {
    const { id, newNote } = action.payload;
    yield put(updateTask({ id: id, newNote: newNote }));
    const user = yield select((state) => state.user.users); 
    const response = yield call(updateData, user);
  } catch (error) {
    console.error('Failed to update task:', error);
  }
}

// Watcher Sagas
export function* watchAddTask() {
  yield takeLatest(addTaskSaga.type, addTaskSagaHandler);
}

export function* watchDeleteTask() {
  yield takeLatest(deleteTaskSaga.type, deleteTaskSagaHandler);
}

export function* watchUpdateTask() {
  yield takeLatest(updateTaskSaga.type, updateTaskSagaHandler);
}
