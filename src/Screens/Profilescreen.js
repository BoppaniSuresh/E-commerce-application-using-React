import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [update,setUpdate] = useState(null)
  
  let flag = 0
  let userupdate = {}
  
  
  const submitHandler = async (e) => {
    e.preventDefault()
    if(password!=confirmPassword){

      setMessage('Passwords do not match')
      return;
    }
    else{
      await fetch('http://localhost:8000/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                if(user.email === email&&password==""){
                    flag = 1
                    userupdate = {
                        ...user,
                        id: user.id,
                        name: name
                    }
                }
                if(user.email === email&&password!=""){
                  flag = 1
                  userupdate = {
                      ...user,
                      id: user.id,
                      name: name,
                      password: password
                  }
              }
            })
        })

        if(flag === 1){
            console.log(userupdate);
            fetch(`http://localhost:8000/users/${userupdate.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userupdate)
          })
        setUpdate(true)
    }
    
    

      
      }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {update && <Message variant='success'>{"Updated Succesfully"}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        
        {/* {success && <Message variant='success'>Profile Updated</Message>} */}
        {/* {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : ( */}
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

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
             
              </tr>
            </thead>
            <tbody>
              {/* {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        
      </Col>
    </Row>
  )
}

export default ProfileScreen