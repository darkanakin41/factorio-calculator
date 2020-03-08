<?php

namespace App\DataFixtures;

use App\Entity\Item;
use App\Entity\Mod;
use App\Entity\Recipe;
use App\Entity\RecipeComponent;
use App\Entity\RecipeOutput;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Exception;
use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Yaml;

class DefaultFixtures extends Fixture
{
    /**
     * @var Item[]
     */
    private $items = [];
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
        $this->loadBase($manager);
        $this->loadMods($manager);
        $manager->flush();
    }

    /**
     * Load vanilla Factorio data
     *
     * @param ObjectManager $manager
     *
     * @throws Exception
     */
    private function loadBase(ObjectManager $manager){
        $items = Yaml::parseFile(__DIR__ . '/fixtures/00-item.yaml');
        $recipes = Yaml::parseFile(__DIR__ . '/fixtures/01-recipe.yaml');

        $this->loadItems($manager, $items);
        $this->loadRecipes($manager, $recipes);
    }

    /**
     * Load mods for a yaml file
     *
     * @param ObjectManager $manager
     * @throws Exception
     */
    private function loadMods(ObjectManager $manager)
    {
        $file = Yaml::parseFile(__DIR__ . '/fixtures/50-mods.yaml');

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

            try{
                $items = Yaml::parseFile(sprintf('%s/fixtures/%s/item.yaml', __DIR__ , $key));
                $this->loadItems($manager, $items);
            }catch(ParseException $e){}
            try{
                $recipes = Yaml::parseFile(sprintf('%s/fixtures/%s/recipe.yaml', __DIR__ , $key));
                $this->loadRecipes($manager, $recipes);
            }catch(ParseException $e){}

        }
    }

    /**
     * Load items from array data
     *
     * @param ObjectManager $manager
     * @param array $items
     *
     * @throws Exception
     */
    private function loadItems(ObjectManager $manager, array $items){

        /**
         * @var string $key
         * @var array $itemData
         */
        foreach ($items['items'] as $key => $itemData) {
            $item = new Item();
            $this->items[$key] = $item;

            foreach ($itemData as $field => $value) {
                $setter = "set" . ucfirst($field);

                switch ($field) {
                    case 'mod';
                        if(!isset($this->mods[$value])){
                            throw new Exception('Unknown mod ' . $field);
                        }
                        $item->setMod($this->mods[$value]);
                        break;
                    default:
                        if (!method_exists($item, $setter)) {
                            throw new Exception("Unknown field " . $field . " on class " . get_class($item));
                        }
                        call_user_func([$item, $setter], $value);
                        break;
                }
            }

            $manager->persist($item);
        }
    }
    /**
     * Load items for a yaml file
     *
     * @param ObjectManager $manager
     * @param array $recipes
     * @throws Exception
     */
    private function loadRecipes(ObjectManager $manager, array $recipes)
    {
        /**
         * @var string $key
         * @var array $productData
         */
        foreach ($recipes['recipes'] as $key => $productData) {
            $recipe = new Recipe();

            $output = null;
            foreach ($productData as $field => $value) {
                $setter = "set" . ucfirst($field);
                switch ($field) {
                    default:
                        if (!method_exists($recipe, $setter)) {
                            throw new Exception("Unknown field " . $field . " on class " . get_class($recipe));
                        }
                        call_user_func([$recipe, $setter], $value);
                        break;
                    case 'mod';
                        if(!isset($this->mods[$value])){
                            throw new Exception('Unknown mod ' . $value);
                        }
                        $recipe->setMod($this->mods[$value]);
                        break;
                    case 'outputs';
                        foreach ($value as $subEntityData) {
                            $manager->persist($output = $this->loadOutput($recipe, $subEntityData));
                        }
                        break;
                    case 'components';
                        foreach ($value as $subEntityData) {
                            $manager->persist($this->loadComponent($recipe, $subEntityData));
                        }
                        break;
                }
            }

            if($output === null){
                $manager->persist($output = $this->loadOutput($recipe, ['output' => $key]));
            }

            if(!isset($productData['name'])){
                $recipe->setName($output->getOutput()->getName());
            }

            $manager->persist($recipe);
        }
    }

    /**
     * Convert component data into ProductComponent
     *
     * @param Recipe $product
     * @param array $componentData
     *
     * @return RecipeComponent
     *
     * @throws Exception
     */
    private function loadComponent(Recipe $product, array $componentData)
    {

        $productComponent = new RecipeComponent();
        $productComponent->setRecipe($product);

        foreach ($componentData as $field => $value) {
            $setter = "set" . ucfirst($field);
            if (!method_exists($productComponent, $setter)) {
                throw new Exception("Unknown field " . $field . " on class " . get_class($productComponent));
            }
            if ($field === 'component') {
                if (isset($this->items[$value])) {
                    $value = $this->items[$value];
                } else {
                    throw new Exception("Unknown component " . $value . " for product " . $product->getName());
                }

            }
            call_user_func([$productComponent, $setter], $value);
        }

        return $productComponent;
    }

    /**
     * Convert component data into ProductComponent
     *
     * @param Recipe $recipe
     * @param array $outputData
     *
     * @return RecipeOutput
     *
     * @throws Exception
     */
    private function loadOutput(Recipe $recipe, array $outputData)
    {

        $output = new RecipeOutput();
        $output->setRecipe($recipe);

        foreach ($outputData as $field => $value) {
            $setter = "set" . ucfirst($field);
            if (!method_exists($output, $setter)) {
                throw new Exception("Unknown field " . $field . " on class " . get_class($output));
            }
            if ($field === 'output') {
                if (isset($this->items[$value])) {
                    $value = $this->items[$value];
                } else {
                    throw new Exception("Unknown component " . $value . " for product " . $recipe->getName());
                }

            }
            call_user_func([$output, $setter], $value);
        }

        return $output;
    }
}
