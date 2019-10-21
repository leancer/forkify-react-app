import React, { Component } from 'react'

export default class ShoppingList extends Component {
    render() {
        return (
            <div className="shopping">
            <h2 className="heading-2">My Shopping List</h2>

            <ul className="shopping__list">

                <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value="500" step="100"/>
                        <p>g</p>
                    </div>
                    <p className="shopping__description">Pasta</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value="0.5" step="0.1"/>
                        <p>cup</p>
                    </div>
                    <p className="shopping__description">Ricotta cheese</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value="3.5" step="0.1"/>
                        <p>tbsp</p>
                    </div>
                    <p className="shopping__description">Toasted almond slices</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value="0.5" step="0.1"/>
                        <p>tbsp</p>
                    </div>
                    <p className="shopping__description">Sea salt</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value="0.25" step="0.1"/>
                        <p>cup</p>
                    </div>

                    <p className="shopping__description">Minced green onions</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li className="shopping__item">
                    <div className="shopping__count">
                        <input type="number" value="45" step="10"/>
                        <p>g</p>
                    </div>
                    <p className="shopping__description">Sesame seeds</p>
                    <button className="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
              
            </ul>

            <div className="copyright">
                Created on ReactJS . Powered by
                <a href="http://food2fork.com" target="_blank" className="link">Food2Fork.com</a>.
            </div>

        </div>
        )
    }
}
