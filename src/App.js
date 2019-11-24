import React,{ Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import ShoppingList from './components/ShoppingList';

class App extends Component{

  state = {
    recipes:[],
    showLoader:false,
    id:0,
    showRecipe:true,
    shoppingList:[]
  }

  onChangeShoppingList(list){
      console.log(list);
      this.setState(() => ({shoppingList:[
        ...this.state.shoppingList,
        ...list
      ]}))
  }

  onFormSubmit = (e) => {
    this.setState(() => ({recipes:[],showLoader:true}))
    e.preventDefault();
    let q = e.target.elements[0].value;
    axios.get(`https://api.edamam.com/search?q=${q}&app_id=af4b7751&app_key=b84ade4583f2a872db87a3a446fcab84&to=30`).then((res) => {
      this.setState(() => ({recipes:res.data.hits,showLoader:false}))
    })

    e.target.elements[0].value = '';
  }

  onRecipeClick = (id) => {
    this.setState(() => ({id}));

    this.setState({
      showRecipe : false
    })
  
    setTimeout(() => {
      this.setState({
        showRecipe : true
      })
    },100);
  }

  render(){
    return (
        <div className="container">
          <Header
            onFormSubmit={this.onFormSubmit}
          />
          {<RecipeList 
          recipes={this.state.recipes} 
          showLoader={this.state.showLoader}
          currentId={this.state.id}
          onRecipeClick={this.onRecipeClick}
          />}
          <div className="recipe">
            {(this.state.recipes.length !== 0)&& this.state.showRecipe && 
            <Recipe 
            recipe={this.state.recipes[this.state.id]}
            onChangeShoppingList={this.onChangeShoppingList.bind(this)}
            />}
          </div>

            
          <div className="shopping">
            <h2 className="heading-2">My Shopping List</h2>

            <ul className="shopping__list">
            {this.state.shoppingList.map((el) => {
              return <ShoppingList item={el} key={el.id}/>
            })
            }
          </ul>
          <div className="copyright">
                Created on ReactJS . Powered by
                <a href="http://food2fork.com" target="_blank" className="link">Food2Fork.com</a>.
            </div>
          </div>
      </div>
    );
  }
}

export default App;
