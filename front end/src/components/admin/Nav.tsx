import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export default function App() {
  const [openBasic, setOpenBasic] = useState(false);

  function cart(){
    window.location.href = "../customer/Cart";
  }

  function logout(): void {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/'; 
        Cookies.remove("user_name");
      }
    });
  }

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer >
        <MDBNavbarBrand href='/customer/dashboard' className='fw-bold text-danger'>The Mobile Shop</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
           

           
          </MDBNavbarNav>

          <div className='d-flex input-group w-auto'>
            <MDBBtn color='dark' className='rounded shadow-0' onClick={logout}>Log&nbsp;Out</MDBBtn>
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}