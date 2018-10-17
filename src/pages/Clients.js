import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './components/css/custom.css';
import MenuItem from '@material-ui/core/MenuItem';
import formData from 'form-data-to-object';
import {CSVLink} from 'react-csv';
import CsvIcon from './components/csv.png';
import BootstrapTable, {TableHeaderColumn } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, TabContent, Alert, TabPane, Nav, NavItem, NavLink, Button, Table, ControlLabel, FormControl, Form } from 'reactstrap';
import classnames from 'classnames';
import EditClient from './EditClient';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

const SelectAutraliaStates = {
	'New South Wales': 'New South Wales',
	'Queensland': 'Queensland',
	'South Australia': 'South Australia',
	'Tasmania': 'Tasmania',
	'Victoria': 'Victoria',
	'Western Australia': 'Western Australia',
	'Australian Capital Territory': 'Australian Capital Territory'
};

  const { SearchBar } = Search;
  
  const defaultSorted = [{
	dataField: 'name',
	order: 'asc'
  }];

const autraliaStates = [
	{
		value: '',
		label: 'Select State'
	},
	{
		value: 'New South Wales',
		label: 'New South Wales'
	},
	{
		value: 'Queensland',
		label: 'Queensland'
	},
	{
		value: 'South Australia',
		label: 'South Australia'
	},
	{
		value: 'Tasmania',
		label: 'Tasmania'
	},
	{
		value: 'Victoria',
		label: 'Victoria'
	},
	{
		value: 'Western Australia',
		label: 'Western Australia'
	},
	{
		value: 'Australian Capital Territory',
		label: 'Australian Capital Territory'
	}
];

const socket = new Pusher('223aca0f0c8175acf4b3', {
	cluster: 'ap1',
	encrypted: true
});

const headers = [
	{label: 'Client', key: 'name'},
	{label: 'Licensee', key: 'licensee'},
	{label: 'State', key: 'state'},
	{label: 'Project Owner', key: 'project_owner'},
	{label: 'Project Manager', key: 'project_manager'},
	{label: 'Contact Number', key: 'phone'},
];

const customTotal = (from, to, size) => (
	<span className="react-bootstrap-table-pagination-total">
	  Showing { from } to { to } of { size } Results
	</span>
  );

