<?php
namespace App\Test\TestCase\Model\Behavior;

use App\Model\Behavior\CommunicationsBehavior;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Behavior\CommunicationsBehavior Test Case
 */
class CommunicationsBehaviorTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Behavior\CommunicationsBehavior
     */
    public $Communications;

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $this->Communications = new CommunicationsBehavior();
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Communications);

        parent::tearDown();
    }

    /**
     * Test initial setup
     *
     * @return void
     */
    public function testInitialization()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
