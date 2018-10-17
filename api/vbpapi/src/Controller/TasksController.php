<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;

class TasksController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->Auth->allow([
        	'add',
            'login',
            'edit',
            'userlogin',
            'allroles',
            'allclients',
            'edituser',
            'alltasktemplates',
            'addsubtasks'
        ]);
    }


    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow([
            'userlogin',
            'alltasktemplates',
            'allroles',
            'adduser',
            'allclients',
            'edituser',
            'add',
            'addsubtasks'
        ]);
        $actions = [
            'userlogin',
            'alltasktemplates',
            'allroles',
            'adduser',
            'allclients',
            'edituser',
            'add',
            'addsubtasks'
        ];

        if (in_array($this->request->getParam('action'), $actions)) {
            $this->eventManager()->off($this->Csrf);
            $this->Security->config('unlockedActions', $actions);
        }
    }
    
    public function alltasktemplates() {
        $this->autoRender = false;
        $tasks = $this->Tasks->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($tasks));
    }

    public function allclients() {
        $this->autoRender = false;
        $companies = $this->Companies->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($companies));
    }
    
    public function add() {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        if(sizeof($data) != 0) {
            $postdata = $this->Tasks->newEntity();
            if ($this->request->is('post')) {
                $postdata = $this->Tasks->patchEntity($postdata, $this->request->getData());
                if ($this->Tasks->save($postdata)) {
                    return $this->response->withType("application/json")->withStringBody(json_encode($postdata));
                } else {
                    return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
                }
            }
        }
    }

    public function addsubtasks()
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        $dataValue = $this->Subtasks->newEntity();
        if(sizeof($data) != 0) {
            if ($this->request->is('post')) {
                $dataValue = $this->Subtasks->patchEntity($dataValue, $this->request->getData());
                if ($this->Subtasks->save($dataValue)) {
                    return $this->response->withType("application/json")->withStringBody(json_encode($dataValue));
                } else {
                    return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
                }
            }
        }
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
