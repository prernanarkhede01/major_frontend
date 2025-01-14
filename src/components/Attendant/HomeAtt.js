import React, { useState, useRef, useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import CountUp from 'react-countup';
import { Link, useLocation, useHistory } from "react-router-dom";
import creditContext from '../../context/credits/creditContext';
import AttSidebar from '../Sidebar/AttSidebar';
import Swal from 'sweetalert2'
import axios from 'axios'


const HomeAtt = () => {
  
    

    const context = useContext(creditContext);
    const {  searchByvno,request, getrequest, completerequest,cardpump,getcardpumpat ,handleToggle} = context;

    const [vehicleNo,setVehicleNo]=useState("")
    
  const [file, setfile] = useState({selectedfile:null})
  const onChangeHandler=(e)=>{
setfile({selectedfile:e.target.files[0]})
  }
  const onScanClick = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    
    axios
    .post("http://localhost:5001/api/fuel/uploadqr", data)
    .then(res => {
       console.log("res.statusText",res.statusText);
       
    })
    .catch(err => {
       console.log(err);
    });
 };

    useEffect(() => {
        getrequest();
        getcardpumpat();
    }, [request])

    console.log("request get", request)

    const handleSearch=()=>{
        console.log("search",vehicleNo);
        searchByvno(vehicleNo);
    }
    const handleChange=(e)=>{
        setVehicleNo(e.target.value);
    }

   
   
    return (

        <div>

            <Navbar />
            {/* <AddCust/> */}
            {/* prajakta branch */}
            {/* <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}


            <div className="d-flex" id="wrapper">
                {/* {toggle && <div style={{ backgroundColor: "#3282B8" }} id="sidebar-wrapper">
                    <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                        className="fas fa-user-secret me-2"></i>FuelBuddy</div>
                    <div className="list-group list-group-flush my-3">
                        <a href="/" className="list-group-item list-group-item-action bg-transparent second-text active"><i
                            className="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                        <a href="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-project-diagram me-2"></i>Customers</a>
                        <a href="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-paperclip me-2"></i>Daily Transactions</a>
                        <a href="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-chart-line me-2"></i>About</a>


                        <a href="/" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                            className="fas fa-power-off me-2"></i>Logout</a>
                    </div>
                </div>} */}
                <AttSidebar/>

                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" onClick={handleToggle} id="menu-toggle"></i>
                            <h2 className="fs-2 m-0">Dashboard</h2>
                        </div>
{/* 
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle second-text fw-bold" href="/" id="navbarDropdown"
                                        role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user me-2"></i>John Doe
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/">Profile</a></li>
                                        <li><a className="dropdown-item" href="/">Settings</a></li>
                                        <li><a className="dropdown-item" href="/">Logout</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div> */}
                    </nav>

                    <div className="row g-3 my-2 w-auto px-4">
                        <div className="col-md-3">
                            <div className="p-3 text-light bg-dark shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">{cardpump.total_req}</h3>
                                    <p className="fs-5">Total Requests</p>
                                </div>
                                <i className="fas fa-regular fa-clipboard-list fs-1 third-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3  text-light bg-dark shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">{cardpump.pending_req}</h3>
                                    <p className="fs-5">Pending Requests</p>
                                </div>
                                <i className="fas fa-regular fa-hourglass-start fs-1 third-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="p-3  text-light bg-dark shadow-sm d-flex justify-content-around align-items-center rounded">
                                <div>
                                    <h3 className="fs-2">{cardpump.completed_req}</h3>
                                    <p className="fs-5">Completed Requests</p>
                                </div>
                                <i className="fas fa-regular fa-thumbs-up fs-1 third-text border rounded-full secondary-bg p-3"></i>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid px-4">
                        <div className="row g-3 my-2">
                            {/* Search Bar */}
                            <div className="input-group">
                                <div className="form-outline">
                                    <input onChange={handleChange} onBlur={()=>{getrequest()}} type="search" placeholder="Search Bar" id="form1" className="form-control" />
                                </div>

                                <button onClick={handleSearch} type="button" className="btn btn-primary">
                                    <i className="fas fa-search btn m-0"></i>
                                </button>
                           
                            </div>
                            <div>
                            <input type="file" onChange={onChangeHandler} />
                                <button onClick={onScanClick}><i className="fas fa-qrcode"></i></button>
                            </div>


                        </div>

                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Pending Requests</h3>
                            <div className="col">
                                {request?.length === 0 && 'No Pending Requests'}
                                {request?.map((req) => {
                                    return (
                                        <div class="card mt-4">
                                            {/* <h5 class="card-header">Customer Name</h5> */}

                                            <div class="card-body card">
                                               <div>
                                               <span> <button class="btn btn-lg float-end fs-4 third-text border rounded-full secondary-bg p-3"> <i class="fa fa-download"></i>  </button></span>                                     <p class="card-text">Transaction Id : {req?.transaction_no}</p>
    
                                               <h5 class="card-title">Vehicle Number: {req?.vehicle_no}</h5>
                                                <p class="card-text">Customer ID: {req?.vehicle_owner?._id}</p>
                                                <p class="card-text">Customer Name :{req?.vehicle_owner?.name}</p>
                                                <p class="card-text">Requested Credit: {req?.debit}</p>
                                                </div>
                                                <button class="btn btn-outline-primary" onClick={async() => {
                                                    const ans= await completerequest(req._id);
                                                    if(ans.success) {
                                                        Swal.fire(
                                                            'Done!',
                                                            'Fuel Delivered Successfully!',
                                                            'success'
                                                          )
                                                    }
                                                }}>Request Complete</button>
                                                
                                            </div>
                                        </div>)
                                })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeAtt