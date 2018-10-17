<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\TechnicalsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\TechnicalsTable Test Case
 */
class TechnicalsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\TechnicalsTable
     */
    public $Technicals;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.technicals'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Technicals') ? [] : ['className' => TechnicalsTable::class];
        $this->Technicals = TableRegistry::getTableLocator()->get('Technicals', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Technicals);

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
