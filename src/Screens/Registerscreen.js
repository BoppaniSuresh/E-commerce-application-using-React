import React, { useState, useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
//import { register } from '../actions/userActions'

const RegisterScreen = ({  users }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token , setToken] = useState('')
  const [message, setMessage] = useState(null)
  const [alert,setAlert] = useState(null)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault()
    if(name == ''){
      setMessage("Name is required")
     
      return;
    }
    if(email == ''){
      setEmail("Email is required")
      window.alert(email)
      return;
    }else if(!/\S+@\S+\.\S+/.test(email)){
      setMessage("Email is invalid")
    
      return;
    }
    if(password == null){
      setMessage("Password is required")
     
      return;
    }
    if(password != confirmPassword){
      setMessage("Passwords Do not Match")
      window.alert(message);
     return;
    }

    if(password != confirmPassword){
      setMessage("Passwords Do not Match")
      
      return;
    }
    
    else{
      const user = {
        "name" : name,
        "email" : email,
        "password" : password,
        "Token" : token
      
      }
 
     await fetch("http://localhost:8000/users",{
       method : 'POST',
       body : JSON.stringify(user),
       headers : {'Content-Type' : 'application/json'}
      })
    navigate("/login")
    
  }
}

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {/* {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>AdminToken</Form.Label>
          <Form.Control
            type='Token'
            placeholder='Enter Token'
            value={token}
            onChange={(e) => setToken(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to='/login'>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen