import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './components/css/custom.css';
import Select from 'react-select';
import CsvIcon from './components/csv.png';
import {CSVLink} from 'react-csv';
import BootstrapTable, { TableHeaderColumn } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter, dateFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col, TabContent, Alert, TabPane, Nav, NavItem, NavLink, Table, ControlLabel, FormControl, Form } from 'reactstrap';
import EditUsers from './EditUsers';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const socket = new Pusher('223aca0f0c8175acf4b3', {
	cluster: 'ap1',
	encrypted: true
});

const { SearchBar } = Search;

const accessTypes = [
	{
		value: '',
		label: 'Select Access Type'
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
		label: 'Select Department'
	},
	{
		value: 'Cluster Gazi',
		label: 'Cluster Gazi'
	},
	{
		value: 'Cluster Shi-an',
		label: 'Cluster Shi-an'
	},
	{
		value: 'The Forge',
		label: 'The Forge'
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
  ];

const defaultSorted = [{
	dataField: 'firstname',
	order: 'asc'
}];

const customTotal = (from, to, size) => (
	<span className="react-bootstrap-table-pagination-total">
	  Showing { from } to { to } of { size } Results
	</span>
  );
  
  const options = {
	paginationSize: 4,
	pageStartIndex: 1,
	firstPageText: 'First',
	prePageText: 'Back',
	nextPageText: 'Next',
	lastPageText: 'Last',
	nextPageTitle: 'First page',
	prePageTitle: 'Pre page',
	firstPageTitle: 'Next page',
	lastPageTitle: 'Last page',
	showTotal: true,
	paginationTotalRenderer: customTotal,
	sizePerPageList: [{
		text: '5', value: 5
	},{
		text: '10', value: 10
	}, {
		text: '20', value: 20
	}, {
		text: '50', value: 50
	}, {
		text: '100', value: 100
	}]
  };

export default class Users extends Component {
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
			selectedOptionHead: null,
			selectedOptionRole: null,
			dataSet3:[],
			usersData:[],
			client: null,
			value: '',
			modal: false
		};

		this.handleHide = this.handleHide.bind(this);
	}

	addNewUser(addUser) {
		axios.request({
			method:'post',
			url:'https://e8683824.ngrok.io/vbp/api/vbpapi/users/adduser',
			data: addUser
		}).then(response => {
			this.setState({open: false, modal: false});
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
			this.getDataUsers();
			axios.post('http://localhost:8080/users', payload);
		}).catch(err => console.log(err));
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
		let initialClients = [];
		let initialHeads = [];
		let initialRoles = [];

		this.setState( { isLoading: true });
		this.getDataUsers();
		const channel = socket.subscribe('user');
		channel.bind('users', (data) => {
			this.setState({ realUsers: [...this.state.realUsers, data]});
		});

		//all clients
		fetch(`https://e8683824.ngrok.io/vbp/api/vbpapi/users/allclients`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialClients = data.map(suggestion => ({
				value: suggestion.id,
				label: suggestion.name,
			}));
			this.setState({clients: initialClients});
		});

		//all heads
		fetch(`https://e8683824.ngrok.io/vbp/api/vbpapi/users/allheads`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialHeads = data.map(heads => ({
				value: heads.id,
				label: heads.name,
			}));
			this.setState({heads: initialHeads});
		});

		//all roles
		fetch(`https://e8683824.ngrok.io/vbp/api/vbpapi/users/allroles`)
		.then(results => {
			return results.json();
		}).then(data => {
			initialRoles = data.map(role => ({
				value: role.id,
				label: role.name,
			}));
			this.setState({roles: initialRoles});
		});

		let allUsers = [];
		fetch(`https://e8683824.ngrok.io/vbp/api/vbpapi/users/allusers`)
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
		fetch(`https://e8683824.ngrok.io/vbp/api/vbpapi/users/allusers`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({usersData:data});
		});
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	handleChangeHead = (selectedOptionHead) => {
		this.setState({ selectedOptionHead });
	}

	handleChangeRole = (selectedOptionRole) => {
		this.setState({ selectedOptionRole });
	}

	editAction(cell, row, enumObject, rowIndex) {
		return (
			<EditUsers cell={cell} row={row} rowIndex={rowIndex} />
		);
	}

	getName(cell, row) {
		return (
			<span>{row.firstname} {row.lastname}</span>
		);
	}

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	}

	onFormAddSubmit = (e) => {
		e.preventDefault();
		const role_select = this.state.selectedOptionRole;
		const head_select = this.state.selectedOptionHead;
		const client_select = this.state.selectedOption;
		const newUser = {
			firstname: this.firstname.value,
			lastname: this.lastname.value,
			access_type: this.access_type.value,
			role: role_select.label,
			direct_head: head_select.label,
			department: this.department.value,
			email: this.email.value,
			hand_over_date: this.hand_over_date.value,
			client: client_select.label,
		}
		this.addNewUser(newUser);
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

    render() {
		const columns = [
			{
				dataField: 'firstname',
				text: 'Name',
				sort: true,
				formatter: this.getName
			},
			{
				dataField: 'access_type',
				text: 'Access Type',
				sort: true,
				editor: {
					type: Type.SELECT,
					options: accessTypes
				}
			},
			{
				dataField: 'role',
				text: 'Role',
				sort: true,
			},
			{
				dataField: 'direct_head',
				text: 'Direct Head',
				sort: true,
			},
			{
				dataField: 'client',
				text: 'Client',
				sort: true,
			},
			{
				dataField: 'hand_over_date',
				text: 'Handover Date',
				sort: true,
			},
			{
				dataField: 'id',
				text: 'Action',
				formatter: this.editAction
			}
		];
		const { selectedOption } = this.state;
		const { selectedOptionHead } = this.state;
		const { selectedOptionRole } = this.state;
        return (
			<div>
				<Header />
				<div className="d-flex align-items-stretch">
				<Sidebar />
					<div className="page-content">
						<div className="page-header  no-margin-bottom Aleft">
							<div className="container-fluid">
								<div className="h5 no-margin-bottom">
									<h2>Users <Button color="success" onClick={this.toggle}><i className="fa fa-plus"></i> Add User</Button></h2>  
								</div>
							</div>
						</div><br />
						<section className="no-padding-top">
							<div className="container-fluid">
								<div className="row Aleft">
									<div className='col-lg-12'>
										<div className="block margin-bottom-sm">
										<ToolkitProvider
											keyField="id"
											data={ this.state.usersData }
											columns={ columns }
											search
										>
											{
												props => (
												<div>
													<SearchBar { ...props.searchProps } className="selectSearchDropdown"/>
													<br />
													<BootstrapTable
													bootstrap4
													keyField="id"
													data={ this.state.usersData }
													columns={ columns }
													defaultSorted={ defaultSorted } 
													pagination={ paginationFactory(options) }
													filter={ filterFactory() }
													{ ...props.baseProps }
													></BootstrapTable>
													<div>
														<CSVLink filename={"users.csv"} data={this.state.dataSet3} headers={headers}>
															<img src={CsvIcon} className="img-responsive avatar" alt="logo" className="imgExportCSV2"/>
														</CSVLink>
													</div>
												</div>
												)
											}
										</ToolkitProvider>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
											
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg container-fluid">
					<ModalHeader toggle={this.toggle}>Add User</ModalHeader>
					<ModalBody>
					<Form className="Aleft addUserForm container-fluid" onSubmit={this.onFormAddSubmit}>
						<Row >
							<Col md={6}>
								<FormGroup>
									<Label>Firstname*</Label>
									<Input innerRef={(e) => this.firstname = e} type="text" name="firstname" placeholder="Enter Firstname" required="required"/>
								</FormGroup>
							</Col>
							<Col md={6}>
								<FormGroup>
									<Label>Lastname*</Label>
									<Input innerRef={(e) => this.lastname = e} type="text" name="lastname" placeholder="Enter Lastname" required="required"/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<Label>Access Type*</Label>
									<Input type="select" innerRef={(e) => this.access_type = e} name="access_types" className="dropdownSelectForm" required="required">
											{accessTypes.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
									</Input>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<label>Select Role*</label>
									<Select
										options={this.state.roles}
										value={selectedOptionRole}
										onChange={this.handleChangeRole}
										placeholder="Select Role"
										className="Aleft dropdownSelectForm"
									/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<label>Select Direct Head*</label>
									<Select
										options={this.state.heads}
										value={selectedOptionHead}
										onChange={this.handleChangeHead}
										placeholder="Select Direct Head"
										className="Aleft dropdownSelectForm"
									/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Department*</Label>
									<Input type="select" innerRef={(e) => this.department = e} name="department" className="dropdownSelectForm" required="required">
											{department.map(option => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
									</Input>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<label>Select Client*</label>
									<Select
										options={this.state.clients}
										value={selectedOption}
										onChange={this.handleChange}
										placeholder="Select Client"
										className="Aleft dropdownSelectForm"
										ref="client"
									/>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Handover Date*</Label>
									<Input innerRef={(e) => this.hand_over_date = e} type="date" name="hand_over_date" required="required" className="dropdownSelectForm"/>
								</FormGroup>
							</Col>
						</Row>
						<Row >
							<Col md={6}>
								<FormGroup>
									<FormGroup>
										<Label>Email*</Label>
										<Input innerRef={(e) => this.email = e} type="email" name="email" placeholder="Enter Email" required="required"/>
									</FormGroup>
								</FormGroup>
							</Col>

							<Col md={6}>
								<FormGroup>
									<Label>Password</Label>
									<Input innerRef={(e) => this.password = e}  type="text" name="password"/>
									<Input type="hidden" name="_Token[fields]" onBlur = {(e) => this.password = e} autocomplete="off" value="---HASH---" />
								</FormGroup>
							</Col>
						</Row>
					<div className="modal-footer">
					<Button color="success" type="submit">Save & Exit</Button>
					<Button color="secondary" onClick={this.toggle}>Cancel</Button>
					</div>
					</Form>
					</ModalBody>
				</Modal>
			</div>
        );
    }
}