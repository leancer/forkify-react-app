import React,{ Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import Recipe from './components/Recipe';
import ShoppingList from './components/ShoppingList';

class App extends Component{

  state = {
    recipes:[],
    recipe:{},
    showLoader:false,
    id:0,
    showRecipe:true,
    shoppingList:[],
    favrecipe:[]
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
      this.setState(() => ({recipe:this.state.recipes[this.state.id]}))
    })
    

    e.target.elements[0].value = '';
  }

  onRecipeClick = (id) => {
    this.setState(() => ({id}));

    this.setState(() => ({recipe:this.state.recipes[id]}))

    this.setState({
      showRecipe : false
    })
  
    setTimeout(() => {
      this.setState({
        showRecipe : true
      })
    },100);
  }

  deleteItem = (id) => {
    this.setState(() => ({shoppingList:this.state.shoppingList.filter(el => el.id !== id)}));
  }

  componentDidMount(){
    if(localStorage.getItem('favRecipe')){
      let favRecipes = JSON.parse(localStorage.getItem('favRecipe'));

      this.setState(() => ({favrecipe:favRecipes}));
    }
  }

  handleLiked = (favrecipe) => {

    this.setState({favrecipe});

  }

  currentRecipeFromLiked = (recipe) => {
    this.setState(() => ({recipe}))
  }

  render(){
    return (
        <div className="container">
          <Header
            onFormSubmit={this.onFormSubmit}
            favrecipe={this.state.favrecipe}
            currentRecipeFromLiked={this.currentRecipeFromLiked}
          />
          {<RecipeList 
          recipes={this.state.recipes} 
          showLoader={this.state.showLoader}
          currentId={this.state.id}
          onRecipeClick={this.onRecipeClick}
          />}
          <div className="recipe">
            {(Object.keys(this.state.recipe).length !== 0) && this.state.showRecipe && 
            <Recipe 
            recipe={this.state.recipe}
            
            handleLiked={this.handleLiked}
            onChangeShoppingList={this.onChangeShoppingList.bind(this)}
            />}
          </div>

            
          <div className="shopping">
            <h2 className="heading-2">My Shopping List</h2>

            <ul className="shopping__list">
            {this.state.shoppingList.map((el) => {
              return <ShoppingList 
              item={el} 
              key={el.id}
              deleteItem={this.deleteItem}
              />
            })
            }
          </ul>
          <div className="copyright">
                Created on ReactJS . Powered by
                <a href="http://edamam.com" target="_blank" className="link">edamam.com</a>.
            </div>
          </div>
      </div>
    );
  }
}

export default App;
