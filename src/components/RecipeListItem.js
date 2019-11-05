import React, { Component } from 'react'
//results__link--active
export default class RecipeListItem extends Component {
    render() {
        let cn = `results__link ${this.props.isCurrent?'results__link--active':''}`
        return (
            <li>
                    <a className={cn} href="#" onClick={this.props.onRecipeClick.bind(this,this.props.id)}>
                        <figure className="results__fig">
                            <img src={this.props.recipe.image} alt="Test" />
                        </figure>
                        <div className="results__data">
                            <h4 className="results__name">{this.props.recipe.label}</h4>
                            <p className="results__author">{this.props.recipe.source}</p>
                        </div>
                    </a>
                </li>
        )
    }
}
