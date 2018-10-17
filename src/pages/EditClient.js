import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './components/css/custom.css';
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, TabContent, TabPane, Nav, NavItem, NavLink, Button, Table, Form } from 'reactstrap';
import classnames from 'classnames';
import ClientNotes from './ClientNotes';

const SelectAutraliaStates = {
	'New South Wales': 'New South Wales',
	'Queensland': 'Queensland',
	'South Australia': 'South Australia',
	'Tasmania': 'Tasmania',
	'Victoria': 'Victoria',
	'Western Australia': 'Western Australia',
	'Australian Capital Territory': 'Australian Capital Territory'
};
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

export default class EditButton extends Component {
    constructor(props) {
		super(props);
		this.state = {
			open: false,
			selectedOptionHead: null,
			selectedOptionClient: null,
			selectedOptionRole: null,
			roles: [],
			heads:[],
			clients: [],
			usersData: [],
			scroll: 'paper',
			show: false,
			modal: false,
			otherContact: [{ _id: _.uniqueId() }],
			activeTab: '1',
			teamMembers: [],
			another_contact_person: [],
			popoverOpen: false
		}
		
		this.toggle = this.toggle.bind(this);
	}
	
	componentDidMount() {
		$(".contactTable thead tr th:eq(2)").attr('width','75px');
		const rowValue = this.props.row;
		fetch(`http://localhost/vbp/api/vbpapi/companies/getothercontacts/`+rowValue.compid)
		.then(results => {
			return results.json();
		}).then(data => {
			// console.log(data);
			this.setState({another_contact_person:data});
		});

		// Team Members
		fetch(`http://localhost/vbp/api/vbpapi/companies/teammembers/`+rowValue.name)
		.then(results => {
			return results.json();
		}).then(data => {
			// console.log(data);
			this.setState({teamMembers:data});
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

	onFormEditSubmit = (e) => {
		e.preventDefault();
		const rowValue = this.props.row;
		const head_select = this.state.selectedOptionHead;
		const updateClient = {
			client_name: this.name.value,
			lisensee: this.lisensee.value,
			region: this.region.value,
			client_phone: this.phone.value,
			website: this.website.value,
			address: this.address.value,
			postcode:this.postcode.value,
			direct_head: (head_select == null)? rowValue.direct_head : head_select.label,
			city: this.city.value,
			country: 'Australia',
			project_manager: this.project_manager.value,
			project_owner: this.project_owner.value
		}
		this.EditClient(updateClient);

		const inputContactLength = $(".contactTable").find('tr.existContact').length;
		if(inputContactLength >= 1) {
			const clientcontact = [];
			for(var i = 0; i < inputContactLength; i++) {
				clientcontact.push({ 
					id: $(".contactTable tr.existContact").find('input#id'+i).val(), 
					clientid: $(".contactTable tr.existContact").find('input#clientid'+i).val(), 
					name: $(".contactTable tr.existContact").find('input#name'+i).val(), 
					position: $(".contactTable tr.existContact").find('input#position'+i).val(),
					phone: $(".contactTable tr.existContact").find('input#phone'+i).val(),
					email: $(".contactTable tr.existContact").find('input#email'+i).val()
				});
			}
			for(var i=0; i<clientcontact.length; i++) {
				this.EditContact(clientcontact[i]);
			}
		}

		const inputNewContactLength = $(".contactTable").find('tr.newContactClient').length;
			const clientnewcontact = [];
			for(var i = 0; i < inputNewContactLength; i++) {
				clientnewcontact.push({ 
					clientid: $(".contactTable tr.newContactClient").find('input#clientid'+i).val(), 
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

	toggleTab(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	EditContact(EditContact) {
		console.log(EditContact);
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/companies/editcontact/'+EditContact.id,
			data: EditContact
		}).then(response => {
			console.log('udpated');
		}).catch(err => console.log(err));
	}

	addOtherContact(newContact) {
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/companies/addcontact',
			data: newContact
		}).then(response => {
			this.setState({
				modal: false
			});
			// this.getDataClients();
		}).catch(err => console.log(err));
	}


	EditClient(clientVal) {
		const rowValue = this.props.row;
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/companies/editcompanies/'+rowValue.id,
			data: clientVal
		}).then(response => {
			this.setState({
				modal: false
			});
			// this.props.mainTable;
			location.reload();
			// axios.post('http://localhost:8080/users', payload);
		}).catch(err => console.log(err));
	}

	customInputHandler = (value, { name }, event) => {
		this.setState({
			[name]: value
		});
	}
	
	toggle = () => {
		this.setState({
		  modal: !this.state.modal
		});
	}

	removeRowExist = (index, id) => {
			const { another_contact_person } = this.state
			if (another_contact_person.length >= 1) {

				axios.request({
					method:'post',
					url:'http://localhost/vbp/api/vbpapi/companies/deletecontact/'+id,
				}).then(response => {
					console.log('deleted successfully');
				}).catch(err => console.log(err));

				another_contact_person.splice(index, 1)
				this.setState({ another_contact_person, popoverOpen: !this.state.popoverOpen });
			}
	}

	handleChangeHead = (selectedOptionHead) => {
		this.setState({ selectedOptionHead });
	}

	togglePopover = () => {
		this.setState({
		  popoverOpen: !this.state.popoverOpen
		});
	}

	onNotesSubmit = () => {
		const noteValues = {
			title: $(".addUserForm").find('input#title').val(),
			notes: $(".addUserForm").find('textarea#notes').val()
		}
		console.log(noteValues);
	}

	addRow = () => {
		const { otherContact } = this.state
		otherContact.push({ _id: _.uniqueId() })
		this.setState({ otherContact, open: true })
	}

	removeRow = (index) => {
		const { otherContact } = this.state
		if (otherContact.length > 1) {
			otherContact.splice(index, 1)
			this.setState({ otherContact })
		}
	}

   render() {
	    const { selectedOptionHead } = this.state;
		const { cell, row, rowIndex } = this.props;
		const { otherContact } = this.state;
		const { another_contact_person } = this.state;
        return (
            <div>
                <i className="fa fa-pencil-square-o text-success fa-lg" style={{'cursor':'pointer'}}  onClick={this.toggle}></i>
				<i className="fa fa-trash-o text-danger fa-lg" style={{'cursor':'pointer','marginLeft': '10px'}}></i>

				<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg container-fluid">
				<ModalHeader>Edit Client</ModalHeader>
				<ModalBody>

					<Form className="Aleft addUserForm" onSubmit={this.onFormEditSubmit}>
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
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === '3' })}
										onClick={() => { this.toggleTab('3'); }}
									>
										VBP Team Members
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										className={classnames({ active: this.state.activeTab === '4' })}
										onClick={() => { this.toggleTab('4'); }}
									>
										Notes
									</NavLink>
								</NavItem>
							</Nav>
							<TabContent activeTab={this.state.activeTab}>
								<TabPane tabId="1">
									<hr />

									<div className="row">
										<FormGroup className="col-6">
											<Label for="clientname">Client Name</Label>
											<Input innerRef={(e) => this.name = e} type="text" name="name" placeholder="Enter Client Name" defaultValue={row.name} required="required"/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="lisensee">Licensee</Label>
											<Input type="text" innerRef={(e) => this.lisensee = e} name="lisensee" placeholder="Enter Licensee" defaultValue={row.lisensee} required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup  className="col-6">
											<Label for="Phone">Phone</Label>
											<Input type="text" innerRef={(e) => this.phone = e} name="phone" placeholder="Enter Phone" defaultValue={row.phone} required/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="website">Website</Label>
											<Input type="text" name="website" innerRef={(e) => this.website = e} placeholder="Enter Website" defaultValue={row.website} required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup  className="col-6">
											<Label for="address">Address</Label>
											<Input innerRef={(e) => this.address = e} type="textarea" name="address" placeholder="Enter Address" defaultValue={row.address} required/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="city">Town/City</Label>
											<Input innerRef={(e) => this.city = e} type="text" name="city" placeholder="Enter Address" defaultValue={row.city} required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup className="col-6">
											<Label for="stateregion">State/Region</Label>
											<Input innerRef={(e) => this.region = e} type="select" name="region" id="region" defaultValue={row.region} required>
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
											<Input innerRef={(e) => this.postcode = e} type="text" name="postcode" defaultValue={row.postcode} required/>
										</FormGroup>
									</div>

									<div className="row">
										<FormGroup  className="col-6">
											<Label for="address">Project Owner</Label>
											<Input innerRef={(e) => this.project_owner = e} type="text" name="project_owner" defaultValue={row.project_owner} placeholder="Enter Project Owner" required/>
										</FormGroup>

										<FormGroup  className="col-6">
											<Label for="city">Project Manager</Label>
											<Input innerRef={(e) => this.project_manager = e} type="text" name="project_manager" defaultValue={row.project_manager} placeholder="Enter Project Manager" required/>
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
												defaultInputValue={row.direct_head}
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
										{ another_contact_person.map((other, i) => (
											<tr key={other.id} className="existContact">
												<td>
													<Input id={`id${i}`} type="text" style={{display: 'none'}} defaultValue={other.id}/>
													<Input id={`clientid${i}`} type="text" defaultValue={row.compid} style={{display: 'none'}} />
													<Input type="text" id={`name${i}`} defaultValue={other.name}/>
												</td>
												<td>
													<Input type="text" id={`position${i}`} defaultValue={other.position}/>
												</td>
												<td>
													<Input type="text" id={`phone${i}`} defaultValue={other.phone}/>
												</td>
												<td>
													<Input type="email" id={`email${i}`} defaultValue={other.email}/>
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
														onClick={() => this.removeRowExist(i, other.id)}
														deletefieldrow={`another_contact_person[${i}]`} />
													}
												</td>
											</tr>
										))}
										{ 
											this.state.open == true  &&
											otherContact.map((contact, i) => (
												<tr key={i} className="newContactClient">
													<td>
														<Input id={`clientid${i}`} type="text" defaultValue={row.compid} style={{display: 'none'}} />
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
														{ otherContact.length >= 1 &&
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
								<TabPane tabId="3">
									<br />
									<Table>
										<thead>
											<tr>
												<th>Name</th>
												<th>Role</th>
											</tr>
										</thead>
										<tbody>
											{
												this.state.teamMembers.map((team, i) => {
													if(row.name == team.client) {
														return (
															<tr key={i}>
																<td>{team.firstname} {team.lastname}</td>
																<td>{team.role}</td>
															</tr>
														)
													}
												})
											}
										</tbody>
									</Table>
								</TabPane>
								<TabPane tabId="4">
									<br />
									<ClientNotes row={row} id={row.id}/>
								</TabPane>
							</TabContent>
							<div className="modal-footer">
							<Button type="submit"  className="btn btn-success" color="primary">Save & Exit</Button>
							<Button type="button" className="btn btn-default" onClick={this.toggle}>Close</Button>
							</div>
					</Form>
				</ModalBody> 
				</Modal>
            </div>
        )
    }
}

class TableRow extends Component {
	render() {
		return (
			<tr>
				<td>{this.props.obj.firstname} {this.props.obj.lastname}</td>
				<td>{this.props.obj.role}</td>
			</tr>
		)
	}
}

