import React from 'react';
import { Fraction } from 'fractional'

const formatCount = count => {
    if(count){
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) return newCount;

        if (int === 0) {
            const fr = new Fraction(newCount);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(newCount - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
}

const IngredientList = (props) => {
    let ing = props.ingredient;
    return (
        
        <div>
            
                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">{formatCount(ing.count)}</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit">{ing.unit} </span>
                            {ing.ingredient}
                        </div>
                    </li>
        </div>
    );
}

export default IngredientList;
