<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

class ContactsTable extends Table
{
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('contacts');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');
    }

    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('clientid')
            ->maxLength('clientid', 500)
            ->notEmpty('clientid');

        $validator
            ->scalar('name')
            ->maxLength('name', 225)
            ->allowEmpty('name');

        $validator
            ->scalar('position')
            ->maxLength('position', 500)
            ->allowEmpty('position');

        $validator
            ->scalar('phone')
            ->maxLength('phone', 225)
            ->allowEmpty('phone');

        $validator
            ->email('email')
            ->maxLength('email', 225)
            ->allowEmpty('email');

        return $validator;
    }
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->isUnique(['email']));

        return $rules;
    }
}
