import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import './components/css/custom.css';
import Select from 'react-select';
import {
		Modal, ModalHeader, ModalBody, FormGroup, Label, Input, 
		TabContent, TabPane, Nav, NavItem, NavLink, Button, Table, 
		InputGroup, InputGroupAddon, Form 
} from 'reactstrap';
import classnames from 'classnames';
import TimeField from 'react-simple-timefield';

const socket = new Pusher('223aca0f0c8175acf4b3', {
	cluster: 'ap1',
	encrypted: true
});

export default class AddTaskTemplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false,
			open: false,
			comps:[],
			companies: [],
			multiple_task: [{ _id: _.uniqueId() }],
			time: '',
			dataSetClient: [],
			dataEditClient:[],
			selectedOption: null,
			clientsData:[],
			clients: [],
			modal: false,
			activeTab: '1',
			selectedOptionHead: null,
		};

		this.toggleTab = this.toggleTab.bind(this);
	}

	componentDidMount() {
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

		//all clients
		let initialClients = [];
		fetch(`http://localhost/vbptimetaskmanagement/api/vbpapi/users/allclients`)
		.then(response => {
			return response.json();
		}).then(data => {
			initialClients = data.map(suggestion => ({
				value: suggestion.id,
				label: suggestion.name,
			}));
			this.setState({clients: initialClients});
		});
	}

	toggle = () => {
		this.setState({
		  modal: !this.state.modal
		});
	}

	toggleClose = () => {
		this.setState({modal: false});
	}

	getDataClients() {
		fetch(`http://localhost/vbp/api/vbpapi/companies/allcompanies`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({clientsData:data});
		});
	}

	handleClose = () => {
		this.setState({ open: false });
	};

	addRow = () => {
		const { multiple_task } = this.state
		multiple_task.push({ _id: _.uniqueId() })
		this.setState({ multiple_task })
	}

	removeRow = (index) => {
		const { multiple_task } = this.state
		if (multiple_task.length > 1) {
			multiple_task.splice(index, 1)
			this.setState({ multiple_task })
		}
	}

	handleChangeHead = (selectedOptionHead) => {
		this.setState({ selectedOptionHead });
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
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
		const client_select = this.state.selectedOption;
		const addValue = {
			client_name: client_select.label,
			vbp_task_name: this.vbp_task_name.value,
			client_task_name: this.client_task_name.value,
			procedure_url: this.procedure_url.value,
			kpi_due_date: this.kpi_due_date.value,
			kpi_time: this.state.time
		}
		this.addNew(addValue);
	}

	addNew(addValue) {
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/tasks/add',
			data: addValue
		}).then(response => {
			console.log(response.data.id);
			const multipleAddLength = $(".TaskTable").find('tr.taskList').length;
			const addeValueLoop = [];
			for(var i = 0; i < multipleAddLength; i++) {
				addeValueLoop.push({ 
					clientid: response.data.id, 
					name: $(".TaskTable tr.taskList").find('input#name'+i).val(), 
				});
			}
			console.log(addeValueLoop);
			for(var i = 0; i < addeValueLoop.length; i++) {
				this.addSubtasks(addeValueLoop[i]);
			}
			this.props.tasksTable;
			$(".addUserForm").find('button.closeModal').click();
		}).catch(err => console.log(err));
	}

	addSubtasks(subtask) {
		axios.request({
			method:'post',
			url:'http://localhost/vbp/api/vbpapi/tasks/addsubtasks',
			data: newContact
		}).then(response => {
			this.setState({
				modal: false
			});
			this.getDataClients();
		}).catch(err => console.log(err));
	}

	onTimeChange = (time) => {
		this.setState({time});
	}

    render() {
		const { selectedOption, multiple_task, time } = this.state;
		const { isOpen, toggle } = this.props;

		const newDate = new Date(); 
		const dateToday = newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate();

        return (
			<div>
				<Modal isOpen={isOpen} toggle={toggle} className="modal-lg Modal">
				<ModalHeader>Add Task Template</ModalHeader>
				<ModalBody>
					<Form className="Aleft addUserForm" onSubmit={this.onFormAddSubmit}>
						<Nav tabs>
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '1' })}
									onClick={() => { this.toggleTab('1'); }}
								>
									<b>Task Template Information</b>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className={classnames({ active: this.state.activeTab === '2' })}
									onClick={() => { this.toggleTab('2'); }}
								>
									Subtasks
								</NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={this.state.activeTab}>
							<TabPane tabId="1">
								<br></br>
								<div className="row">
									
									<FormGroup className="col-6">
											<div className="Aleft">
												<label>Select Client*</label>
											</div>
											<Select
												options={this.state.clients}
												value={selectedOption}
												onChange={this.handleChange}
												placeholder="Select Client"
												className="Aleft dropdownSelectForm"
												ref="client"
												required
											/>
									</FormGroup>

									<FormGroup className="col-6">
										<Label>Date Created</Label>
										<Input type="text" defaultValue={dateToday} className="dropdownSelectForm" disabled/>
									</FormGroup>
								</div>
								<div className="row">
									<FormGroup className="col-6">
										<Label>VBP Task Name</Label>
										<Input innerRef={(e) => this.vbp_task_name = e} type="text" name="vbp_task_name" placeholder="Enter VBP Task Name" required autoFocus/>
									</FormGroup>

									<FormGroup  className="col-6">
										<Label>Client Task Name</Label>
										<Input type="text" innerRef={(e) => this.client_task_name = e} name="client_task_name" placeholder="Enter Client Task Name" required/>
									</FormGroup>
								</div>

								<div className="row">

									<FormGroup  className="col-6">
										<Label>KPI Due Date</Label>
										<Input type="date" innerRef={(e) => this.kpi_due_date = e} name="kpi_due_date" placeholder="Enter KPI Due Date" required/>
									</FormGroup>

									<FormGroup  className="col-6">
										<Label>KPI Time</Label>
										<TimeField value={time} onChange={this.onTimeChange} className="form-control" placeholder="00:00" style={{width: '100%'}}  required/>
									</FormGroup>
									
								</div>
								<FormGroup>
									<Label>Procedure URL</Label>
									<Input type="url" innerRef={(e) => this.procedure_url = e} name="procedure_url" placeholder="Enter Procedure URL" required/>
								</FormGroup>
							</TabPane>
							<TabPane tabId="2">
								<Button variant="raised" style={{ 'float': 'right','margin': '10px' }} onClick={this.addRow}>Add Subtask</Button>
								<br /><br />
									<Table className="TaskTable">
										<thead>
											<tr>
												<th>Subtasks</th>
												<th style={{width: '55px'}}></th>
											</tr>
										</thead>
										<tbody>
										{ multiple_task.map((contact, i) => (
												<tr key={i} className="taskList">
													<td>
														<Input type="text" id={`name${i}`} placeholder="Type here to create subtasks" required/>
													</td>
													<td>
														{ multiple_task.length > 1 &&
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
															deletefieldrow={`multiple_task[${i}]`} />
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
							<Button type="submit" className="btn btn-success">Save & Exit</Button>
							<Button type="button" className="closeModal" onClick={toggle}>Close</Button>
						</div>
						</Form>
				</ModalBody>
				</Modal>
			</div>
        );
    }
}

