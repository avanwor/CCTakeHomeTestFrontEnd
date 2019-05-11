import React from "react";

const Item = (props) => {

    if (props.film) {
        return (
            <div onClick={() => props.onClick(props.film)} >
                <h3>{props.film.title}</h3>
            </div>
        )
    } else {
        return (
            <div >
                <h3>{props.person.name}</h3>
            </div>
        )
    }
    
};

export default Item;
