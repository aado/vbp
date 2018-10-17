<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\IctservicesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\IctservicesTable Test Case
 */
class IctservicesTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\IctservicesTable
     */
    public $Ictservices;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.ictservices'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::getTableLocator()->exists('Ictservices') ? [] : ['className' => IctservicesTable::class];
        $this->Ictservices = TableRegistry::getTableLocator()->get('Ictservices', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Ictservices);

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
