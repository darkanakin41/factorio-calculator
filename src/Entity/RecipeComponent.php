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
 *          "post"={"denormalization"={"groups"={"component:write"}}}
 *     }
 * )
 * @ApiFilter(PropertyFilter::class, arguments={"parameterName": "props" })
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "recipe.id": "exact"})
 *
 * @ORM\Entity(repositoryClass="App\Repository\RecipeComponentRepository")
 * @ORM\Table(
 *    uniqueConstraints={
 *        @ORM\UniqueConstraint(name="recipe_component_uniq", columns={"recipe_id", "component_id"})
 *    }
 * )
 * @ORM\Table(name="factorio_recipe_component")
 */
class RecipeComponent
{
    /**
     * An autogenerated unique ID for the recipe component
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
     * @Groups({"component:write"})
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
     * @Groups({"component:write"})
     */
    private $recipe;

    /**
     * The component
     *
     * @var Item
     *
     * @ORM\ManyToOne(targetEntity="Item", cascade={"persist"})
     * @ORM\JoinColumn(name="component_id", referencedColumnName="id")
     *
     * @ApiProperty(writableLink=true)
     * @Groups({"component:write"})
     */
    private $component;

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

    public function getComponent(): ?Item
    {
        return $this->component;
    }

    public function setComponent(?Item $component): self
    {
        $this->component = $component;

        return $this;
    }
}
