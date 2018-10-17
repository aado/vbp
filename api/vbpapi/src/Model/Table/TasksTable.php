<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Tasks Model
 *
 * @method \App\Model\Entity\Task get($primaryKey, $options = [])
 * @method \App\Model\Entity\Task newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Task[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Task|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Task|bool saveOrFail(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Task patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Task[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Task findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class TasksTable extends Table
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

        $this->setTable('tasks');
        $this->setDisplayField('id');
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
            ->scalar('client_name')
            ->maxLength('client_name', 500)
            ->requirePresence('client_name', 'create')
            ->notEmpty('client_name');

        $validator
            ->scalar('vbp_task_name')
            ->maxLength('vbp_task_name', 225)
            ->requirePresence('vbp_task_name', 'create')
            ->notEmpty('vbp_task_name');

        $validator
            ->scalar('client_task_name')
            ->maxLength('client_task_name', 225)
            ->requirePresence('client_task_name', 'create')
            ->notEmpty('client_task_name');

        $validator
            ->scalar('procedure_url')
            ->maxLength('procedure_url', 225)
            ->requirePresence('procedure_url', 'create')
            ->notEmpty('procedure_url');

        $validator
            ->scalar('kpi_due_date')
            ->maxLength('kpi_due_date', 100)
            ->requirePresence('kpi_due_date', 'create')
            ->notEmpty('kpi_due_date');

        $validator
            ->scalar('kpi_time')
            ->maxLength('kpi_time', 20)
            ->requirePresence('kpi_time', 'create')
            ->notEmpty('kpi_time');

        return $validator;
    }
}
