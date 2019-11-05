import React, { Component,Fragment } from 'react'

export default class Recipe extends Component {

    state = {
        ingredient:[]
    }

    parseIngredients() {
        const { ingredientLines } = this.props.recipe.recipe;
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        const newIng = ingredientLines.map((el) => {
            
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };

            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        })

        this.setState({
            ingredient:newIng
        })
        
    }
    componentDidMount(){
        this.parseIngredients();
    }


    render() {
        return (
                       
             <Fragment>
                 <figure className="recipe__fig">
                <img src={this.props.recipe.recipe.image} alt="Tomato" className="recipe__img"/>
                <h1 className="recipe__title">
                    <span>{this.props.recipe.recipe.label}</span>
                </h1>
            </figure>
            <div className="recipe__details">
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span className="recipe__info-data recipe__info-data--minutes">45</span>
                    <span className="recipe__info-text"> minutes</span>
                </div>
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span className="recipe__info-data recipe__info-data--people">4</span>
                    <span className="recipe__info-text"> servings</span>

                    <div className="recipe__info-buttons">
                        <button className="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button className="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button className="recipe__love">
                    <svg className="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>



            <div className="recipe__ingredients">
                <ul className="recipe__ingredient-list">
                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">1000</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit">g</span>
                            pasta
                        </div>
                    </li>

                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">1/2</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit">cup</span>
                            ricotta cheese
                        </div>
                    </li>

                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">1</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit"></span>
                            can of tomatoes, whole or crushed
                        </div>
                    </li>


                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">1</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit"></span>
                            can tuna packed in olive oil
                        </div>
                    </li>

                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">1/2</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit">cup</span>
                            grated parmesan cheese
                        </div>
                    </li>

                    <li className="recipe__item">
                        <svg className="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div className="recipe__count">1/4</div>
                        <div className="recipe__ingredient">
                            <span className="recipe__unit">cup</span>
                            fresh basil, chopped or torn
                        </div>
                    </li>
                </ul>

                <button className="btn-small recipe__btn">
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div className="recipe__directions">
                <h2 className="heading-2">How to cook it</h2>
                <p className="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span className="recipe__by"> {this.props.recipe.recipe.source}</span>. Please check out directions at their website.
                </p>
                <a className="btn-small recipe__btn" href={this.props.recipe.recipe.url} rel="noopener noreferrer" target="_blank">
                    <span>Directions</span>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
            </Fragment>
        )
    }
}