export default class Clients extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			show: false,
			divWidth: false,
			addedNew: false,
			open: false,
			openEdit: false,
			selectedFile: null,
			results:[],
			comps:[],
			users:[],
			countries: [],
			positions:[],
			manager:[],
			allusers:[],
			companies: [],
			another_contact_person: [{ _id: _.uniqueId() }],
			scroll: 'paper',
			street_type: '',
			country: '',
			editname: '',
			dataSetClient: [],
			dataEditClient:[],
			clientsData:[],
			value: "",
			modal: false,
			activeTab: '1',
			heads: [],
			selectedOptionHead: null,
		};

		this.toggleTab = this.toggleTab.bind(this);
	}

	componentDidMount() {
		$(".react-bootstrap-table table thead tr th:eq(5)").attr('width','80px');
		this.setState( { isLoading: true });
		this.getUsers();
		this.getDataClients();
		const channel = socket.subscribe('comp');
		channel.bind('results', (data) => {
			this.setState({ comps: [...this.state.comps, data]});
		});
		let allClients = [];
		fetch(`http://localhost/vbp/api/vbpapi/companies/allcompanies`)
		.then(response => {
			return response.json();
		}).then(data => {
			allClients = data.map(client => ({
				name: client.name,
				licensee: client.lisensee,
				state: client.region,
				project_owner: client.project_owner,
				project_manager: client.project_manager,
				phone: client.phone
			}));
			this.setState({dataSetClient: allClients});
		});

		//all heads
		let initialHeads = [];
		fetch(`http://localhost/vbp/api/vbpapi/users/allheads`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialHeads = data.map(heads => ({
				value: heads.id,
				label: heads.name,
			}));
			this.setState({heads: initialHeads});
		});
	}

	toggle = () => {
		this.setState({
		  modal: !this.state.modal
		});
	}

	getDataClients() {
		fetch(`http://localhost/vbp/api/vbpapi/companies/allcompanies`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({clientsData:data});
		});
	}

	getUsers() {
		fetch(`http://localhost/vbp/api/vbpapi/companies/allusers`)
		.then(results => {
			return results.json();
		}).then(data => {
			let users = data.map((user) => {
				return(
					<MenuItem key={user.id} value={user.id}>
						{user.firstname} {user.lastname}
					</MenuItem>
				)
			});
			this.setState({users:users});
		});
	}

	handleClickOpen = scroll => () => {
		this.setState({ open: true, scroll });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleCloseEdit = () => {
		this.setState({ openEdit: false });
	};

	addOtherContact(newContact) {
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/companies/addcontact',
			data: newContact
		}).then(response => {
			this.setState({
				modal: false
			});
			this.getDataClients();
		}).catch(err => console.log(err));
	}

	addNewCompany(newCompany) {
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/companies/add',
			data: newCompany
		}).then(response => {
			this.setState({open: false});
			const payload = {
				name: this.state.name,
				lisensee: this.state.lisensee,
				country: this.state.region,
				project_owner: this.state.project_owner,
				project_manager: this.state.project_manager,
				phone: this.state.phone,
				compid: response.data.compid,
			};
			axios.post('http://localhost:8080/results', payload);
			this.setState({
				modal: false
			});
			this.getDataClients();
		}).catch(err => console.log(err));
	}

	addRow = () => {
		const { another_contact_person } = this.state
		another_contact_person.push({ _id: _.uniqueId() })
		this.setState({ another_contact_person })
	}

	removeRow = (index) => {
		const { another_contact_person } = this.state
		if (another_contact_person.length > 1) {
			another_contact_person.splice(index, 1)
			this.setState({ another_contact_person })
		}
	}

	editAction(cell, row, enumObject, rowIndex) {
		return (
			<EditClient key={cell} cell={cell} row={row} rowIndex={rowIndex}/>
		);
	}

	handleChangeHead = (selectedOptionHead) => {
		this.setState({ selectedOptionHead });
	}

	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
		  this.setState({
			activeTab: tab
		  });
		}
	}

	onFormAddSubmit = (e) => {
		e.preventDefault();
		const head_select = this.state.selectedOptionHead;
		const compid = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5));
		const addClient = {
			name: this.name.value,
			lisensee: this.lisensee.value,
			region: this.region.value,
			phone: this.phone.value,
			website: this.website.value,
			address: this.address.value,
			postcode:this.postcode.value,
			direct_head: head_select.label,
			city: this.city.value,
			country: 'Australia',
			compid: compid,
			project_manager: this.project_manager.value,
			project_owner: this.project_owner.value
		}
		this.addNewCompany(addClient);
		const projectManager = {
			clientid: compid, 
			name: this.project_manager.value,
		}
		const projectOwner = {
			clientid: compid, 
			name: this.project_owner.value,
		}
		this.addOtherContact(projectManager);
		this.addOtherContact(projectOwner);

		const inputNewContactLength = $(".contactTable").find('tr.newContactClient').length;
			const clientnewcontact = [];
			for(var i = 0; i < inputNewContactLength; i++) {
				clientnewcontact.push({ 
					clientid: compid, 
					name: $(".contactTable tr.newContactClient").find('input#name'+i).val(), 
					position: $(".contactTable tr.newContactClient").find('input#position'+i).val(),
					phone: $(".contactTable tr.newContactClient").find('input#phone'+i).val(),
					email: $(".contactTable tr.newContactClient").find('input#email'+i).val()
				});
			}
			for(var i = 0; i < clientnewcontact.length; i++) {
				this.addOtherContact(clientnewcontact[i]);
			}
	}

    render() {
		const columns = [
			{
				dataField: 'name',
				text: 'Client',
				sort: true,
			},{
				dataField: 'lisensee',
				text: 'Licensee',
				sort: true,
			},{
				dataField: 'region',
				text: 'State',
				sort: true,
			},
			{
				dataField: 'direct_head',
				text: 'Direct Head',
				sort: true
			},
			{
				dataField: 'phone',
				text: 'Contact Number',
				sort: true,
			},{
				dataField: 'id',
				text: 'Action',
				formatter: this.editAction
			}
		];

		const defaultSorted = [{
			dataField: 'created',
			order: 'desc'
		}];

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
		  
		  const { selectedOptionHead, another_contact_person } = this.state;

        return (
			<div>
				<Header />
				<div className="d-flex align-items-stretch">
				<Sidebar />
					<div className="page-content">
						<div className="page-header  no-margin-bottom Aleft">
							<div className="container-fluid">
								<div className="h5 no-margin-bottom">
									<h2>Client <button className="btn btn-success" onClick={this.toggle}> <i className="fa fa-plus"></i> &nbsp; Add Client </button></h2>  
								</div>
							</div>
						</div><br />
						<section className="no-padding-top">
							<div className="container-fluid">
								<div className="row Aleft">
									<div className='col-lg-12'>
										<div className="block margin-bottom-sm">
											<div className="divTable">
												<div className="divTableBody"> 
													{this.state.comps.map(result => {
													return (
														<div className="divTableRow" key={result.compid}>
															 <Alert color="success Aleft">
																Added New Client
															 </Alert>
														</div>
													);
													})}
												</div>
											</div>
											<ToolkitProvider
												keyField="id"
												data={ this.state.clientsData }
												columns={ columns }
												search
											>
											{
												props => (
												<div>
													<SearchBar { ...props.searchProps } className="selectSearchDropdown"/>
													<BootstrapTable
													striped condensed hover
													bootstrap4
													keyField="id"
													data={ this.state.clientsData }
													columns={ columns }
													defaultSorted={ defaultSorted } 
													pagination={ paginationFactory(options) }
													filter={ filterFactory() }
													cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
													defaultSortDirection="asc"
													noDataIndication={ 'no results found' }
													{ ...props.baseProps }
													>
													</BootstrapTable>
													<div>
														<CSVLink filename={"users.csv"} data={this.state.dataSetClient} headers={headers}>
															<img src={CsvIcon} className="img-responsive avatar" className="imgExportCSV2"/>
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
				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
				<ModalHeader>Add Client</ModalHeader>
				<ModalBody>
					<Form className="Aleft addUserForm" onSubmit={this.onFormAddSubmit}>
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '1' })}
									onClick={() => { this.toggleTab('1'); }}
								>
									<b>Client Information</b>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '2' })}
									onClick={() => { this.toggleTab('2'); }}
								>
									Client Contacts
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<br></br>
								<div className="row">
										<FormGroup className="col-6">
											<Label for="clientname">Client Name</Label>
											<Input innerRef={(e) => this.name = e} type="text" name="name" placeholder="Enter Client Name" required="required"/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="lisensee">Licensee</Label>
											<Input type="text" innerRef={(e) => this.lisensee = e} name="lisensee" placeholder="Enter Licensee" required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup  className="col-6">
											<Label for="Phone">Phone</Label>
											<Input type="text" innerRef={(e) => this.phone = e} name="phone" placeholder="Enter Phone" required/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="website">Website</Label>
											<Input type="text" name="website" innerRef={(e) => this.website = e} placeholder="Enter Website" required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup  className="col-6">
											<Label for="address">Address</Label>
											<Input innerRef={(e) => this.address = e} type="textarea" name="address" placeholder="Enter Address" required/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="city">Town/City</Label>
											<Input innerRef={(e) => this.city = e} type="text" name="city" placeholder="Enter Town/City" required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup className="col-6">
											<Label for="stateregion">State/Region</Label>
											<Input innerRef={(e) => this.region = e} type="select" name="region" id="region"  required>
												{autraliaStates.map(option => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</Input>
										</FormGroup>
										<FormGroup className="col-2">
											<Label for="city">Country</Label>
											<Input type="text" name="country" defaultValue="Australia" disabled/>
										</FormGroup>
										<FormGroup className="col-4">
											<Label for="city">Postcode</Label>
											<Input innerRef={(e) => this.postcode = e} type="text" name="postcode" placeholder="Enter Postcode" required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup  className="col-6">
											<Label for="address">Project Owner</Label>
											<Input innerRef={(e) => this.project_owner = e} type="text" name="project_owner" placeholder="Enter Project Owner" required/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="city">Project Manager</Label>
											<Input innerRef={(e) => this.project_manager = e} type="text" name="project_manager" placeholder="Enter Project Manager" required/>
										</FormGroup>
									</div>
									
									<FormGroup>
											<div className="Aleft">
												<label>Select Direct Head*</label>
											</div>
											<Select
												options={this.state.heads}
												value={selectedOptionHead}
												onChange={this.handleChangeHead}
												placeholder="Select Direct Head"
												className="Aleft dropdownSelectForm"
											/>
									</FormGroup>

							</TabPane>
							<TabPane tabId="2">
								<Button variant="raised" style={{ 'float': 'right','margin': '10px' }} onClick={this.addRow}>Add Contact</Button>
								<br /><br />
									<Table className="contactTable">
										<thead>
											<tr>
												<th>Contact Name</th>
												<th>Position</th>
												<th>Phone/Mobile</th>
												<th>Email</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
										{ another_contact_person.map((contact, i) => (
												<tr key={i} className="newContactClient">
													<td>
														<Input type="text" id={`name${i}`}/>
													</td>
													<td>
														<Input type="text" id={`position${i}`}/>
													</td>
													<td>
														<Input type="text" id={`phone${i}`}/>
													</td>
													<td>
														<Input type="email" id={`email${i}`}/>
													</td>
													<td>
														{ another_contact_person.length >= 1 &&
															<i 
															className="fa fa-times text-warning btn-sm" 
															style={
																{ 
																	cursor:'pointer', 
																	marginLeft: '10px', 
																	marginBottom: '10px',
																	textAlign:'center'
																}
															} 
															onClick={() => this.removeRow(i)}
															deletefieldrow={`another_contact_person[${i}]`} />
														}
													</td>
												</tr>
											)) 
											}
										</tbody>
									</Table>
							</TabPane>
						</TabContent>
						<div className="modal-footer">
						<Button type="button" variant="contained" onClick={this.toggle}>Close</Button>
						<Button type="submit" className="btn btn-success" color="primary">Save & Exit</Button>
						</div>
						</Form>
				</ModalBody>
				</Modal>
			</div>
        );
    }
}

