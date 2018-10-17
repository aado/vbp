<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\TechgroupsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\TechgroupsTable Test Case
 */
class TechgroupsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\TechgroupsTable
     */
    public $Techgroups;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.techgroups'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Techgroups') ? [] : ['className' => TechgroupsTable::class];
        $this->Techgroups = TableRegistry::getTableLocator()->get('Techgroups', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Techgroups);

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
