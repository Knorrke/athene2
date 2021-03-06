<?php
namespace BlogTest\Entity;

use AtheneTest\TestCase\AbstractGetterSetterTestCase;
use Blog\Entity\Post;
use DateTime;
use Exception;

class PostTest extends AbstractGetterSetterTestCase
{
    private $post;

    public function setUp()
    {
        parent::setUp();
        $this->post  = new Post();
        parent::setObject($this->post);
    }

    protected function getData()
    {
        return array(
            "author" => $this->createMock("User\Entity\UserInterface"),
            "blog" => $this->createMock("Taxonomy\Entity\TaxonomyTermInterface"),
            "title" => "title",
            "content" => "content",
            "timestamp" => new DateTime(),
            "publish" => new DateTime(),

        );
    }

    public function testIsPublished()
    {
        $post = new Post();
        //set DateTime in past
        $post->setPublish(new Datetime("2000-03-14"));
        $this->assertTrue($post->isPublished());
    }

    public function testAddTaxonomyTerm()
    {
        $post = new Post();
        $taxTerm = $this->createMock("Taxonomy\Entity\TaxonomyTermInterface");
        $post->addTaxonomyTerm($taxTerm);
        $this->assertSame($taxTerm, $post->getBlog());
    }

    public function testRemoveTaxonomyTerm()
    {
        $post = new Post();

        //test for unimplemented method -> exception
        $this->expectException(Exception::class);
        $post->removeTaxonomyTerm($this->createMock("Taxonomy\Entity\TaxonomyTermInterface"));
    }
}
