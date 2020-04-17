import React, { Component } from 'react';
import {Card, CardImg, CardText, CardImgOverlay, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,
	Button, Modal, ModalHeader, ModalBody, ModalFooter,Form,FormGroup,FormFeedback,Label,Input,Col,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
// import CommentForm from './CommentForm';

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false,
           author: '',
            rating:'',
            commment:'',
            touched:{
                author:''
            }

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }
    handleSubmit(event)
    {
        alert('Current State is: ' + JSON.stringify(this.state));
    }
    validate(name)
    {
        const errors = {
           author: ''
        };

        if(this.state.touched.author && name.length<=2)
          errors.author='Must be greater than 2 characters';
        else if(this.state.touched.author && name.length>15)
        errors.author='Must be 15 characters or less';
          return errors;
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

    render(){
        const errors = this.validate(this.state.author);
        return(
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label htmlFor="rating">Rating</Label>                      
                       
                        <Input type="select" name="rating" id="rating" md={10}  onChange={this.handleInputChange}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                   
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="author">Your Name</Label>
                        <Input type="text"  name="author" id="author" 
                        valid={errors.author === ''}
                        invalid={errors.author !== ''}
                       onBlur={this.handleBlur('author')}
                       onChange={this.handleInputChange}
                       />
                        <FormFeedback>{errors.author}</FormFeedback>
                   </FormGroup>
                   <FormGroup >
                       <Label htmlFor="comment">Comment</Label>
                       <Input type="textarea" name="comment" id="comment"  onChange={this.handleInputChange}/>
                    </FormGroup>
                    
                     
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                </Form>
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
				   <RenderComments comments = {props.comments} />
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