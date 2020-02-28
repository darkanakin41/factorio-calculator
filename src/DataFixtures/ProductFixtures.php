<?php

namespace App\DataFixtures;

use App\Entity\Product;
use App\Entity\ProductComponent;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Exception;
use Symfony\Component\Yaml\Yaml;

class ProductFixtures extends Fixture
{
    /**
     * @var Product[]
     */
    private $products = [];

    /**
     * Load product fixtures
     *
     * @param ObjectManager $manager
     * @throws Exception
     */
    public function load(ObjectManager $manager)
    {
        $this->loadProducts($manager);
        $manager->flush();
    }

    /**
     * Load products for a yaml file
     *
     * @param ObjectManager $manager
     * @throws Exception
     */
    private function loadProducts(ObjectManager $manager)
    {
        $file = Yaml::parseFile(__DIR__ . '/fixtures/products.yaml');

        /**
         * @var string $key
         * @var array $productData
         */
        foreach ($file['products'] as $key => $productData) {
            $product = new Product();
            $this->products[$key] = $product;

            foreach ($productData as $field => $value) {
                $setter = "set" . ucfirst($field);

                if($field === 'components'){
                    foreach($value as $componentData){
                        $manager->persist($this->loadComponent($product, $componentData));
                    }
                }else{
                    if (!method_exists($product, $setter)) {
                        throw new Exception("Unknown field " . $field . " on class " . get_class($product));
                    }
                    call_user_func([$product, $setter], $value);
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
    private function loadComponent(Product $product, array $componentData){

        $productComponent = new ProductComponent();
        $productComponent->setProduct($product);

        foreach($componentData as $field => $value){
            $setter = "set" . ucfirst($field);
            if (!method_exists($productComponent, $setter)) {
                throw new Exception("Unknown field " . $field . " on class " . get_class($productComponent));
            }
            if($field === 'component'){
                if(isset($this->products[$value])){
                    $value = $this->products[$value];
                }else{
                    throw new Exception("Unknown component " . $value . " for product " . $product->getName());
                }

            }
            call_user_func([$productComponent, $setter], $value);
        }

        return $productComponent;
    }
}
