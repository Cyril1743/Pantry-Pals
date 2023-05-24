import React, { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";

const IngredientContext = createContext();

export const useIngredientContext = () => useContext(IngredientContext);

export const IngredientProvider = ({ children }) => {
    const storedState = localStorage.getItem("ingredientState")
    const initialState = storedState ? JSON.parse(storedState) : [];

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <IngredientContext.Provider value={{state, dispatch}}>
            {children}
        </IngredientContext.Provider>
    );
};

