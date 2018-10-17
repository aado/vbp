<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Task Entity
 *
 * @property int $id
 * @property string $client_name
 * @property string $vbp_task_name
 * @property string $client_task_name
 * @property string $procedure_url
 * @property string $kpi_due_date
 * @property \Cake\I18n\FrozenTime $created
 */
class Task extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'client_name' => true,
        'vbp_task_name' => true,
        'client_task_name' => true,
        'procedure_url' => true,
        'kpi_due_date' => true,
        'kpi_time' => true,
        'created' => true
    ];
}
