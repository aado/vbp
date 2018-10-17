<?php

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

class AppController extends Controller
{

    public function initialize()
    {
        parent::initialize();
        $this->loadModel('Users');
        $this->loadModel('Roles');
        $this->loadModel('Positions');
        $this->loadModel('Heads');
        $this->loadModel('Companies');
        $this->loadModel('Contacts');
        $this->loadModel('Notes');
        $this->loadModel('Tasks');

        $this->loadComponent('RequestHandler', [
            'enableBeforeRedirect' => false,
        ]);
        $this->loadComponent('Flash');
        // $this->loadComponent('Param');
        $this->loadComponent('Auth', [
            'authorize' => 'Controller', 
        	'authenticate' => [
        		'Form' => [
        			'fields' => [
        				'username' => 'email',
        				'password' => 'password'
        			]
        		]
        	],
			'loginAction' => [
				'controller' => 'Users',
				'action' => 'login'
			],
			'loginRedirect' => [
				'controller' => 'Tickets',
				'action' => 'index'
			],
        	'unauthorizedRedirect' => [
                'controller' => 'Tickets',
                'action' => 'index'
            ],
        ]);
		$this->Auth->allow(['display']);
		$this->loadComponent('Security');
		$this->set('sess_username', $this->Auth->user('firstname').' '.$this->Auth->user('lastname'));
        $this->set('sess_user_id', $this->Auth->user('id'));
		$this->set('userRole', $this->Auth->user('role'));

		// problem checker
        // if($this->Auth->user('role') == "User" ) {
        //     $checkIssues = $this->Communications->find()->where(['status' => 1])->count();
        // } else {
        //     $checkIssues = 0;
        // }

        $users = $this->Users->find('list',['keyField' => 'id','valueField' => function ($row) {
            return $row['firstname'] . ' ' . $row['lastname'];
        }])->toArray();
        // $techgroups = $this->Techgroups->find('list',['keyField' => 'id','valueField' => 'name'])->toArray();
        // $checkIssues = isset($checkIssues)? $checkIssues : 0; 
        // $typeTable = ['<span class="badge badge-pill badge-warning">Critical</span>',
        //                 '<span class="badge badge-pill badge-danger">Urgent</span>',
        //                 '<span class="badge badge-pill badge-danger">High</span>',
        //                 '<span class="badge badge-pill badge-primary">Medium</span>',
        //                 '<span class="badge badge-pill badge-success">Low</span>'
        //             ];
        // $ticketTable = ['<span class="badge badge-pill badge-primary">New</span>',
        //                 '<span class="badge badge-pill badge-info">Open</span>',
        //                 '<span class="badge badge-pill badge-danger">Pending</span>',
        //                 '<span class="badge badge-pill badge-primary">In Progress</span>',
        //                 '<span class="badge badge-pill badge-success">Solved</span>',
        //                 '<span class="badge badge-pill badge-danger">Closed</span>'];
        // $ticket_status = ['New','Open','Pending','In Progress','Solved','Closed'];
        // $ticket_type = ['Critical','Urgent','High','Medium','Low'];
        // $departments = $this->Departments->find('list',['keyField' => 'id', 'valueField' => 'name'])->toArray();
        // $globalRoles = $this->Role->find('list',['keyField' => 'id', 'valueField' => 'name'])->toArray();


        // $globalAuthUser = $this->Auth->user();
        // $this->set(compact(
        //     'ticket_type',
        //     'ticket_status',
        //     'ticketTable',
        //     'communication_type',
        //     'typeTable',
        //     'users',
        //     'checkIssues',
        //     'techgroups',
        //     'departments',
        //     'globalRoles',
        //     'globalAuthUser'
        // ));
    }

	public function isAuthorized($user)
	{
		return false;
	}

    public function authUser() {
        return $this->Auth->user();
    }
}
