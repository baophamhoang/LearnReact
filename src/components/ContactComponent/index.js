import React from 'react';
import { Breadcrumb, BreadcrumbItem,
            Button, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors} from 'react-redux-form'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkype } from '@fortawesome/free-brands-svg-icons'
import { 
    faPhone,
    faFax,
    faEnvelope,
    faEnvelopeOpen
 } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import {  postFeedbacks } from '../../redux/actions';
import { v4 as uuidv4} from 'uuid';

//  Validations
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


function Contact() {
    const dispatch = useDispatch();
    const handleSubmit = (e, id) => {
        const payload = {...e};
        payload.id = uuidv4();
        payload.date = new Date().toISOString();
        dispatch(postFeedbacks(payload));
    }

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>: +852 1234 5678<br />
                        <FontAwesomeIcon icon={faFax}></FontAwesomeIcon>: +852 8765 4321<br />
                        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> Call</a>
                        <a role="button" className="btn btn-info"><FontAwesomeIcon icon={faSkype}></FontAwesomeIcon> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><FontAwesomeIcon icon={faEnvelopeOpen}></FontAwesomeIcon> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                    <div className="col-12 col-md-9">
                    <LocalForm model='.feedback' onSubmit={(e, id) => handleSubmit(e)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors 
                                        className='text-danger'
                                        model='.firstname'
                                        show='touched'
                                        messages={{
                                            required: 'Don\'t leave a blank. ',
                                            minLength: 'Must be greater than 2 characters. ',
                                            maxLength: 'Must be 15 characters or less. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                         />
                                        <Errors
                                            className='text-danger'
                                            model='.lastname'
                                            show='touched'
                                            messages={{
                                                required: 'Don\'t leave a blank. ',
                                                minLength: 'Must be greater than 2 characters. ',
                                                maxLength: 'Must be 15 characters or less. '
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(6),
                                            maxLength: maxLength(15),
                                            isNumber
                                        }}
                                         />
                                         <Errors
                                            className='text-danger'
                                            model='.lastname'
                                            show='touched'
                                            messages={{
                                                required: 'Don\'t leave a blank. ',
                                                minLength: 'Must be greater than 6 characters. ',
                                                maxLength: 'Must be 15 characters or less. ',
                                                isNumber: 'Must be a number. '
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                            placeholder="Email"
                                            className="form-control"
                                            validators={{
                                                required, validEmail
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required: 'Required. ',
                                                validEmail: 'Invalid Email Address. '
                                            }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" defaultValue={false}
                                                className="form-check-input"  
                                                 /> {' '}
                                                <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control" defaultValue='Tel.'>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
               </div>

        </div>
    );
}


export default Contact;