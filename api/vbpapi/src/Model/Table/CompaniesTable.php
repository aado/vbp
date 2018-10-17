<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class CompaniesTable extends Table
{

    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('companies');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');

        $this->belongsTo('Userscsm', [
            'className' => 'Users',
            'foreignKey' => 'id',
            'propertyName' => 'usercsm'
        ]);

        $this->belongsTo('Usersmanager', [
            'className' => 'Users',
            'foreignKey' => 'project_manager',
            'propertyName' => 'projmanager'
        ]);
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('name')
            ->maxLength('name', 500)
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->scalar('lisensee')
            ->maxLength('lisensee', 225)
            ->requirePresence('lisensee', 'create')
            ->notEmpty('lisensee');

        $validator
            ->scalar('website')
            ->maxLength('website', 500)
            ->requirePresence('website', 'create')
            ->notEmpty('website');

        $validator
            ->scalar('address')
            ->maxLength('address', 225)
            ->requirePresence('address', 'create')
            ->notEmpty('address');

        $validator
            ->scalar('city')
            ->maxLength('city', 225)
            ->requirePresence('city', 'create')
            ->notEmpty('city');

        $validator
            ->scalar('region')
            ->maxLength('region', 225)
            ->requirePresence('region', 'create')
            ->notEmpty('region');

        $validator
            ->scalar('country')
            ->maxLength('country', 500)
            ->requirePresence('country', 'create')
            ->notEmpty('country');

        $validator
            ->scalar('direct_head')
            ->maxLength('direct_head', 255)
            ->requirePresence('direct_head', 'create')
            ->notEmpty('direct_head');

        $validator
            ->integer('postcode')
            ->requirePresence('postcode', 'create')
            ->notEmpty('postcode');

        $validator
            ->scalar('project_owner')
            ->maxLength('project_owner', 500)
            ->requirePresence('project_owner', 'create')
            ->notEmpty('project_owner');

        $validator
            ->scalar('project_manager')
            ->maxLength('project_manager', 500)
            ->requirePresence('project_manager', 'create')
            ->notEmpty('project_manager');
        

        $validator
            ->scalar('phone')
            ->requirePresence('phone', 'create')
            ->notEmpty('phone');

        $validator
            ->scalar('compid')
            ->maxLength('compid', 225)
            ->requirePresence('compid', 'create')
            ->notEmpty('compid');

        // $validator
        //     ->scalar('title')
        //     ->maxLength('title', 500)
        //     ->requirePresence('title', 'create')
        //     ->notEmpty('title');

        return $validator;
    }
}
