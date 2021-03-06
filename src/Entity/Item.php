<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     itemOperations={
 *          "get"={"normalization"={"groups"={"item:read"}}},
 *          "patch",
 *          "delete"
 *     },
 *     collectionOperations={
 *          "get"={"maximum_items_per_page"=100000},
 *          "post",
 *     },
 *     attributes={"pagination_client_items_per_page"=true, "pagination_fetch_join_collection"=true}
 * )
 * @ApiFilter(PropertyFilter::class, arguments={"parameterName": "props" })
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "name": "ipartial", "type": "exact", "utility": "exact", "mod.id": "exact"})
 * @ApiFilter(OrderFilter::class, properties={"name", "type", "utility", "craftingTime"})
 * @ORM\Entity(repositoryClass="App\Repository\ItemRepository")
 * @ORM\Table(name="factorio_item")
 */
class Item
{
    /**
     * @var UuidInterface $id An autogenerated unique ID for the item
     * @ORM\Id()
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="Ramsey\Uuid\Doctrine\UuidGenerator")
     */
    private $id;

    /**
     * @var string $name The name of the item
     * @ORM\Column(type="string", length=255)
     * @Groups({"component:read", "item:read"})
     */
    private $name;

    /**
     * The type of the item
     *
     * In most case :
     * <ul>
     * <li>item</li>
     * <li>fluid</li>
     * </ul>
     *
     * @var string $type
     * @ORM\Column(type="string", length=255)
     * @Groups({"item:read"})
     */
    private $type = 'item';

    /**
     * What is the function
     *
     * Used right now :
     * <ul>
     * <li>component</li>
     * <li>machine</li>
     * <li>transport</li>
     * <li>module-efficiency</li>
     * <li>module-productivity</li>
     * <li>module-speed</li>
     * </ul>
     *
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Groups({"item:read"})
     */
    private $utility = 'component';

    /**
     * Number of items moved per second (for transport items)
     *
     * @var int|null
     * @ORM\Column(type="integer", nullable=true)
     * @Groups({"item:read"})
     */
    private $itemPerSecond = null;

    /**
     * Crafting speed (for machine)
     *
     * @var float|null
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"item:read"})
     */
    private $craftingSpeed = null;

    /**
     * @var float
     * @ORM\Column(type="float")
     * @Groups({"item:read"})
     */
    private $baseProductivity = 1;

    /**
     * Energy Consumption modifier for Modules (speed, efficiency and productivity)
     *
     * @var float|null
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"item:read"})
     */
    private $energyConsumption = null;

    /**
     * Crafting speed modifier for Modules (speed and productivity)
     *
     * @var float|null
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"item:read"})
     */
    private $speed = null;

    /**
     * Pollution modifier for Modules (efficiency and productivity)
     *
     * @var float|null
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"item:read"})
     */
    private $polution = null;

    /**
     * Productivity modifier for Modules (productivity)
     *
     * @var float|null
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"item:read"})
     */
    private $productivity = null;


    /**
     * The associated Mod
     *
     * @var Mod|null $mod
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Mod", cascade={"persist"})
     * @ORM\JoinColumn(name="mod_id", referencedColumnName="id")
     *
     * @ApiProperty(writableLink=true)
     * @Groups({"item:read"})
     */
    private $mod = null;

    public function getId()
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getUtility(): ?string
    {
        return $this->utility;
    }

    public function setUtility(string $utility): self
    {
        $this->utility = $utility;

        return $this;
    }

    public function getItemPerSecond(): ?int
    {
        return $this->itemPerSecond;
    }

    public function setItemPerSecond(?int $itemPerSecond): self
    {
        $this->itemPerSecond = $itemPerSecond;

        return $this;
    }

    public function getCraftingSpeed(): ?float
    {
        return $this->craftingSpeed;
    }

    public function setCraftingSpeed(?float $craftingSpeed): self
    {
        $this->craftingSpeed = $craftingSpeed;

        return $this;
    }

    public function getBaseProductivity(): ?float
    {
        return $this->baseProductivity;
    }

    public function setBaseProductivity(float $baseProductivity): self
    {
        $this->baseProductivity = $baseProductivity;

        return $this;
    }

    public function getEnergyConsumption(): ?float
    {
        return $this->energyConsumption;
    }

    public function setEnergyConsumption(?float $energyConsumption): self
    {
        $this->energyConsumption = $energyConsumption;

        return $this;
    }

    public function getSpeed(): ?float
    {
        return $this->speed;
    }

    public function setSpeed(?float $speed): self
    {
        $this->speed = $speed;

        return $this;
    }

    public function getPolution(): ?float
    {
        return $this->polution;
    }

    public function setPolution(?float $polution): self
    {
        $this->polution = $polution;

        return $this;
    }

    public function getProductivity(): ?float
    {
        return $this->productivity;
    }

    public function setProductivity(?float $productivity): self
    {
        $this->productivity = $productivity;

        return $this;
    }

    public function getMod(): ?Mod
    {
        return $this->mod;
    }

    public function setMod(?Mod $mod): self
    {
        $this->mod = $mod;

        return $this;
    }
}
