// import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./_normalize.scss";
import "./_var.scss";
import "./_type.scss";
import "./App.scss";

function App() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default App;
