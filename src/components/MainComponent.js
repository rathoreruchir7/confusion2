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
import { postComment,postFeedback,fetchDishes,fetchComments,fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => { dispatch(fetchPromos())},
  fetchLeaders: () => { dispatch(fetchLeaders())}


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
 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
   render() {
    const HomePage = () =>{
    return( <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promosLoading={this.props.promotions.isLoading}
              promosErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}

          />);
    }

     const DishWithId = ({match}) =>
  {
    return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            commentsErrMess={this.props.comments.errMess} 
            postComment={this.props.postComment}/>
      );
  };

  const AboutUs = () =>
  {
    return (
        <About leaders={this.props.leaders.leaders} 
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess}
       />
      );
  };
  return (
   
    <div>
    <Header />
      <TransitionGroup>    
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <div>
             <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path = '/menu/:dishId' component = {DishWithId} />
              <Route exact path = '/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} /> 
              <Route exact path = '/aboutus' component  = {AboutUs} />
              <Redirect to="/home" />

              </Switch>
           </div>
           </CSSTransition>
      </TransitionGroup>
      
    <Footer />
    </div>
        

  );
}
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
