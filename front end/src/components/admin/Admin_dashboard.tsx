import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import NavBar from './Nav';

function AdminDash() {
 
  function product_action(){
    window.location.href = "../admin/product";
  }    
  
  function orderAction(){
    window.location.href = "../admin/order";
  }  
  
 
  return (
    <>
    <NavBar/>
    <div style={{backgroundColor : '#E2E7E9'}}>
        <div className="container pt-5" >       
            <div className='container' style={{paddingTop:'5%'}}>
                <MDBRow className='pt-5 pb-5' style={{backgroundColor:'#1C1C1C' , borderRadius:'32px'}}>
                    <MDBCol sm='7'>
                    <MDBCard class="bg-transparent">
                        <MDBCardBody style={{paddingTop:'15%', paddingLeft:'15%'}}>
                        <MDBCardTitle className='text-warning text-uppercase' style={{fontSize:'50px' , letterSpacing:'2px' , fontWeight:'600'}} >Admin Dashboard</MDBCardTitle>
                        <h4 className=' fw-light' style={{color:'#EAEAE9' , letterSpacing:'15px'}}>The Mobile Shop</h4>
                        <br/>
                        <hr />
                        </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    <MDBCol sm='5' >
                    <MDBCard  class="bg-transparent text-end">
                        <img src="../img/Admin-cuate.png" style={{width:'87%'}}/>
                    </MDBCard>
                    </MDBCol>
                </MDBRow> 
                <hr/>
                <br/>
                <MDBRow className='pb-5'>
                    
                    <MDBCol sm='4' className='mt-4' style={{cursor:'pointer'}} onClick={product_action}>
                        <MDBCard>
                        <MDBCardBody className='text-center p-4' >
                            <br/>
                            <img src='../img/admin-phone.png' style={{width:'80%'}} />
                            <MDBCardTitle tag='h2' className='pt-4 text-uppercase'>PRODUCT </MDBCardTitle>
                            
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol sm='4' className='mt-4' style={{cursor:'pointer'}}>
                        <MDBCard onClick={orderAction}>
                        <MDBCardBody className='text-center p-4' >
                            <br/>
                            <img src='../img/order.png' style={{width:'60%'}} />
                            <MDBCardTitle tag='h2' className='pt-4 text-uppercase'>ORDERS </MDBCardTitle>
                            
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol> 
                    <MDBCol sm='4' className='mt-4' style={{cursor:'pointer'}}>
                        <MDBCard >
                        <MDBCardBody className='text-center p-4' >
                            <br/>
                            <img src='../img/chat.png' style={{width:'65%'}} />
                            <MDBCardTitle tag='h2' className='pt-4 text-uppercase'>CHATS </MDBCardTitle>
                            
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>         
                </MDBRow>
            </div>
        </div>
    </div>
    </>
  );
}

export default AdminDash;
