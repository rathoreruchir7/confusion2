import React, { Component } from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comment';
import { PROMOTIONS } from '../shared/promotion';
import { LEADERS } from '../shared/leader';
import Header from './Header';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Dishdetail from './DishdetailComponent';
import {Switch, Route,Redirect} from 'react-router-dom';
import Contact from './ContactComponent';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }
 
   render() {
    const HomePage = () =>{
    return( <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />);
    }

     const DishWithId = ({match}) =>
  {
    return(
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
  };

  return (
   
    <div>
    <Header />
         
            <div>
             <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path = '/menu/:dishId' component = {DishWithId} />
              <Route exact path = '/contactus' component = {Contact} /> 
              <Redirect to="/home" />

              </Switch>
           </div>
          
      
    <Footer />
    </div>
        

  );
}
}
export default Main;
