<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\CommunicationsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\CommunicationsTable Test Case
 */
class CommunicationsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\CommunicationsTable
     */
    public $Communications;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.communications'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Communications') ? [] : ['className' => CommunicationsTable::class];
        $this->Communications = TableRegistry::getTableLocator()->get('Communications', $config);
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
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
