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
    id:0
  }

  componentDidMount() {
    
  }

  onFormSubmit = (e) => {
    this.setState(() => ({recipes:[],showLoader:true}))
    e.preventDefault();
    let q = e.target.elements[0].value;
    axios.get(`https://api.edamam.com/search?q=${q}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&to=30`).then((res) => {
      this.setState(() => ({recipes:res.data.hits,showLoader:false}))
    })

    e.target.elements[0].value = '';
  }

  onRecipeClick = (id) => {
    this.setState(() => ({id}));
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
            {(this.state.recipes.length !== 0) && <Recipe recipe={this.state.recipes[this.state.id]}/>}
          </div>
          <ShoppingList/>
      </div>
    );
  }
}

export default App;
