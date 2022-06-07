import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { columnReducer } from './Column/columnReducers'
import { taskReducer } from './ducks/card/cardReducers'
import { commentReducer } from './ducks/comment/commentReducers'

const rootReducer = combineReducers({
	columnReducer,
	taskReducer,
	commentReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']