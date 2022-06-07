import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { columnReducer } from 'store/ducks/column/columnReducers'
import { taskReducer } from 'store/ducks/card/cardReducers'
import { commentReducer } from 'store/ducks/comment/commentReducers'
import { authorReducer } from 'store/ducks/author/authorReducers'

const rootReducer = combineReducers({
	columnReducer,
	taskReducer,
	commentReducer,
	authorReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']