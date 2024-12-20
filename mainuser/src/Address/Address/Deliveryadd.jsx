import React, { Component } from 'react';


class BillingForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        companyName: '',
        address: '',
        email: '',
        phone: '',
        additionalInfo: '',
        Postalcode: '',
        Landmark: '',
        State: '',
        City: '',
        isConditionChecked: false, // Add this state variable
        isFormValid: false, // Add this state variable
      };
    }
  
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value }, this.validateForm);
    }
  
    handleConditionCheck = () => {
      this.setState({ isConditionChecked: !this.state.isConditionChecked }, this.validateForm);
    }
  
    validateForm = () => {
      const {
        firstName,
        lastName,
        companyName,
        address,
        email,
        phone,
        Postalcode,
        Landmark,
        State,
        City,
        isConditionChecked,
      } = this.state;
  
      // Check if all required fields are filled and the condition is checked
      const isFormValid = (
        firstName !== '' &&
        lastName !== '' &&
        companyName !== '' &&
        address !== '' &&
        email !== '' &&
        phone !== '' &&
        Postalcode !== '' &&
        Landmark !== '' &&
        State !== '' &&
        City !== '' &&
        isConditionChecked
      );
  
      this.setState({ isFormValid });
    }
  
    render() {
      const { isConditionChecked, isFormValid } = this.state;
  
    return (
        <div className='container justify-content-center'>
          hello
      <div className="row " >
        <div className="col-md-8 mb-4 bd-dark ">
          <div className="m-4 ml-5">
            <div className=" pb-4 pt-3">
              <h5 className="mb-0">Your Address</h5>
            </div>
            <div className="">
              <form>
                <div className="row mb-4">
                  <div className="col">
                    <div className="">
                      <input
                        type="text"
                        id="form7Example1"
                        className="form-control"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                      />
                      <label className="form-label" htmlFor="form7Example1">First name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form7Example2"
                        className="form-control"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                      />
                      <label className="form-label" htmlFor="form7Example2">Last name</label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form7Example3"
                    className="form-control"
                    name="companyName"
                    value={this.state.companyName}
                    onChange={this.handleInputChange}
                  />
                  <label className="form-label" htmlFor="form7Example3">Addresss</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form7Example5"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <label className="form-label" htmlFor="form7Example5">Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="number"
                    id="form7Example6"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                  />
                  <label className="form-label" htmlFor="form7Example6">Phone</label>
                </div>

             
                <div className="row mb-4">
                  <div className="col">
                    <div className="">
                      <input
                        type="text"
                        id="form7Example1"
                        className="form-control"
                        name="Postalcode"
                        value={this.state.Postalcode}
                        onChange={this.handleInputChange}
                      />
                      <label className="form-label" htmlFor="form7Example1">Postal Code </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form7Example2"
                        className="form-control"
                        name="Landmark"
                        value={this.state.Landmark}
                        onChange={this.handleInputChange}
                      />
                      <label className="form-label" htmlFor="form7Example2">Landmark</label>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col">
                    <div className="">
                      <input
                        type="text"
                        id="form7Example1"
                        className="form-control"
                        name="State"
                        value={this.state.State}
                        onChange={this.handleInputChange}
                      />
                      <label className="form-label" htmlFor="form7Example1">State</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form7Example2"
                        className="form-control"
                        name="City"
                        value={this.state.City}
                        onChange={this.handleInputChange}
                      />
                      <label className="form-label" htmlFor="form7Example2">City</label>
                    </div>
                  </div>
                </div>

                <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="conditionCheckbox"
                      checked={isConditionChecked}
                      onChange={this.handleConditionCheck}
                    />
                    <label className="form-check-label" htmlFor="conditionCheckbox">
                      I agree to the terms and conditions
                    </label>
                  </div>


                  <button
                    className='btn btn-dark rounded-pill'
                    disabled={!isFormValid} // Disable the button if the form is not complete
                  >
                    Continue
                  </button>


            </form>
            


            </div>
          </div>
        </div>

        <div className="col-md-4 ">
          <div className=" mb-4">
            <div className="py-3 pt-5">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>$53.98</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including GST)</p>
                    </strong>
                  </div>
                  <span><strong>$53.98</strong></span>
                </li>
              </ul>

             
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default BillingForm;
