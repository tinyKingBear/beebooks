import { createStore, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import authReducer from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return persistedReducer(state, action);
  }
};

const makeStore = () => createStore(reducer);

export const wrapper = createWrapper(makeStore);

export const persistor = persistStore(makeStore);