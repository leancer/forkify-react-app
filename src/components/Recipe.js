import React, { Component,Fragment } from 'react'
import IngredientList from './IngredientList';
import uniqid from 'uniqid';

export default class Recipe extends Component {

    state = {
        ingredient:[],
        serving:4
    }

    calcTime() {
        const numIng = this.state.ingredient.length;
        const periods = Math.ceil(numIng / 3);
        return periods * 15;
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

    updateServing = type => e =>{

        const newServings = type === 'dec' ? this.state.serving - 1 : this.state.serving + 1;

        if(newServings !== 0){
        // Ingredients
        this.state.ingredient.forEach(ing => {
            ing.count *= (newServings / this.state.serving);
        });

        this.setState({serving:newServings});
        }
    }

    handleClickShopping(){
        
        let newing = this.state.ingredient.map((el) => {
            return {
                ...el,
                id:uniqid()
            }
        })

        this.props.onChangeShoppingList(newing);
    }

    componentDidMount(){
        this.parseIngredients();
    }

    handleLike = (e) => {
        let favRecipes;
        if(!localStorage.getItem('favRecipe')){

            favRecipes = [];

            favRecipes.push({recipe:this.props.recipe.recipe});

            localStorage.setItem('favRecipe',JSON.stringify(favRecipes));
        }else{

            favRecipes = JSON.parse(localStorage.getItem('favRecipe'));

            favRecipes.push({recipe:this.props.recipe.recipe});

            localStorage.setItem('favRecipe',JSON.stringify(favRecipes));

        }
        this.props.handleLiked(favRecipes);
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
        <span className="recipe__info-data recipe__info-data--minutes">{this.calcTime()}</span>
                    <span className="recipe__info-text"> minutes</span>
                </div>
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
        <span className="recipe__info-data recipe__info-data--people">{this.state.serving}</span>
                    <span className="recipe__info-text"> servings</span>

                    <div className="recipe__info-buttons">
                        <button className="btn-tiny" onClick={this.updateServing('dec')}>
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button className="btn-tiny" onClick={this.updateServing('inc')}>
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button className="recipe__love" onClick={this.handleLike}>
                    <svg className="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>

            <div className="recipe__ingredients">
                <ul className="recipe__ingredient-list">

                    {this.state.ingredient.map((el,index)=> {
                        return <IngredientList ingredient={el} key={index}/>
                    })}
                
                </ul>

                <button className="btn-small recipe__btn" onClick={this.handleClickShopping.bind(this)}>
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
