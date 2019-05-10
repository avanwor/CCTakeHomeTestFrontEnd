import React from "react";

const Item = (props) => (
    <div onClick={() => props.onClick(props.film)}>
        <h3>{props.film.title}</h3>
    </div>
);

export default Item;
