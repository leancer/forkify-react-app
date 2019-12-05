import React, { Component } from 'react';
import Search from './Search';
import LikeRecipe from './LikeRecipe'

export default class Header extends Component {
    

    render() {
        return (
            <header className="header">
            <img src="img/logo.png" alt="Logo" className="header__logo" />
            <Search onFormSubmit={this.props.onFormSubmit}/>
            <div className="likes">
                <div className="likes__field">
                    <svg className="likes__icon">
                        <use href="img/icons.svg#icon-heart"></use>
                    </svg>
                </div>
                <div className="likes__panel">
                    <ul className="likes__list">
                        {this.props.favrecipe.length === 0 ? <p style={{textAlign:'center'}}>There are no Fav</p> :this.props.favrecipe.map((el,index) => {
                            return <LikeRecipe 
                            key={index}
                            currentRecipeFromLiked={this.props.currentRecipeFromLiked}
                            recipe={el}
                            />
                        })}
                        
                    </ul>
                </div>
            </div>
        </header>
        )
    }
}
