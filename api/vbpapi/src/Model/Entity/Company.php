<?php
namespace App\Model\Entity;
use Cake\ORM\Entity;

class Company extends Entity
{
    protected $_accessible = [
        'name' => true,
        'lisensee' => true,
        'address' => true,
        'city' => true,
        'region' => true,
        'website' => true,
        'country' => true,
        'phone' => true,
        'postcode' => true,
        'direct_head' => true,
        'project_owner' => true,
        'project_manager' => true,
        // 'another_contact_email' => true,
        // 'manager_phone' => true,
        // 'manager_email' => true,
        'compid' => true,
        'modified' => true,
        'created' => true
    ];
}
