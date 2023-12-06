import React, { Component } from 'react';
// import Navber from './EmpNavbar';
// import Footer from '../Footer';
import Axios from 'axios';

class Employee extends Component {
  constructor() {
    super();
    this.state = {
      isErrors: false,
      isSuccess: false,
      errorMsg: '',
      successMsg: '',
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      phone_no: '',
      designation: '',
      salary: '',

      patient_id: '',
      doctor_id: '',

      doctor_address: '',
      doctor_first_name: '',
      doctor_last_name: '',
      doctor_email: '',
      doctor_password: '',
      doctor_salary: '',
      doctor_specialization: '',

      bill_patient_email: '',
      medicine_cost: '0',
      room_charge: '0',
      misc_charge: '0',
      operation_charge: '0',

      del_doctor_id: '',

      new_salary: '',
      update_doctor_id: '',
      selected_patient: {},
      doctors: [],
      patients: [],
      errors: {}
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit1 = this.onSubmit1.bind(this)
    this.onSubmit2 = this.onSubmit2.bind(this)
    this.onSubmit3 = this.onSubmit3.bind(this)
    this.onSubmit4 = this.onSubmit4.bind(this)
    this.onSubmit5 = this.onSubmit5.bind(this)
    this.clearToast = this.clearToast.bind(this);
  }

  clearToast() {
    if (this.state.isErrors || this.state.isSuccess) {
      setInterval(() => {
        this.setState({ isErrors: false, isSuccess: false });
      }, 5000);
    }
  }

  onChange(e) {
    if (e.target.name === 'patient_id') {
      const selectedPatient = this.state.patients.find(patient => patient.patient_id === parseInt(e.target.value));
      this.setState({ selected_patient: selectedPatient });
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit1(e) {
    e.preventDefault();

    const ass_doc = {
      patient_id: this.state.patient_id,
      doctor_id: this.state.doctor_id
    }

    Axios.post('/admin/assign_doctor', ass_doc)
      .then(response => {
        this.setState({ isSuccess: true });
        this.setState({ successMsg: 'Assigned Successful!' });
        this.clearToast();
        return response.data;
      })
      .catch(err => {
        this.setState({ isErrors: true });
        this.setState({ errorMsg: 'Assignment Failed!' });
        this.clearToast();
        console.log(err);
      });
  }

  onSubmit2(e) {
    e.preventDefault();

    const ass_doc = {
      first_name: this.state.doctor_first_name,
      address: this.state.doctor_address,
      last_name: this.state.doctor_last_name,
      email: this.state.doctor_email,
      password: this.state.doctor_password,
      salary: this.state.doctor_salary,
      specialisation: this.state.doctor_specialization,
      shift_time: '10:00 - 02:00'
    }

    Axios.post('/doctor/register', ass_doc)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  onSubmit3(e) {
    e.preventDefault();

    const reqObj = {
      patient_email: this.state.bill_patient_email,
      medicine_cost: this.state.medicine_cost,
      room_charge: this.state.room_charge,
      misc_charge: this.state.misc_charge,
      operation_charge: this.state.operation_charge
    };

    Axios.post('/admin/bill', reqObj)
      .then(res => {
        this.setState({ isSuccess: true });
        this.setState({ successMsg: 'Bill Generate!' });
        this.clearToast();
        return res.data;
      })
      .catch(err => {
        this.setState({ isErrors: true });
        this.setState({ errorMsg: 'Generation Failed!' });
        this.clearToast();
        console.log(err);
      });
  }

  onSubmit4(e) {
    e.preventDefault();

    const data = {
      doctor_id: this.state.del_doctor_id
    }

    Axios.post('/doctor/delete', data)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));
  }


  onSubmit5(e) {
    e.preventDefault();

    const data = {
      doctor_id: this.state.update_doctor_id,
      salary: this.state.new_salary
    }

    Axios.post('/doctor/update_sal', data)
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }


  componentDidMount() {
    Axios.get('/patient/patientsWithoutDoctors')
      .then(res => {
        const { patients } = res.data;
        this.setState({ patients: patients });
      })
      .catch(err => console.log(err));

    Axios.get('/doctor/allDoctors')
      .then(res => {
        const { doctors } = res.data;
        this.setState({ doctors: doctors });
      })
      .catch(err => console.log(err));

    Axios.get('/admin/details', {
      headers: {
        authorization: sessionStorage.getItem('usertoken')
      }
    })
      .then(res => {
        const details = res.data[0];
        this.setState({
          first_name: details.first_name,
          last_name: details.last_name,
          email: details.email,
          address: details.address,
          phone_no: details.phone_no,
          designation: details.designation,
          salary: details.salary
        });
      });
  }
    render() { 
        return ( 
        <div className="bg-dark" style={{ position: 'relative' }}>
            {/* <Navber /> */}
            {
              this.state.isErrors && (<div class="alert alert-danger" role="alert" style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '5' }}>
              {this.state.errorMsg}
            </div>)
            }

            {this.state.isSuccess && (<div class="alert alert-success" role="alert" style={{ position: 'fixed', top: '0', left: '0', width: '100%', zIndex: '5' }}>
              {this.state.successMsg}
            </div>)}
            <br/>
            <h2 className="text-white" align="center">Admin Home</h2>
            <h3 className="text-white" align="center">Welcome!</h3>
            <br/>            
            <div className="row">
            <div className="col">
            <div className="container ml-3">
        <div className="jumbotron mt-5" style ={{backgroundColor:"#e0e0e0"}}>
          <div className="col-sm-6">
            <h2 className="text-primary">Employee Information</h2>
          </div>
          <br/>

          <table className="table col-md-6" >
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  {this.state.first_name} {this.state.last_name}
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td> {this.state.email} </td>
              </tr>
              <tr>
              <td>Address</td>
              <td> {this.state.address} </td>
            </tr>
            <tr>
            <td>Phone number</td>
                <td> {this.state.phone_no} </td>
            </tr>
            <tr>
                <td>Designation </td>
                <td> {this.state.designation} </td>
            </tr>
            <tr>
                <td>Salary</td>
                <td> {this.state.salary} </td>
            </tr>   

            </tbody>
          </table>
        </div>
      </div>
      </div>
      
      <div className="col mb-1">
      <div className="container mr-3">
      <div className="jumbotron mt-5" style ={{backgroundColor:"#e0e0e0"}}>
      <form noValidate onSubmit={this.onSubmit1} >
        <div className="col-sm-6">
          <h2 className="text-primary">Assign Patient to Doctor</h2>
        </div>
        <br/>
        <div className="form-group">
        <label htmlFor="patient" className='font-weight-bold'>Patient</label>
        <select
          defaultValue=""
          className="form-control"
          name="patient_id"
          onChange={this.onChange}>
            <option disabled={true} value="">
              --Choose and option--
            </option>
            <>
              {this.state.patients.map((patient, i) => {
                return (<option key={i} value={patient.patient_id}>{`${patient.first_name} ${patient.last_name}`}</option>)
              })}
            </>
        </select>
      </div>
      <br/>
      <>
      {this.state.selected_patient.patient_id && <>
        <div className="col-sm-6">
          <h4 className="text-primary">Patient Information</h4>
        </div>
        <br/>
        <table className="table col-md-6" >
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                {`${this.state.selected_patient.first_name || ''} ${this.state.selected_patient.last_name || ''}`}
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td> {this.state.selected_patient.email} </td>
            </tr>
            <tr>
            <td>Address</td>
            <td> {this.state.selected_patient.address} </td>
          </tr>
          <tr>
          <td>Phone number</td>
              <td> {this.state.selected_patient.phone_no} </td>
          </tr>
          <tr>
              <td>Disease </td>
              <td> {this.state.selected_patient.disease} </td>
          </tr>

          </tbody>
        </table>
        <br/>
        </>}
      </>

      <div className="form-group">
        <label htmlFor="doctor" className='font-weight-bold'>Doctor</label>
        <select
          defaultValue=""
          className="form-control"
          name="doctor_id"
          onChange={this.onChange}>
          <option disabled={true} value="">
            --Choose and option--
          </option>
          <>
            {this.state.doctors.map((doctor, i) => {
              return (<option key={i} value={doctor.id}>
                {`${doctor.name}`}
              </option>)
            })}
          </>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-primary btn-block"
      >
      Assign 
      </button>
      </form>
      </div>
    </div>
      </div>
      </div>
  
      <div className="row">
          <div className = "col">
          <div className="container mr-3">
          <div className="jumbotron mt-5" style ={{backgroundColor:"#e0e0e0"}}>
          <form noValidate onSubmit={this.onSubmit2} >
            <div className="col-sm-6">
              <h2 className="text-primary">Add New Doctor</h2>
            </div>
            <br/>
    
            <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              className="form-control"
              name="doctor_first_name"
              placeholder="Enter First Name"
              value={this.state.doctor_first_name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="doctor_last_name"
              placeholder="Enter Room ID"
             value={this.state.doctor_last_name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
          <label htmlFor="name">Address</label>
          <input
            type="text"
            className="form-control"
            name="doctor_address"
            placeholder="Enter Address"
           value={this.state.doctor_address}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
        <label htmlFor="name">Email ID</label>
        <input
          type="text"
          className="form-control"
          name="doctor_email"
          placeholder="Enter Email ID"
         value={this.state.doctor_email}
          onChange={this.onChange}
        />
      </div>
      <div className="form-group">
      <label htmlFor="name">Salary</label>
      <input
        type="text"
        className="form-control"
        name="doctor_salary"
        placeholder="Enter Salary Information"
       value={this.state.doctor_salary}
        onChange={this.onChange}
      />
    </div>
    <div className="form-group">
    <label htmlFor="name">Specialization</label>
    <input
      type="text"
      className="form-control"
      name="doctor_specialization"
      placeholder="Enter Specialization"
     value={this.state.doctor_specialization}
      onChange={this.onChange}
    />
    <div className="form-group">
    <label htmlFor="name">Password</label>
    <input
      type="text"
      className="form-control"
      name="doctor_password"
      placeholder="Generate a Password"
     value={this.state.doctor_password}
      onChange={this.onChange}
    />
  </div>
  </div>
            <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            >
              Add
            </button>
            </form>
          </div>
        </div>
          
          </div>







        <div className = "col">
        <div className="container mr-3">
        <div className="jumbotron mt-5" style ={{backgroundColor:"#e0e0e0"}}>
        <form noValidate onSubmit={this.onSubmit3} >
          <div className="col-sm-6">
            <h2 className="text-primary">Generate Bill for Patient</h2>
          </div>
          <br/>
  
          <div className="form-group">
          <label htmlFor="name">Patient Email</label>
          <input
            type="text"
            className="form-control"
            name="bill_patient_email"
            placeholder="Enter Patient Email"
            value={this.state.bill_patient_email}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Medicine Cost</label>
          <input
            type="text"
            className="form-control"
            name="medicine_cost"
            placeholder="Enter Medicine Cost"
           value={this.state.medicine_cost}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Operation Charge</label>
          <input
            type="text"
            className="form-control"
            name="operation_charge"
            placeholder="Enter Operation Charge"
           value={this.state.operation_charge}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Room Charge</label>
          <input
            type="text"
            className="form-control"
            name="room_charge"
            placeholder="Enter Room Charge"
           value={this.state.room_charge}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Miscellaneous Charge</label>
          <input
            type="text"
            className="form-control"
            name="misc_charge"
            placeholder="Enter Miscellaneous Charge"
           value={this.state.misc_charge}
            onChange={this.onChange}
          />
        </div>
        <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                Generate
                </button>
        </form>
        </div>
      </div>
        </div>
        </div>



        <div className = "row">
          <div className = "col">
         
      <div className="container mr-3">
      <div className="jumbotron mt-5" style ={{backgroundColor:"#e0e0e0"}}>
      <form noValidate onSubmit={this.onSubmit4} >
        <div className="col-sm-6">
          <h2 className="text-primary">Delete Doctor Information</h2>
        </div>
        <br/>
      <div className="form-group">
        <label htmlFor="name">Doctor ID</label>
        <input
          type="text"
          className="form-control"
          name="del_doctor_id"
          placeholder="Enter Doctor ID"
         value={this.state.del_doctor_id}
          onChange={this.onChange}
        />
      </div>
      <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
              Delete
              </button>
      </form>
      </div>
    </div>
    </div>
    <div className="col">
    <div className="container mr-3">
    <div className="jumbotron mt-5" style ={{backgroundColor:"#e0e0e0"}}>
    <form noValidate onSubmit={this.onSubmit5} >
      <div className="col-sm-6">
        <h2 className="text-primary">Update Doctor Salary</h2>
      </div>
      <br/>
    <div className="form-group">
      <label htmlFor="name">Doctor ID</label>
      <input
        type="text"
        className="form-control"
        name="update_doctor_id"
        placeholder="Enter Doctor ID"
       value={this.state.update_doctor_id}
        onChange={this.onChange}
      />
    </div>
    <div className="form-group">
    <label htmlFor="name">New Salary</label>
    <input
      type="text"
      className="form-control"
      name="new_salary"
      placeholder="Enter New Salary of Doctor"
     value={this.state.new_salary}
      onChange={this.onChange}
    />
  </div>
    <button
              type="submit"
              className="btn btn-lg btn-primary btn-block"
            >
            Update Salary
    </button>
    </form>
    </div>

    </div>
        </div>
        </div>

    <br/>
    <br/>
    {/* <Footer /> */}
                
  </div> 
        );
    }
}
 
export default Employee;