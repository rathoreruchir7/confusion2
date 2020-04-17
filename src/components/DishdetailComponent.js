import React, { Component } from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,
	Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,FormFeedback,Label,Input,Col,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LocalForm,Control,Errors} from 'react-redux-form';

// import CommentForm from './CommentForm';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => val && (val.length<=len); 
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
           
            isModalOpen:false,
           

        };
        this.toggleModal = this.toggleModal.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
      
    }
   
    handleSubmit(values)
    {alert(JSON.stringify(values));   
         this.toggleModal();
         
         
    }
    

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    render(){
        
        return(
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} className="submitCommentModal">
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    <Row className="from-group">
                        <Label htmlFor="rating" md={6}>Rating</Label>                      
                       <Col md={12}>
                        <Control.select model=".rating" name="rating" id="rating"  className="rating"
                             >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                   </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author" md={12}>Your Name</Label>
                        <Col md={12}>
                        <Control.text model=".author"  name="author" id="author" className="author"
                         validators={{required,minLength:minLength(3), maxLength:maxLength(15) }}
                       />
                       </Col>
                       <Col md={12}>
                       <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                        </Col>
                    
                   </Row>
                   <Row className="form-group" >
                       <Label htmlFor="comment" md={12}>Comment</Label>
                       <Col md={12}>
                       <Control.textarea model=".comment" name="comment" id="comment" className="comment"  />
                        </Col>
                    </Row>
                    
                     
                    <Button type="submit" color="primary" >Submit</Button>
                </LocalForm>
            </ModalBody>
            </Modal>
            </div>
        );
    }
}


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
			<CommentForm />
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
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                
				<div className="row">
				<div className="col-12 col-md-5 m-1">	
					<RenderDish dish={props.dish} />
				</div>

				<div className="col-12 col-md-5 m-1">
				   <RenderComments comments = {props.comments} 
                  
                    />
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