import React from "react";
import "../styles/Header.css";

class Header extends React.Component {
    render() {
        const currentDate = new Date().toLocaleDateString();

        return (
            <div className={"header"}>
                <p>Прогноз погоды на {currentDate} </p>

            </div>
        );
    }
}

export default Header;