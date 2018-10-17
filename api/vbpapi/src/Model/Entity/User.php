<?php
namespace App\Model\Entity;

use Cake\Auth\DefaultPasswordHasher;
use Cake\ORM\Entity;

class User extends Entity
{
    protected $_accessible = [
        'id' => true,
        'email' => true,
        'firstname' => true,
        'lastname' => true,
        'access_type' => true,
        'direct_head' => true,
        // 'compid' => true,
        'department' => true,
        'role' => true,
        'client' => true,
        // 'photo' => true,
        'hand_over_date' => true,
        'created' => true,
        'modified' => true
    ];

    protected $_hidden = [
        'password'
    ];

    // Code from bake

    protected function _setPassword($value)
    {
        $hasher =  new DefaultPasswordHasher();
        return $hasher->hash($value);
    }
}
