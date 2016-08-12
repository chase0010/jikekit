import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import DevTools from '../containers/DevTools';
import rootReducer from '../reducers/reducers';

const initialState = window.__INITIAL_STATE__;

// 把多个 store 增强器从右到左来组合起来，依次执行
// 这个地方完全可以不用compose，演示一下compose的使用
const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;