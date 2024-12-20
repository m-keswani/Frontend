import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';

const UserProfile = () => {
  return (
    <section className="h-100 gradient-custom-2">
      <div className="p-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-7">
            <div className="">
              <div
                className="rounded-top text-white d-flex flex-md-row flex-column"
                style={{ backgroundColor: '#000', minHeight: '200px' }}
              >
                <div className="ms-4 mt-5 pt-2 d-flex flex-column" style={{ width: '150px' }}>
                  <BsPersonCircle size={130} />
                </div>
                <div className="ms-3 pl-4" style={{ marginTop: '10px',paddingTop: '90px' }}>
                  <h5>Full Name</h5>
                  <p className="">Email id</p>
                </div>
                <div className='mb-5' style={{  marginTop: 'auto' }}>
                  <button className='ms-5 btn btn-outline-light' style={{ marginTop: '10px' }}>Logout</button>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-center align-items-center py-1">
                  <div className="text-center">
                    <p className="mb-1 h5">5</p>
                    <p className="small text-muted mb-0">Total orders</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">10</p>
                    <p className="small text-muted mb-0">Cart items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
