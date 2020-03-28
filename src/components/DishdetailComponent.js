import React, { Component } from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle} from 'reactstrap';

class Dishdetail extends Component
{
	constructor(props)
	{
		super(props);
		
		
	}
	renderDish()
	{	return(
		
					<Card>
						<CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                      <CardTitle>{this.props.dish.name}</CardTitle>
                      <CardText>{this.props.dish.description}</CardText>
                    </CardBody>

					</Card>
				);
	}

	renderComments()
	{
		const comments = this.props.dish.comments.map((cmnt) => {
			return(
				
				<ul className="list-unstyled" key={cmnt.id}>
					<li>{cmnt.comment}</li>
					<li>--{cmnt.author} {cmnt.date}</li>

				</ul>
				
			);
		});
		if(comments!=null){
		return(

			<div>
				<h4>Comments</h4>
			<div>
				{comments}
			</div>
			</div>);
		}
		else
		{
			return(
			<div></div>);
		}
	}
	render(){
		if(this.props.dish !=null){
		return(
			
			<div className ="container">
				<div className="row">
				<div className="col-12 col-md-5 m-1">	
					{this.renderDish()}
				</div>

				<div className="col-12 col-md-5 m-1">
				   {this.renderComments()}
				</div>
			</div>
			</div>
				
		);
	}

	else
	{
		return(
			<div></div>
			);
	}

	}
}

export default Dishdetail; 