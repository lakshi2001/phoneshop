import React, { useState , useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBCardFooter
} from 'mdb-react-ui-kit';

import axios from 'axios';
import Navbar from './nav';

interface ProductData {
  _id: string;
  productName: string;
  productPrice: string;
  productQuantity: string;
  productCondition: string;
  productImage: string;
  status : string,
  timestamps: {
    createdAt: Date;
    updatedAt: Date;
  };
}

function CusDash(): JSX.Element {
 
  const [allProducts, setAllProducts] = useState<ProductData[]>([]);

  const fetctProductData = async () => {
      try {
          const response = await axios.get<ProductData[]>('http://localhost:5000/products/allProducts'); 
          setAllProducts(response.data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
  }

  useEffect(() => {
      fetctProductData();
  }, []); 

  function view_product(phone: ProductData): void {
    const queryParams = new URLSearchParams();
  
    for (const key in phone) {
      if (phone.hasOwnProperty(key)) {
        const value = phone[key as keyof ProductData];
  
        // Handle the timestamps object separately
        if (key === 'timestamps') {} else {
          queryParams.append(key, String(value));
        }
      }
    }
  
    const url = `../customer/viewProduct?${queryParams.toString()}`;
    
    window.location.href = url;
  }

 return (
    <>
    <Navbar/>
    <div style={{backgroundColor : '#E2E7E9' , paddingBottom:'6%'}}>
      <div className='text-center mb-4 pt-5'>
        <h1 className='text-decoration-underline'>Buy Products</h1>
      </div>
      <div className='container'>
        <MDBRow className='row'>
          {/* <MDBCol className='col-3'>
            <div className='card shadow-0'>
              <div className='card-body border rounded' style={{backgroundColor:'#FFFFFF'}}>
                
              </div>
            </div>
          </MDBCol> */}
          <MDBCol className='col-12'>
            <div className='card shadow-0'>
              <div className='card-body border rounded '  style={{backgroundColor:'#FFFFFF'}}>
                 <MDBRow className='row'>
                  {allProducts.map(phone => (
                    <MDBCol key={phone._id} className='col-3 mb-3 ' >
                      <MDBCard className='card shadow-0 border'>
                        <MDBCardBody className='card-body'>
                          <div className='text-center'>
                            <svg width='100' height='100'>
                              <image href={phone.productImage} width='100%' height='100%' />
                            </svg>
                          </div>
                          <h5 className='card-title mt-5'>{phone.productName}</h5>
                          <span className='card-text'>Price: Rs. {phone.productPrice}</span><br/>
                          <span className='card-text'>Condition: {phone.productCondition}</span><br/>
                          <span className='card-text'>Status: {phone.status}</span>
                        </MDBCardBody>
                        <MDBCardFooter className='m-0 p-0'>
                          <button className='btn btn-dark btn-block' style={{letterSpacing:'2px'}} onClick={()=>view_product(phone)}>View Product</button>
                        </MDBCardFooter>
                      </MDBCard>
                    </MDBCol>
                  ))}
                 </MDBRow>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
    
    </>
  );
}

export default CusDash;