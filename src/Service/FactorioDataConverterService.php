<?php


namespace App\Service;


use App\Entity\Item;
use App\Entity\Mod;
use App\Entity\Recipe;
use App\Entity\RecipeComponent;
use App\Exception\Factorio\ItemNotFoundException;
use Doctrine\Common\Persistence\ManagerRegistry;

class FactorioDataConverterService
{

    /**
     * @var LuaParser
     */
    private $parser;
    /**
     * @var ManagerRegistry
     */
    private $registry;

    public function __construct(LuaParser $parser, ManagerRegistry $registry)
    {
        $this->parser = $parser;
        $this->registry = $registry;
    }

    /**
     * Process data coming from factorio file
     *
     * @param string   $inputString
     * @param Mod|null $mod
     *
     * @throws ItemNotFoundException
     */
    public function processLuaString(string $inputString, Mod $mod = null)
    {
        $data = $this->parser->getData($inputString);

        foreach ($data as $row) {
            switch ($row['type']) {
                case 'item-with-entity-data':
                case 'item':
                    $this->processItemData($row, $mod);
                    break;
                case 'recipe':
                    $this->processRecipeData($row, $mod);
                    break;
            }

            $this->registry->getManager()->flush();
        }
    }

    /**
     * Process an Item
     *
     * @param array    $data
     * @param Mod|null $mod
     */
    private function processItemData(array $data, Mod $mod = null)
    {
        $name = $this->getName($data['name']);
        $item = $this->registry->getRepository(Item::class)->findOneBy(['slug' => $data['name']]);
        if ($item === null) {
            $item = new Item();
            $item->setMod($mod);
            $item->setSlug($data['name']);
            $item->setName($name);
            $this->registry->getManager()->persist($item);
            $this->registry->getManager()->flush();
        }
    }

    /**
     * Retrieve the proper name from a slug
     *
     * @param $slug
     *
     * @return string
     */
    private function getName($slug)
    {
        return ucwords(str_replace('-', ' ', $slug));
    }

    /**
     * Process a Recipe
     *
     * @param array    $data
     * @param Mod|null $mod
     *
     * @throws ItemNotFoundException
     */
    private function processRecipeData(array $data, Mod $mod = null)
    {
        $name = $this->getName($data['name']);
        $recipe = $this->registry->getRepository(Recipe::class)->findOneBy(['slug' => $data['name']]);
        if ($recipe === null) {
            $recipe = new Recipe();
            $recipe->setMod($mod);
            $recipe->setSlug($data['name']);
            $recipe->setName($name);
            $this->registry->getManager()->persist($recipe);
        }

        $this->processRecipeIngredientsData($data['ingredients'], $recipe);
        $this->processRecipeResultsData($data['ingredients'], $recipe);
    }

    /**
     * Process the Ingredients block of a recipe
     *
     * @param string | array $data
     * @param Recipe         $recipe
     *
     * @throws ItemNotFoundException
     */
    private function processRecipeIngredientsData(array $data, Recipe $recipe)
    {
        foreach ($data as $ingredient) {
            if (isset($ingredient['name'])) {
                $slug = $ingredient['name'];
                $quantity = $ingredient['amount'];
            } else {
                $slug = $ingredient[0];
                $quantity = $ingredient[1];
            }

            $item = $this->registry->getRepository(Item::class)->findOneBy(['slug' => $slug]);
            if ($item === null) {
                throw new ItemNotFoundException($slug);
            }
            $component = null;

            if ($recipe->getId() !== null) {
                $component = $this->registry->getRepository(RecipeComponent::class)->findOneBy([
                    'recipe' => $recipe->getId(),
                    'component' => $item->getId(),
                ]);
            }

            if ($component === null) {
                $component = new RecipeComponent();
                $component->setRecipe($recipe);
                $component->setComponent($item);
            }

            $component->setQuantity($quantity);
            $this->registry->getManager()->persist($recipe);
        }
    }

    /**
     * Process the Results block of a recipe
     *
     * @param string | array $data
     * @param Recipe         $recipe
     *
     * @throws ItemNotFoundException
     */
    private function processRecipeResultsData($data, Recipe $recipe)
    {
        if (is_string($data) || (is_array($data) && count($data) === 1)) {
            $data = [$data];
        }

        foreach ($data as $result) {
            if (isset($result['name'])) {
                $slug = $result['name'];
                $quantity = $result['amount'];
            } else {
                $slug = $result[0];
                $quantity = $result[1];
            }
            $item = $this->registry->getRepository(Item::class)->findOneBy(['slug' => $slug]);
            if ($item === null) {
                throw new ItemNotFoundException($slug);
            }

            $output = null;

            if ($recipe->getId() !== null) {
                $output = $this->registry->getRepository(RecipeComponent::class)->findOneBy([
                    'recipe' => $recipe->getId(),
                    'component' => $item->getId(),
                ]);
            }

            if ($output === null) {
                $output = new RecipeComponent();
                $output->setRecipe($recipe);
                $output->setComponent($item);
            }

            $output->setQuantity($quantity);
            $this->registry->getManager()->persist($recipe);
        }
    }
}
