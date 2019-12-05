import React from 'react';

const LikeRecipe = (props) => {

    let getCurrentRecipe = () => {
        props.currentRecipeFromLiked(props.recipe);
    }
    
    return (
        <div>
            <li>
                            <a className="likes__link" href="#" onClick={getCurrentRecipe}>
                                <figure className="likes__fig">
                                    <img src={props.recipe.recipe.image} alt="Test"/>
                                </figure>
                                <div className="likes__data">
                                    <h4 className="likes__name">{props.recipe.recipe.label}</h4>
    <p className="likes__author">{props.recipe.recipe.source}</p>
                                </div>
                            </a>
                        </li>
        </div>
    );
}

export default LikeRecipe;
