import React from 'react';

const ShoppingList = (props) => {
    return (
        <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value={props.item.count}/>
    <p>{props.item.unit}</p>
                    </div>
    <p className="shopping__description">{props.item.ingredient}</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    );
}

export default ShoppingList;
