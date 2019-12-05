import React,{ useState } from 'react';

const ShoppingList = (props) => {

    let [ shoppingValue, setShoppingValue ] = useState(props.item.count);

    let handleChange = (e) => {
       setShoppingValue(e.target.value);
    }

    let handleDeleteItem = (e) => {
        let btn = e.target.closest('#sh-cancel');
        props.deleteItem(btn.value);
    }

    return (
        <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" onChange={handleChange} value={shoppingValue}/>
    <p>{props.item.unit}</p>
                    </div>
    <p className="shopping__description">{props.item.ingredient}</p>
                    <button value={props.item.id} onClick={handleDeleteItem} id="sh-cancel" className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    );
}

export default ShoppingList;
