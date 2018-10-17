<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class UsersTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('users');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->hasMany('Bookmarks', [
            'foreignKey' => 'user_id'
        ]);

        $this->belongsToMany('Roles',[
            'foreignKey' => 'user_id',
            'targetForeignKey' => 'role_id',
            'joinTable' => 'users_roles'
        ]);
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('firstname')
            ->requirePresence('firstname', 'create')
            ->notEmpty('firstname');

        $validator
            ->scalar('lastname')
            ->requirePresence('lastname', 'create')
            ->notEmpty('lastname');

        $validator
            ->scalar('client')
            ->maxLength('client', 225)
            ->requirePresence('client', 'create')
            ->notEmpty('client');

        $validator
            ->scalar('access_type')
            ->maxLength('access_type', 80)
            ->requirePresence('access_type', 'create')
            ->notEmpty('access_type');

        $validator
            ->scalar('role')
            ->maxLength('role', 500)
            ->requirePresence('role', 'create')
            ->notEmpty('role');

        $validator
            ->scalar('direct_head')
            ->maxLength('direct_head', 500)
            ->requirePresence('direct_head', 'create')
            ->notEmpty('direct_head');
        
        $validator
            ->scalar('department')
            ->maxLength('department', 255)
            ->requirePresence('department', 'create')
            ->notEmpty('department');

         $validator
            ->scalar('email')
            ->maxLength('email', 255)
            ->requirePresence('email', 'create')
            ->notEmpty('email');
        
        $validator
            ->scalar('hand_over_date')
            ->maxLength('hand_over_date', 100)
            ->requirePresence('hand_over_date', 'create')
            ->notEmpty('hand_over_date');

    //         access_type: "Administrator"
    // client: "EJM Financial Servies"
    // compid: "jn2xqox55wiju"
    // department: "The Forge"
    // direct_head: "David Carney"
    // email: "sfdfsf@test.com"
    // firstname: "sdsdfdfs"
    // hand_over_date: ""
    // lastname: "sdfsdf"
    // role: "Paraplanner"

        

        //  $validator
        //     ->scalar('photo')
        //     ->requirePresence('photo', 'create')
        //     ->notEmpty('photo');

        // $validator
        //     ->scalar('password')
        //     ->maxLength('password', 255)
        //     ->requirePresence('password', 'create')
        //     ->notEmpty('password');

        return $validator;
    }
    
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->isUnique(['email']));

        return $rules;
    }
}
