import React, { Component } from 'react'
import _ from 'lodash';
import RecipeListItem from './RecipeListItem'
import { S_IFSOCK } from 'constants';

export default class RecipeList extends Component {

    state ={
        page:1,
        resPerPage:10
    }

    onPaginationButton = (e) => {
        let btn = e.target.closest('.btn-inline');
        if(btn){
            let pageNumber = parseInt(btn.dataset.goto,10);
            console.log(pageNumber);
            this.setState(() => ({page:pageNumber}))
        }
        
    }

    createButton = (page,type) => {
        let cn = `btn-inline results__btn--${type}`;
        let ims = `img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}`
        return [
    <button className={cn} onClick={this.onPaginationButton} data-goto={type === 'prev' ? page - 1 : page + 1}>
        <span>Page {type === 'prev' ? page - 1 : page + 1}</span>
        <svg className="search__icon">
            <use href={ims}></use>
        </svg>
        </button>]};

renderButtons = () => {
    const pages = Math.ceil(this.props.recipes.length / this.state.resPerPage);

    let button;
    if (this.state.page === 1 && pages > 1) {
        button = this.createButton(this.state.page, 'next');
    } else if (this.state.page < pages) {
        button = [
            ...this.createButton(this.state.page, 'prev'),
            ...this.createButton(this.state.page, 'next')
        ];
    } else if (this.state.page === pages && pages > 1) {
        button = this.createButton(this.state.page, 'prev');
    }
    console.log(button);
    return button;
};

    render() {
        let start = (this.state.page - 1) * this.state.resPerPage;
        let end = this.state.page * this.state.resPerPage;
        return (
            <div className="results">
            {this.props.showLoader && 
            <div className="loader">
                    <svg>
                        <use href="img/icons.svg#icon-cw"></use>
                    </svg>
                </div>

            }
            <ul className="results__list">

                {this.props.recipes.slice(start, end).map(({recipe}) => {
                   return <RecipeListItem key={recipe.uri.split('#')[1]} recipe={recipe} />
                })}   
                
            </ul>
            {!_.isEmpty(this.props.recipes) && <div className="results__pages">
                {this.renderButtons().map((el) => {
                    return el;
                })}
                </div>
                }
        </div>
        )
    }
}
