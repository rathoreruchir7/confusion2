import React, { Component } from 'react';
import {Navbar,NavbarBrand} from 'reactstrap';
import Menu from './MenuComponent';
import Header from './Header';
import Home from './HomeComponent';
import Footer from './FooterComponent';
import Dishdetail from './DishdetailComponent';
import {Switch, Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { addComment } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
   };
}
class Main extends Component {
  constructor(props) {
    super(props);
   
  }
 
   render() {
    const HomePage = () =>{
    return( <Home 
              dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />);
    }

     const DishWithId = ({match}) =>
  {
    return(
        <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
             addComment={this.props.addComment}/>
      );
  };

  const AboutUs = () =>
  {
    return (
        <About leaders={this.props.leaders} />
      );
  };
  return (
   
    <div>
    <Header />
         
            <div>
             <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path = '/menu/:dishId' component = {DishWithId} />
              <Route exact path = '/contactus' component = {Contact} /> 
              <Route exact path = '/aboutus' component  = {AboutUs} />
              <Redirect to="/home" />

              </Switch>
           </div>
          
      
    <Footer />
    </div>
        

  );
}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
