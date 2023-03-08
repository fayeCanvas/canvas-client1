import React from "react";
import NavbarComponent from "./navbar";

export function ParentComponentWithNavBar({ children, ...rest }) {
    return (
        <React.Fragment>
            <NavbarComponent />
            <div className="container">
                {children}
            </div>
        </React.Fragment>
    )
}



