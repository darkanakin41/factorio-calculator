<?php


namespace App\Exception\Factorio;


use Exception;
use Throwable;

class ItemNotFoundException extends Exception
{
    public function __construct($slug, Throwable $previous = null)
    {
        $message = sprintf('Item with slug %s not found', $slug);
        parent::__construct($message, 0, $previous);
    }
}
