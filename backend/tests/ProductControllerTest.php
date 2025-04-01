<?php

use PHPUnit\Framework\TestCase;
use App\Controllers\ProductController;

class ProductControllerTest extends TestCase
{
    private $controller;

    protected function setUp(): void
    {
        $this->controller = new ProductController();
    }

    public function testIndexReturnsArray()
    {
        $response = $this->controller->index();
        $this->assertIsArray($response);
        $this->assertArrayHasKey('status', $response);
        $this->assertEquals(200, $response['status']);
    }

    public function testShowReturnsProduct()
    {
        $response = $this->controller->show(1);
        $this->assertIsArray($response);
        $this->assertArrayHasKey('status', $response);
        $this->assertEquals(200, $response['status']);
        $this->assertArrayHasKey('data', $response);
    }
} 