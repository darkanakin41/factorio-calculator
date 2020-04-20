<?php


namespace App\Service;


class LuaParser
{
    const LUA_REPLACER = [
        '{' => '[',
        '=' => '=>',
        '}' => ']',
        '\n' => PHP_EOL,
        '\r' => PHP_EOL,
        'nil' => 'null'
    ];

    public function getData(string $fileContent)
    {
        preg_match_all('/data:extend\((((.|\n|\r)*?))\)/', $fileContent, $matches);
        $data = [];
        if (isset($matches[1]) && isset($matches[1][0])) {
            $dataLua = $matches[1][0];
            $dataArrayString = str_replace(array_keys(self::LUA_REPLACER), array_values(self::LUA_REPLACER), $dataLua);
            $dataArrayString = preg_replace('/(([a-zA-Z]|\_)*?) =>/', '"${1}" =>', $dataArrayString);
            eval('$data = '.$dataArrayString.';');
        }
        return $data;
    }
}
