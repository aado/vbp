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
import AddTaskTemplate from './AddTaskTemplate';

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

export default class TaskTemplate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
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
			TaskTemplate:[],
			value: "",
			modal: false,
			activeTab: '1',
			// heads: [],
			selectedOptionHead: null,
		};

		this.toggleTab = this.toggleTab.bind(this);
	}

	componentDidMount() {
		$(".react-bootstrap-table table thead tr th:eq(5)").attr('width','80px');
		this.setState( { isLoading: true });
		this.getDataTaskTemplate();
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
		// let initialHeads = [];
		// fetch(`http://localhost/vbp/api/vbpapi/tasks/allheads`)
		// .then(response => {
		// 	return response.json();
		// }).then(data => {
		// 	initialHeads = data.map(heads => ({
		// 		value: heads.id,
		// 		label: heads.name,
		// 	}));
		// 	this.setState({heads: initialHeads});
		// });
	}

	toggle = () => {
		this.setState({
		  modal: !this.state.modal
		});
	}

	getDataTaskTemplate() {
		fetch(`http://localhost/vbp/api/vbpapi/tasks/alltasktemplates`)
		.then(results => {
			return results.json();
		}).then(data => {
			this.setState({TaskTemplate:data});
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

	editAction(cell, row, enumObject, rowIndex) {
		return (
			<EditClient key={cell} cell={cell} row={row} rowIndex={rowIndex} />
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

    render() {
		const columns = [
			{
				dataField: 'client_name',
				text: 'Client',
				sort: true,
			},{
				dataField: 'vbp_task_name',
				text: 'VPB Task Name',
				sort: true,
			},{
				dataField: 'client_task_name',
				text: 'Client Task Name',
				sort: true,
			},
			{
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
									<h2>Task Template <button className="btn btn-success" onClick={this.toggle}> <i className="fa fa-plus"></i> &nbsp; Add Task Template </button></h2>  
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
												data={ this.state.TaskTemplate }
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
														data={ this.state.TaskTemplate }
														columns={ columns }
														defaultSorted={ defaultSorted } 
														pagination={ paginationFactory(options) }
														filter={ filterFactory() }
														defaultSortDirection="asc"
														noDataIndication={ 'no results found' }
														className="dataTables"
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
				<AddTaskTemplate isOpen={this.state.modal} toggle={this.toggle} tasksTable={this.getDataTaskTemplate()}/>
			</div>
        );
    }
}

