<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

class UsersController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->Auth->allow([
        	'logout',
        	'add',
            'login',
            'edit',
            'userlogin',
            'allroles',
            'allheads',
            'allclients',
            'edituser',
            'adduser'
        ]);
    }


    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow([
            'userlogin',
            'allusers',
            'allroles',
            'adduser',
            'allheads',
            'allclients',
            'edituser'
        ]);
        $actions = [
            'userlogin',
            'allusers',
            'allroles',
            'adduser',
            'allheads',
            'allclients',
            'edituser'
        ];

        if (in_array($this->request->getParam('action'), $actions)) {
            $this->eventManager()->off($this->Csrf);
            $this->Security->config('unlockedActions', $actions);
        }
    }

    public function userlogin() {
        $this->autoRender = false;
        $jsonData = $this->request->input('json_decode');
        $users = $this->Users->find()->where(['id' => $jsonData->index_signin]);
        echo json_encode(['result' => $users]);
    }
    
    public function allusers() {
        $this->autoRender = false;
        $users = $this->Users->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($users));
    }

    public function allroles() {
        $this->autoRender = false;
        $roles = $this->Roles->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($roles));
    }

    public function allheads() {
        $this->autoRender = false;
        $heads = $this->Heads->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($heads));
    }

    public function allclients() {
        $this->autoRender = false;
        $companies = $this->Companies->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($companies));
    }
    
    public function adduser() {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        if(sizeof($data) != 0) {
            $user = $this->Users->newEntity();
            if ($this->request->is('post')) {
                $user = $this->Users->patchEntity($user, $this->request->getData());
                if ($this->Users->save($user)) {
                    return $this->response->withType("application/json")->withStringBody(json_encode($user));
                } else {
                    return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
                }
            }
        }
    }

	public function login()
	{
		if($this->Auth->user('id')) { 
			$this->Flash->warning(__('You are already logged in!'));
			return $this->redirect($this->Auth->redirectUrl());
		}
		if ($this->request->is('post')) {
			$user = $this->Auth->identify();
			if ($user) {
				$this->Auth->setUser($user);
				$this->Flash->success(__('Login Successful'));
				return $this->redirect($this->Auth->redirectUrl());
			}
			$this->Flash->error('Your username or password is incorrect.');
		}
		
	}

	public function logout()
	{
		$this->Flash->success('You are now logged out.');
		return $this->redirect($this->Auth->logout());
	}

    public function add()
    {
        $user = $this->Users->newEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been successfully registered.'));

                return $this->redirect(['action' => 'login']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
            return $this->redirect(['action' => 'login']);
        }
        $this->set(compact('user'));
    }

    public function edituser($id = null)
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        if(sizeof($data) != 0) {
            $userData= $this->request->getData();
            $userTable = TableRegistry::get('Users');
            $user = $userTable->get($id); 
            $user->firstname = $userData['firstname'];
            $user->lastname = $userData['lastname'];
            $user->access_type = $userData['access_type'];
            $user->role = $userData['role'];
            $user->direct_head = $userData['direct_head'];
            $user->department = $userData['department'];
            $user->email = $userData['email'];
            $user->client = $userData['client'];
            $user->hand_over_date = $userData['hand_over_date'];
            if ($userTable->save($user)) {
                return $this->response->withType("application/json")->withStringBody(json_encode($user));
            } else {
                return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
            }
        }
    }

    public function edit($id = null)
    {
        $user = $this->Users->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $user = $this->Users->get($id);
        if ($this->Users->delete($user)) {
            $this->Flash->success(__('The user has been deleted.'));
        } else {
            $this->Flash->error(__('The user could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
