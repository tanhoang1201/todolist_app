import { configureStore } from '@reduxjs/toolkit'
import filtersSlide from './filtersSlide'
import todoSlide from './todoSlide'

const store = configureStore({
    reducer: {
        filters: filtersSlide,
        todo: todoSlide,
    },
})

export default store
