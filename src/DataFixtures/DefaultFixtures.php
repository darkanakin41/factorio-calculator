<?php

namespace App\DataFixtures;

use App\Entity\Mod;
use App\Entity\Product;
use App\Entity\ProductComponent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Exception;
use Symfony\Component\Yaml\Yaml;

class DefaultFixtures extends Fixture
{
    /**
     * @var Product[]
     */
    private $products = [];
    /**
     * @var Mod[]
     */
    private $mods = [];

    /**
     * Load product fixtures
     *
     * @param ObjectManager $manager
     * @throws Exception
     */
    public function load(ObjectManager $manager)
    {
        $this->loadMods($manager);
        $this->loadProducts($manager);
        $manager->flush();
    }

    /**
     * Load mods for a yaml file
     *
     * @param ObjectManager $manager
     * @throws Exception
     */
    private function loadMods(ObjectManager $manager)
    {
        $file = Yaml::parseFile(__DIR__ . '/fixtures/00-mods.yaml');

        /**
         * @var string $key
         * @var array $data
         */
        foreach ($file['mods'] as $key => $data) {
            $mod = new Mod();
            $this->mods[$key] = $mod;

            foreach ($data as $field => $value) {
                $setter = "set" . ucfirst($field);
                if (!method_exists($mod, $setter)) {
                    throw new Exception("Unknown field " . $field . " on class " . get_class($mod));
                }
                call_user_func([$mod, $setter], $value);
            }

            $manager->persist($mod);
        }
    }

    /**
     * Load products for a yaml file
     *
     * @param ObjectManager $manager
     * @throws Exception
     */
    private function loadProducts(ObjectManager $manager)
    {
        $file = Yaml::parseFile(__DIR__ . '/fixtures/10-products.yaml');

        /**
         * @var string $key
         * @var array $productData
         */
        foreach ($file['products'] as $key => $productData) {
            $product = new Product();
            $this->products[$key] = $product;

            foreach ($productData as $field => $value) {
                $setter = "set" . ucfirst($field);

                switch ($field) {
                    case 'mod';
                        if(!isset($this->mods[$value])){
                            throw new Exception('Unknown mod ' . $field);
                        }
                        $product->setMod($this->mods[$value]);
                        break;
                    case 'components';
                        foreach ($value as $componentData) {
                            $manager->persist($this->loadComponent($product, $componentData));
                        }
                        break;
                    default:
                        if (!method_exists($product, $setter)) {
                            throw new Exception("Unknown field " . $field . " on class " . get_class($product));
                        }
                        call_user_func([$product, $setter], $value);
                        break;
                }
            }

            $manager->persist($product);
        }
    }

    /**
     * Convert component data into ProductComponent
     *
     * @param Product $product
     * @param array $componentData
     *
     * @return ProductComponent
     *
     * @throws Exception
     */
    private function loadComponent(Product $product, array $componentData)
    {

        $productComponent = new ProductComponent();
        $productComponent->setProduct($product);

        foreach ($componentData as $field => $value) {
            $setter = "set" . ucfirst($field);
            if (!method_exists($productComponent, $setter)) {
                throw new Exception("Unknown field " . $field . " on class " . get_class($productComponent));
            }
            if ($field === 'component') {
                if (isset($this->products[$value])) {
                    $value = $this->products[$value];
                } else {
                    throw new Exception("Unknown component " . $value . " for product " . $product->getName());
                }

            }
            call_user_func([$productComponent, $setter], $value);
        }

        return $productComponent;
    }
}
