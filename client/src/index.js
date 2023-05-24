import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorkerRegistration"
import { IngredientProvider } from "./utils/ingredientsContext";

ReactDOM.render(
    <React.StrictMode>
        <IngredientProvider>
            <App />
        </IngredientProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register()