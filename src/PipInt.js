import React from "react";
import Draggable from "react-draggable";
import classes from "./PIP.module.css";

const PIP = ({ childern }) => {
    return(
        <div>
            <Draggable>
                <div className={classes.pipWindow}>{childern}</div>
            </Draggable>
        </div>
    )
}

export default PIP;