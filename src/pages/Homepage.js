import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './components/css/custom.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BulletList } from 'react-content-loader';
import MenuItem from '@material-ui/core/MenuItem';
import MaterialUIForm from 'material-ui-form';
import Select from 'react-select';
import CsvIcon from './components/csv.png';
import {CSVLink} from 'react-csv';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, dateFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';


import Header from './components/Header';
import Sidebar from './components/Sidebar';


const socket = new Pusher('223aca0f0c8175acf4b3', {
	cluster: 'ap1',
	encrypted: true
});

const columns = [
	{
		dataField: 'firstname',
		text: 'Name',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	},{
		dataField: 'access_type',
		text: 'Access Type',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	}
	,{
		dataField: 'role',
		text: 'Role',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	},
	{
		dataField: 'direct_head',
		text: 'Direct Head',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	},
	{
		dataField: 'department',
		text: 'Department',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	},
	{
		dataField: 'email',
		text: 'Email',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	},
	{
		dataField: 'client',
		text: 'Client',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	},
	{
		dataField: 'hand_over_date',
		text: 'Handover Date',
		sort: true,
		filter: textFilter({
			placeholder: 'Search',
		})
	}
];

const accessTypes = [
	{
		value: '',
		label: 'Select...'
	},
	{
		value: 'Super User',
		label: 'Super User'
	},
	{
		value: 'Administrator',
		label: 'Administrator'
	},
	{
		value: 'Manager',
		label: 'Manager'
	},
	{
		value: 'User',
		label: 'User'
	}
];

const department = [
	{
		value: '',
		label: 'Select...'
	},
	{
		value: 'Operation',
		label: 'Operation'
	},
	{
		value: 'IT',
		label: 'IT'
	},
	{
		value: 'Accounting',
		label: 'Accounting'
	},
	{
		value: 'HR',
		label: 'HR'
	},
	{
		value: 'Training',
		label: 'Training'
	},
	{
		value: 'Marketing',
		label: 'Marketing'
	},
	{
		value: 'Support',
		label: 'Support'
	}
];

const headers = [
	{label: 'Name', key: 'name'},
	// {label: 'Last Name', key: 'lastname'},
	// {label: 'Email', key: 'email'},
  ];

const defaultSorted = [{
	dataField: 'firstname',
	order: 'asc'
}];

