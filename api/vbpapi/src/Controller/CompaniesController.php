<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
Use Cake\Http\Client;
use Cake\ORM\TableRegistry;

class CompaniesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->Auth->allow([
            'add'.
            'allcompanies',
            'allusers',
            'allpositions',
            'editcompanies',
            'addcontact',
            'getothercontacts',
            'getcsm',
            'teammembers',
            'deletecontact',
            'editcontact',
            'allnotes',
            'addnotes'
        ]);
    }

    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow([
            'add',
            'allcompanies',
            'allusers',
            'allpositions',
            'editcompanies',
            'addcontact',
            'getothercontacts',
            'getcsm',
            'teammembers',
            'deletecontact',
            'editcontact',
            'allnotes',
            'addnotes'
        ]);
        $actions = [
            'add',
            'allcompanies',
            'allusers',
            'allpositions',
            'editcompanies',
            'addcontact',
            'getothercontacts',
            'getcsm',
            'teammembers',
            'deletecontact',
            'editcontact',
            'allnotes',
            'addnotes'
        ];

        if (in_array($this->request->getParam('action'), $actions)) {
            $this->eventManager()->off($this->Csrf);
            $this->Security->config('unlockedActions', $actions);
        }
    }

    public function add()
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        $company = $this->Companies->newEntity();
        if(sizeof($data) != 0) {
            if ($this->request->is('post')) {
                $company = $this->Companies->patchEntity($company, $this->request->getData());
                if ($this->Companies->save($company)) {
                    return $this->response->withType("application/json")->withStringBody(json_encode($company));
                } else {
                    return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
                }
            }
        }
    }

    public function addcontact()
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        $contacts = $this->Contacts->newEntity();
        if(sizeof($data) != 0) {
            if ($this->request->is('post')) {
                $contacts = $this->Contacts->patchEntity($contacts, $this->request->getData());
                if ($this->Contacts->save($contacts)) {
                    return $this->response->withType("application/json")->withStringBody(json_encode($contacts));
                } else {
                    return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
                }
            }
        }
    }

    public function allcompanies($id = null) {
        $this->autoRender = false;
        if(isset($id)) {
            $companies = $this->Companies->get($id)->toArray();
            return $this->response->withType("application/json")->withStringBody(json_encode($companies));
        }
        // $companies = $this->Companies->find('all',['order' => ['companies.created' => 'DESC']])->toArray();
        $companies = $this->Companies->find('all',['order' => ['companies.created' => 'DESC']])->contain(['Userscsm'])->toArray();
        // $companies = $this->Companies->find()->contain(['Usersowner'])->contain(['Usersmanager'])->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($companies));
    }

    public function allnotes($id = null) {
        $this->autoRender = false;
        if(isset($id)) {
            $notes = $this->Notes->find('all',['order' => ['created' => 'DESC']])->where(['clientid' => $id])->toArray();
            return $this->response->withType("application/json")->withStringBody(json_encode($notes));
        }
    }

    public function addnotes()
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        var_dump($data);
        $notes = $this->Notes->newEntity();
        if(sizeof($data) != 0) {
            if ($this->request->is('post')) {
                $notes = $this->Notes->patchEntity($notes, $this->request->getData());
                if ($this->Notes->save($notes)) {
                    return $this->response->withType("application/json")->withStringBody(json_encode($notes));
                } else {
                    return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
                }
            }
        }
    }

    public function teammembers($name) {
        $this->autoRender = false;
        $users = $this->Users->find('all',['client LIKE' => $name])->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($users));
    }

    public function getothercontacts($id = null) {
        $this->autoRender = false;
        if(isset($id)) {
            $contacts = $this->Contacts->find()->where(['clientid' => $id]);
            return $this->response->withType("application/json")->withStringBody(json_encode($contacts));
        }
    }

    public function allusers() {
        $this->autoRender = false;
        $users = $this->Users->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($users));
    }

    public function getcsm($client) {
        $this->autoRender = false;
        $users = $this->Users->find()->where(['client' => $client, 'access_type' => 'User'])->limit(1)->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($users));
    }

    public function allpositions() {
        $this->autoRender = false;
        $positions = $this->Positions->find()->toArray();
        return $this->response->withType("application/json")->withStringBody(json_encode($positions));
    }

    public function editcompanies($id = null)
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        if(sizeof($data) != 0) {
            $clientData= $this->request->getData();
            $clientTable = TableRegistry::get('Companies');
            $client = $clientTable->get($id); 
            $client->name = $clientData['client_name'];
            $client->lisensee = $clientData['lisensee'];
            $client->region = $clientData['region'];
            $client->direct_head = $clientData['direct_head'];
            $client->phone = $clientData['client_phone'];
            $client->website = $clientData['website'];
            $client->address = $clientData['address'];
            $client->postcode = $clientData['postcode'];
            $client->city = $clientData['city'];
            $client->project_manager = $clientData['project_manager'];
            $client->project_owner = $clientData['project_owner'];
            if ($clientTable->save($client)) {
                return $this->response->withType("application/json")->withStringBody(json_encode($client));
            } else {
                return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
            }
        }
    }

    public function deletecontact($id = null)
    {
        $this->autoRender = false;
        $contact = $this->Contacts->get($id);
        if ($this->Contacts->delete($contact)) {
            return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'success']));
        } else {
            return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
        }
    }

    public function editcontact($id=null)
    {
        $this->autoRender = false;
        $data = $this->request->input('json_decode');
        if(sizeof($data) != 0) {
            $contactData= $this->request->getData();
            $contactTable = TableRegistry::get('Contacts');
            $contact = $contactTable->get($id); 
            $contact->clientid = $contactData['clientid'];
            $contact->name = $contactData['name'];
            $contact->position = $contactData['position'];
            $contact->phone = $contactData['phone'];
            $contact->email = $contactData['email'];
            if ($contactTable->save($contact)) {
                return $this->response->withType("application/json")->withStringBody(json_encode($contact));
            } else {
                return $this->response->withType("application/json")->withStringBody(json_encode(['result' => 'error']));
            }
        }
    }
    
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $company = $this->Companies->get($id);
        if ($this->Companies->delete($company)) {
            $this->Flash->success(__('The company has been deleted.'));
        } else {
            $this->Flash->error(__('The company could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
