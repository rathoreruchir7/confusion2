import React, { Component } from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle} from 'reactstrap';


	
	function RenderDish({dish})
	{	return(
		
					<Card>
						<CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>

					</Card>
				);
	}

	function RenderComments({comments})
	{
		const comment = comments.map((cmnt) => {
			return(
				
				<ul className="list-unstyled" key={cmnt.id}>
					<li>{cmnt.comment}</li>
					<li>--{cmnt.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}</li>

				</ul>
				
			);
		});
		if(comment!=null){
		return(

			<div>
				<h4>Comments</h4>
			<div>
				{comment}
			</div>
			</div>);
		}
		else
		{
			return(
			<div></div>);
		}
	}
	const Dishdetail = (props) => {
		if(props.dish !=null){
		return(
			
			<div className ="container">
				<div className="row">
				<div className="col-12 col-md-5 m-1">	
					<RenderDish dish={props.dish} />
				</div>

				<div className="col-12 col-md-5 m-1">
				   <RenderComments comments = {props.dish.comments} />
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


export default Dishdetail; 