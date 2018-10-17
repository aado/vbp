<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Subtasks Model
 *
 * @method \App\Model\Entity\Subtask get($primaryKey, $options = [])
 * @method \App\Model\Entity\Subtask newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Subtask[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Subtask|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Subtask|bool saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Subtask patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Subtask[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Subtask findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class SubtasksTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('subtasks');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->addBehavior('Timestamp');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->integer('templateid')
            ->requirePresence('templateid', 'create')
            ->notEmpty('templateid');

        $validator
            ->scalar('name')
            ->maxLength('name', 225)
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->integer('status')
            // ->requirePresence('status', 'create')
            ->allowEmpty('status');

        $validator
            ->scalar('time')
            ->maxLength('time', 20)
            // ->requirePresence('time', 'create')
            ->allowEmpty('time');

        return $validator;
    }
}
