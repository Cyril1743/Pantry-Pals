import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT
} from "./actions"

const storedState = localStorage.getItem("ingredientState")
const initialState = storedState ? JSON.parse(storedState) : []

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_INGREDIENT : {
            const newState = [...state, action.payload]
            localStorage.setItem("ingredientState", JSON.stringify(newState))
            return newState
        }
        case REMOVE_INGREDIENT : {
            const newState = state.filter(ingredient => ingredient !== action.payload)
            localStorage.setItem("ingredientState", JSON.stringify(newState))
            return newState
        }
        default : {
            return state
        }
    }
}