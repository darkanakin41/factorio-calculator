<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\ProductComponent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $ironOre = new Product();
        $ironOre->setName('Iron Ore');
        $ironOre->setCraftingTime(1);
        $ironOre->setOutput(1);
        $ironOre->setType('item');
        $ironOre->setUtility('component');
        $manager->persist($ironOre);

        $copperOre = new Product();
        $copperOre->setName('Copper Ore');
        $copperOre->setCraftingTime(1);
        $copperOre->setOutput(1);
        $copperOre->setType('item');
        $copperOre->setUtility('component');
        $manager->persist($copperOre);

        $coal = new Product();
        $coal->setName('Coal');
        $coal->setCraftingTime(1);
        $coal->setOutput(1);
        $coal->setType('item');
        $coal->setUtility('component');
        $manager->persist($coal);

        $ironPlate = new Product();
        $ironPlate->setName('Iron Plate');
        $ironPlate->setCraftingTime(3);
        $ironPlate->setOutput(1);
        $ironPlate->setType('item');
        $ironPlate->setUtility('component');
        $manager->persist($ironPlate);

        $ironPlateComponent = new ProductComponent();
        $ironPlateComponent->setQuantity(1);
        $ironPlateComponent->setProduct($ironPlate);
        $ironPlateComponent->setComponent($ironOre);
        $manager->persist($ironPlateComponent);



        $manager->flush();
    }
}