export default class Homepage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			show: false,
			divWidth: false,
			modalShow: false,
			addedNew: false,
			selectedFile: null,
			open: false,
			results:[],
			realUsers:[],
			users:[],
			countries: [],
			roles:[],
			heads:[],
			allusers:[],
			companies: [],
			clients:[],
			scroll: 'paper',
			street_type: '',
			country: '',
			selectedOption: null,
			dataSet3:[],
			usersData:[]
		};

		this.handleHide = this.handleHide.bind(this);
	}

	addNewUser(addUser) {
		axios.request({
			method:'post',
			url:'http://localhost/vbptimetaskmanagement/api/vbpapi/users/adduser',
			data: addUser
		}).then(response => {
			this.setState({open: false});
			const payload = {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				access_type: this.state.access_type,
				role: this.state.role,
				allroles: this.state.roles,
				head: this.state.direct_head,
				allheads: this.state.heads,
				department: this.state.department,
				email: this.state.email,
				hand_over_date: this.state.hand_over_date
			};
			axios.post('http://localhost:8080/users', payload);
		}).catch(err => console.log(err));
	}

	submit = (values, pristineValues) => {
		this.addNewUser(values);
		console.log(values);
	}

	customInputHandler = (value, { name }, event) => {
		this.setState({
			[name]: value
		});
		
		console.log(name);
	}

	imgStyle = {
		height: '25px'
	};

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	  }

	getData() {
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allusers`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({allusers:data, isLoading: false});
		});
	}

	getRoles() {
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allroles`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({roles: data});
		});
	}

	getDirectHead() {
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allheads`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({heads: data});
		});
	}

	handleClickOpen = scroll => () => {
		this.setState({ open: true, scroll });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleClickOpenEdit = scroll => (e) => {
		this.setState({ open: true, scroll });
	};

	handleHide() {
		this.setState({modalShow: false});
	}

	componentDidMount() {
		$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
		$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
		$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
		$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
		$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
		$(".react-bootstrap-table th:eq(6)").children("input").attr('style','display: none');
		$(".react-bootstrap-table th:eq(7)").children("input").attr('style','display: none');
		this.setState( { isLoading: true });
		this.getRoles();
		this.getDirectHead();
		this.getData();
		this.getDataUsers();
		const channel = socket.subscribe('user');
		channel.bind('users', (data) => {
			this.setState({ realUsers: [...this.state.realUsers, data]});
		});
		let initialClients = [];
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allclients`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialClients = data.map(suggestion => ({
				name: 'testname',
				value: suggestion.id,
				label: suggestion.name,
			}));
			this.setState({clients: initialClients});
		});

		let allUsers = [];
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allusers`)
		.then(response => {
			return response.json();
		}).then(data => {
			allUsers = data.map(user => ({
				name: user.firstname+' '+user.lastname
			}));
			this.setState({dataSet3: allUsers});
		});
	
	}

	getDataUsers() {
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allusers`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({usersData:data});
		});
	}

	change = (event) => {
		this.setState({value: event.target.value});
		if (event.target.value == 1) {
			if($(".react-bootstrap-table th:eq(0)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(0)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
		} else if (event.target.value == 2) {
			if($(".react-bootstrap-table th:eq(1)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(1)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
		} else if (event.target.value == 3) {
			if($(".react-bootstrap-table th:eq(2)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(2)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
		} else if (event.target.value == 4) {
			if($(".react-bootstrap-table th:eq(3)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(3)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
		} else if (event.target.value == 5) {
			if($(".react-bootstrap-table th:eq(4)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(4)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
		} else if (event.target.value == 6) {
			if($(".react-bootstrap-table th:eq(5)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(5)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
		} else if (event.target.value == 7) {
			if($(".react-bootstrap-table th:eq(6)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(6)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(6)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(6)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(7)").children("input").attr('style','display: none');
		} else if (event.target.value == 8) {
			if($(".react-bootstrap-table th:eq(7)").children("input").hasClass("beenClicked")) {
				$(".react-bootstrap-table th:eq(7)").children("input").attr('style','display: visible');
			} else {
				$(".react-bootstrap-table th:eq(7)").children("input").attr('style','display: visible');
			}
			$(".react-bootstrap-table th:eq(7)").children("input").addClass("beenClicked");
			$(".react-bootstrap-table th:eq(0)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(1)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(2)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(3)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(4)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(5)").children("input").attr('style','display: none');
			$(".react-bootstrap-table th:eq(6)").children("input").attr('style','display: none');
		}
	}

    render() {
		const { isLoading } = this.state;
		const { selectedOption } = this.state;
        return (
			<div>
				<Header />
				<div className="d-flex align-items-stretch">
				<Sidebar />
					<div className="page-content">
						<div className="page-header  no-margin-bottom Aleft">
							<div className="container-fluid">
								<div className="h5 no-margin-bottom">
									<h2>Users <button className="btn btn-warning" onClick={this.handleClickOpen('body')}> <i className="fa fa-plus"></i> &nbsp; Add User </button></h2>  
									<select id="lang" onChange={this.change} value={this.state.value} className="selectSearchDropdown">
									    <option value="">-- Search By --</option>
										<option value="1">Name</option>
										<option value="2">Access Type</option>
										<option value="3">Role</option>
										<option value="4">Direct Head</option>
										<option value="5">Department</option>
										<option value="6">Email</option>
										<option value="7">Client</option>
										<option value="8">Handover Date</option>
									</select>
								</div>
							</div>
						</div><br />
						<section className="no-padding-top">
							<div className="container-fluid">
								<div className="row Aleft">
									<div className='col-lg-12'>
										<div className="block margin-bottom-sm">
											{	isLoading ? 
												(
													<div>
														
													</div>
												): 
												(
													<div>
														<CSVLink filename={"users.csv"} data={this.state.dataSet3} headers={headers}>
															<img src={CsvIcon} className="img-responsive avatar" alt="logo" className="imgExportCSV"/>
														</CSVLink>
													</div>
												)
											}
											<BootstrapTable striped condensed hover
												bootstrap4
												keyField="id"
												data={ this.state.usersData }
												columns={ columns }
												defaultSorted={ defaultSorted } 
												pagination={ paginationFactory() }
												filter={ filterFactory() }
												cellEdit={ cellEditFactory({ mode: 'click' }) }
											/>
											<div className="table-responsive">
												{
													isLoading ? (
														<div className="col-lg-12"><BulletList height={140} speed={2} primaryColor={'#333'} secondaryColor={'#999'}/></div>
													) : (
														<div className="divTable">
															{/* <div className="divTableHeading">
																<div className="divTableRow">
																	<div className="divTableHead">Name</div>
																	<div className="divTableHead">Access Type</div>
																	<div className="divTableHead">Role</div>
																	<div className="divTableHead">Direct Head</div>
																	<div className="divTableHead">Department</div>
																	<div className="divTableHead">Email</div>
																	<div className="divTableHead">Client</div>
																	<div className="divTableHead">Handover Date</div>
																	<div className="divTableHead w5">Action</div>
																</div>
															</div> */}
															<div className="divTableBody"> 
																{this.state.realUsers.map(result => {
																return (
																	<div className="divTableRow" key={result.id}>
																		<div className="divTableCell">
																			<img src="https://placeimg.com/128/128/tech" className="h25 img-fluid rounded-circle" />
																			&nbsp;&nbsp;&nbsp;&nbsp; 
																			{result.firstname.substr(0, 1).toUpperCase()}{result.firstname.substr(1)} &nbsp;
																			{result.lastname.substr(0, 1).toUpperCase()}{result.lastname.substr(1)}
																		</div>
																		 <div className="divTableCell">
																			{result.access_type}
																		</div>
																		<div className="divTableCell">
																			{ 
																				result.allroles.map((role,i) => {
																				if(role.id == result.role) {
																						return (
																							<div key={i}>
																								{role.name}
																							</div>
																						)
																					}
																				} ) 
																			}
																		</div>
																		<div className="divTableCell">
																			{ 
																				result.allheads.map((head,i) => {
																					if(head.id == result.head) {
																						return (
																							<div key={i}>
																								<img src="https://placeimg.com/128/128/people" style={this.imgStyle} className="img-fluid rounded-circle" />
																								&nbsp;&nbsp;&nbsp;&nbsp;{head.name}
																							</div>
																						)
																					}
																				} ) 
																			}
																		</div>
																		<div className="divTableCell">
																			{result.department}
																		</div>
																		<div className="divTableCell">
																			{result.email}
																		</div>
																		<div className="divTableCell">
																			---
																		</div>
																		<div className="divTableCell">
																			{result.hand_over_date}
																		</div>
																		<div className="divTableCell text-center">
																			<span className="fa fa-pencil text-warning addcompany" id={result.compid} onClick={this.handleClickOpenEdit('body')}></span>
																		</div>
																	</div>
																);
																})}
															</div>
															{/* <div className="divTableBody">
																{
																	this.state.allusers.map((user) => {
																		return(
																			<div className="divTableRow" key={user.id}>
																				<div className="divTableCell">
																					<img src="https://placeimg.com/128/128/tech" style={this.imgStyle} className="img-fluid rounded-circle" />
																					&nbsp;&nbsp;&nbsp;&nbsp; 
																					{user.firstname.substr(0, 1).toUpperCase()}{user.firstname.substr(1)} {user.lastname.substr(0, 1).toUpperCase()}{user.lastname.substr(1)}
																				</div>
																				<div className="divTableCell">
																					{user.access_type}
																				</div>
																				<div className="divTableCell">
																					{ 
																						this.state.roles.map((role, i) => {
																							if(role.id == user.role) {
																								return (
																									<div key={i}>
																										{role.name} 
																									</div>
																								)
																							}
																						} ) 
																					}
																				</div>
																				<div className="divTableCell">
																					{ 
																						this.state.heads.map((head, i) => {
																							if(head.id == user.direct_head) {
																								return (
																									<div key={i}>
																										<img src="https://placeimg.com/128/128/tech" style={this.imgStyle} className="img-fluid rounded-circle" />
																										&nbsp;&nbsp;&nbsp;&nbsp; {head.name} 
																									</div>
																								)
																							}
																						} ) 
																					}
																				</div>
																				<div className="divTableCell">
																					{user.department}
																				</div>
																				<div className="divTableCell">
																					{user.email}
																				</div>
																				<div className="divTableCell">
																					----
																				</div>
																				<div className="divTableCell">
																					{user.hand_over_date}
																				</div>
																				<div className="divTableCell text-center">
																					<span className="fa fa-pencil text-warning addcompany" id={user.id} onClick={this.handleClickOpenEdit('body')}></span>&nbsp;
																					<span className="fa fa-trash text-danger addcompany" id={user.id} onClick={this.handleClickOpenEdit('body')}></span>
																				</div>
																			</div>
																		)
																	})
																}
															</div> */}
														</div>
													)
												}
											</div>
										</div>
									</div>
									{ this.state.show && <Box id={this.state.id} />}
								</div>
							</div>
						</section>
					</div>
				</div>
				<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						scroll={this.state.scroll}
						aria-labelledby="scroll-dialog-title"
						className="col-lg-12 container-fluid"
					>
					<DialogTitle id="scroll-dialog-title">Add Users</DialogTitle>
					<MaterialUIForm onSubmit={this.submit} className="container-fluid">
						<TextField
							fullWidth
							label="Firstname"
							type="text"
							name="firstname"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
						/>

						<TextField
							fullWidth
							label="Lastname"
							type="text"
							name="lastname"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired,isAlpha"
						/>

						<TextField
							fullWidth
							select
							label="Access Type"
							value=""
							name="access_type"
							onChange={this.customInputHandler}
							data-validators="isRequired"
							className="Aleft"
						>
						{accessTypes.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
						</TextField>

						<TextField
							fullWidth
							select
							id="role"
							name="role"
							label="Role"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
							className="Aleft"
						>
						{
							this.state.roles.map((role) => {
								return(
									<MenuItem key={role.id} value={role.id}>
										{role.name}
									</MenuItem>
								)
							})
						}
						</TextField>

						<TextField
							fullWidth
							select
							name="direct_head"
							type="text"
							label="Direct Head"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
							className="Aleft"
						>
						{
							this.state.heads.map((head) => {
								return(
									<MenuItem key={head.id} value={head.id}>
										{head.name}
									</MenuItem>
								)
							})
						}
						</TextField>

						<TextField
							fullWidth
							select
							label="Department"
							value=""
							name="department"
							onChange={this.customInputHandler}
							data-validators="isRequired"
							className="Aleft"
						>
						{department.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
						</TextField>

						<TextField
							fullWidth
							label="Email"
							type="text"
							name="email"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
						/>
						
						<br /><br />
						<Select
							options={this.state.clients}
							value={selectedOption}
							onChange={this.handleChange}
							placeholder="Select Client"
							className="Aleft"
							onBlur={this.customInputHandler}
						/>
						<br />
						<TextField
							fullWidth
							label="Handover Date"
							type="date"
							name="hand_over_date"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
							InputLabelProps={{ shrink: true }}
						/>
						<TextField 
							fullWidth
							id="compid"
							name="compid"
							value={(Date.now().toString(36) + Math.random().toString(36).substr(2, 5))}
							onBlur={this.customInputHandler}
							style={{ display: 'none' }}
						/>
						<div className="modal-footer">
							<Button type="button" variant="contained" onClick={this.handleClose}>Close</Button>
							<Button type="submit" variant="contained" color="primary">Save & Exit</Button>
						</div>
					</MaterialUIForm>
				</Dialog>
			</div>
        );
    }
}

class Box extends Component {
	render () {
		return (
			<div className="col-lg-4">
				<div className="block margin-bottom-sm">
					<div className="table-responsive"> 
						<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						scroll={this.state.scroll}
						aria-labelledby="scroll-dialog-title"
						className="col-lg-12 container-fluid"
					>
					<DialogTitle id="scroll-dialog-title">Add Company</DialogTitle>
					<MaterialUIForm onSubmit={this.submit} className="container-fluid">
					
					{this.props.id}
						<TextField
							fullWidth
							label="Company Name"
							type="text"
							name="name"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired,isAlpha"
						/>
						<TextField
							fullWidth
							name="abbreviation"
							type="text"
							label="Company Abbreviation"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired,isAlpha"
						/>

						<TextField
							fullWidth
							id="website"
							name="website"
							value=""
							label="Company Website"
							onChange={this.customInputHandler}
							data-validators="isRequired,isAlpha"
						/>

						<TextField
							fullWidth
							name="profile"
							label="Company Profile"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired,isAlpha"
						/>
						<TextField
							fullWidth
							id="unit_no"
							name="unit_no"
							label="Unit Number"
							type="number"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
						/>
						<TextField
							fullWidth
							id="street_name"
							name="street_name"
							label="Street Name"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired,isAlpha"
						/>
						<TextField
							fullWidth
							select
							label="Street Type"
							value=""
							name="street_type"
							onChange={this.customInputHandler}
							data-validators="isRequired"
							className="Aleft"
						>
							{streetType.map(option => (
							<MenuItem key={option.value} value={option.value}>
							{option.label}
							</MenuItem>
							))}
						</TextField>
						<TextField
							fullWidth
							id="admin_mobile"
							name="admin_mobile"
							label="Mobile"
							type="number"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired"
						/>
						<TextField
							fullWidth
							id="admin_firstname"
							name="admin_firstname"
							label="Admin Firstname"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired, isAlpha"
						/>
						<TextField
							fullWidth
							id="admin_lastname"
							name="admin_lastname"
							label="Admin Lastname"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired, isAlpha"
						/>
						<TextField
							fullWidth
							id="admin_email"
							name="admin_email"
							label="Admin Email"
							value=""
							onChange={this.customInputHandler}
							data-validators="isRequired, isEmail"
						/>
						<div className="modal-footer">
							<Button type="button" variant="contained" onClick={this.handleClose}>Close</Button>
							<Button type="submit" variant="contained" color="primary">Save & Exit</Button>
						</div>
					</MaterialUIForm>
				</Dialog>
					</div>
				</div>
			</div>
		)
	}
}