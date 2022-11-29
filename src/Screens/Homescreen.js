import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Products from '../components/Products'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'


const HomeScreen = ({ match ,products }) => {
  //const keyword = match.params.keyword

  //const pageNumber = match.params.pageNumber || 1



  return (
    <>
      <Meta />
      {/* {!keyword ? ( */}
      <Container fluid>
        <ProductCarousel products={products}/>
      </Container>
        
     
      {/* ) : ( */}
        {/* <Link to='/' className='btn btn-light'>
          Go Back
        </Link> */}
      {/* )} */}
      <h1>Latest Products</h1>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : ( */}
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Products product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={1}
            page={1}
            // keyword={keyword ? keyword : ''}
          />
        </>
      {/* )} */}
    </>
  )
}

export default HomeScreen