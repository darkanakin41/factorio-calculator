<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     itemOperations={
 *          "get",
 *          "delete"
 *     },
 *     collectionOperations={
 *          "get",
 *          "post"={"denormalization"={"groups"={"output:write"}}}
 *     }
 * )
 * @ApiFilter(PropertyFilter::class, arguments={"parameterName": "props" })
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "recipe.id": "exact"})
 *
 * @ORM\Entity(repositoryClass="App\Repository\RecipeOutputRepository")
 * @ORM\Table(
 *    uniqueConstraints={
 *        @ORM\UniqueConstraint(name="recipe_output_uniq", columns={"recipe_id", "output_id"})
 *    }
 * )
 * @ORM\Table(name="factorio_recipe_output")
 */
class RecipeOutput
{
    /**
     * An autogenerated unique ID for the recipe output
     *
     * @var UuidInterface $id
     *
     * @ORM\Id()
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="Ramsey\Uuid\Doctrine\UuidGenerator")
     */
    private $id;

    /**
     * The quantity of the recipe needed
     *
     * @var int
     * @ORM\Column(type="integer")
     *
     * @Groups({"output:write"})
     */
    private $quantity = 1;

    /**
     * The recipe
     *
     * @var Recipe
     *
     * @ORM\ManyToOne(targetEntity="Recipe", cascade={"persist"})
     * @ORM\JoinColumn(name="recipe_id", referencedColumnName="id")
     *
     * @ApiProperty(writableLink=true)
     * @Groups({"output:write"})
     */
    private $recipe;

    /**
     * The output
     *
     * @var Item
     *
     * @ORM\ManyToOne(targetEntity="Item", cascade={"persist"})
     * @ORM\JoinColumn(name="output_id", referencedColumnName="id")
     *
     * @ApiProperty(writableLink=true)
     * @Groups({"output:write"})
     */
    private $output;

    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }


    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }

    public function getOutput(): ?Item
    {
        return $this->output;
    }

    public function setOutput(?Item $output): self
    {
        $this->output = $output;

        return $this;
    }
}
