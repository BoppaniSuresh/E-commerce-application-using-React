import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import Paginate from '../components/Paginate'

const ProductListScreen = () => {
  const [Aproducts,setAproducts] = useState(null)
  useEffect(() => {
    fetch( "http://localhost:8000/products")
    .then(res =>{
      
      return res.json()
       
    })
    .then(res1 =>{
        
        setAproducts(res1)
        
    })
    .catch(err=>{
      console.log(err)
    })
  
    
  }, [Aproducts])

  const HandleDelete = async (id)=>{
    await fetch("http://localhost:8000/products/" + id,{
      method : 'DELETE'
      
     })
     setAproducts((prevAproducts) =>{
      return [...prevAproducts]
     })
  }

return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          {/* <Button className='my-3'  >
            <i className='fas fa-plus'></i> Create Product
          </Button> */}
        </Col>
      </Row>
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {Aproducts && Aproducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* <LinkContainer to={`/admin/product/${product.id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer> */}
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={()=>HandleDelete(product.id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
        </>
 
    </>
  )
}

export default ProductListScreen