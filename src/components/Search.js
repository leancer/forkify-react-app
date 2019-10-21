import React, { Component, Fragment } from 'react'

export default class Search extends Component {

    render() {
        return (
            <Fragment>
                <form className="search" onSubmit={this.props.onFormSubmit}>
                    <input type="text" className="search__field" placeholder="Search over 1,000,000 recipes..." />
                    <button className="btn search__btn">
                        <svg className="search__icon">
                            <use href="img/icons.svg#icon-magnifying-glass"></use>
                        </svg>
                        <span>Search</span>
                    </button>
                </form>
            </Fragment>
        )
    }
}
