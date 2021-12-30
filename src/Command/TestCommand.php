<?php

namespace App\Command;

use App\Service\LuaParser;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class TestCommand extends Command
{
    protected static $defaultName = 'app:test';
    /**
     * @var LuaParser
     */
    private $parser;


    public function __construct(LuaParser $parser, string $name = null)
    {
        parent::__construct($name);
        $this->parser = $parser;
    }

    protected function configure()
    {
        $this->setDescription('Just a test command');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->note('read the file');

        $content = file_get_contents(__DIR__.'/test-recipe.lua');
        $this->parser->getData($content);
        $io->success('Done');

        return 0;
    }
}
