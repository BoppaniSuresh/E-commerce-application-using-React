// import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
// import Message from '../components/Message'
// import { addToCart, removeFromCart } from '../actions/cartActions'

// const CartScreen = ({ match, location, history }) => {
//   const productId = match.params.id

//   const qty = location.search ? Number(location.search.split('=')[1]) : 1

//   const dispatch = useDispatch()

//   const cart = useSelector((state) => state.cart)
//   const { cartItems } = cart

//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart(productId, qty))
//     }
//   }, [dispatch, productId, qty])

//   const removeFromCartHandler = (id) => {
//     dispatch(removeFromCart(id))
//   }

//   const checkoutHandler = () => {
//     history.push('/login?redirect=shipping')
//   }

//   return (
//     <Row>
//       <Col md={8}>
//         <h1>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <Message>
//             Your cart is empty <Link to='/'>Go Back</Link>
//           </Message>
//         ) : (
//           <ListGroup variant='flush'>
//             {cartItems.map((item) => (
//               <ListGroup.Item key={item.product}>
//                 <Row>
//                   <Col md={2}>
//                     <Image src={item.image} alt={item.name} fluid rounded />
//                   </Col>
//                   <Col md={3}>
//                     <Link to={`/product/${item.product}`}>{item.name}</Link>
//                   </Col>
//                   <Col md={2}>${item.price}</Col>
//                   <Col md={2}>
//                     <Form.Control
//                       as='select'
//                       value={item.qty}
//                       onChange={(e) =>
//                         dispatch(
//                           addToCart(item.product, Number(e.target.value))
//                         )
//                       }
//                     >
//                       {[...Array(item.countInStock).keys()].map((x) => (
//                         <option key={x + 1} value={x + 1}>
//                           {x + 1}
//                         </option>
//                       ))}
//                     </Form.Control>
//                   </Col>
//                   <Col md={2}>
//                     <Button
//                       type='button'
//                       variant='light'
//                       onClick={() => removeFromCartHandler(item.product)}
//                     >
//                       <i className='fas fa-trash'></i>
//                     </Button>
//                   </Col>
//                 </Row>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Col>
//       <Col md={4}>
//         <Card>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>
//                 Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                 items
//               </h2>
//               $
//               {cartItems
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Button
//                 type='button'
//                 className='btn-block'
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </Button>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//       </Col>
//     </Row>
//   )
// }

// export default CartScreen

import React, { useEffect } from "react";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../store/store";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const Price = useSelector((state) => state.cart.Price);

  useEffect(() => {
    CalPrice();
  }, [cartItems]);
  const removeFromCartHandler = (e) => {
    dispatch(cartAction.RemoveFromCart(e));
  };
  const CalPrice = () => {
    dispatch(cartAction.MakePrice());
    dispatch(cartAction.CalculatePrice());
  };
  return (
    <>
    <Link to="/" className="btn btn-black my-3">
        Go Back
      </Link>
    <Row>
      <Col md={8}>
      <h1>Cart</h1>
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>{item.name}</Col>
                <Col md={2}>₹{item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) => {
                      dispatch(
                        cartAction.ChangeQty({
                          id: item.id,
                          qty: e.target.value,
                        })
                      );

                      CalPrice();
                    }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={1}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal items</h2>
              Rs.{Price}
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to='/shipping'>
              <Button type="button" className="btn-block">
                Proceed To Checkout
              </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    </>
  );
};

export default CartScreen;
