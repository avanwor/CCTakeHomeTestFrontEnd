import React from "react";

const Item = (props) => {
    if (props.film) {
        return (
            <div onClick={() => props.onClick(props.film)} style={{cursor:'pointer'}}>
                <h3>{props.film.title}</h3>
                <br></br>
                <br></br>
            </div>
        );
    } else {
        return (
            <div >
                <h3>{props.person.name}</h3>
                <h3>{props.person.speciesName}</h3>
            </div>
        );
    };
};

export default Item;
