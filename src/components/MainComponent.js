import React, { Component } from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './Header';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Dishdetail from './DishdetailComponent';
import {Switch, Route,Redirect} from 'react-router-dom';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      
    };
  }
  
   render() {
    const HomePage = () =>{
    return(<Home />);
    }

  return (
   
    <div>
    <Header />
         
            <div>
             <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Redirect to="/home" />

              </Switch>
           </div>
          
      
    <Footer />
    </div>
        

  );
}
}
export default Main;
