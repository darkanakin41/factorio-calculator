<?php


namespace App\Controller\Api;


use App\Entity\Mod;
use App\Service\FactorioDataConverterService;
use App\Service\LuaParser;
use Symfony\Component\HttpFoundation\RequestStack;

final class ModController
{
    /**
     * @var RequestStack
     */
    private $requestStack;
    /**
     * @var FactorioDataConverterService
     */
    private $fileConverterService;

    public function __construct(RequestStack $requestStack, FactorioDataConverterService $fileConverterService)
    {
        $this->fileConverterService = $fileConverterService;
        $this->requestStack = $requestStack;
    }

    public function __invoke(Mod $data)
    {
        $input = json_decode($this->requestStack->getCurrentRequest()->getContent(), true);

        if($input['itemsFile'] !== null){
            $this->fileConverterService->processLuaString(base64_decode($input['itemsFile']), $data);
        }
        if($input['recipesFile'] !== null){
            $this->fileConverterService->processLuaString(base64_decode($input['recipesFile']), $data);
        }

        return $data;
    }
}
