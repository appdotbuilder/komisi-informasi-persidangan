<?php

use Symfony\Component\Finder\Finder;

arch()->preset()->php()->ignoring(['dd', 'dump']);

arch()->preset()->laravel();
arch()->preset()->relaxed();
arch()->preset()->security()->ignoring(['array_rand', 'parse_str', 'mt_rand', 'uniqid', 'sha1']);

arch('annotations')
    ->expect('App')
    ->toUseStrictEquality()
    ->toHavePropertiesDocumented()
    ->toHaveMethodsDocumented();

arch('test files should be in correct directories')
    ->expect('Tests\Feature')
    ->toBeClasses()
    ->ignoring('Tests\Feature\Auth')
    ->ignoring('Tests\Feature\Settings');

arch('test files should extend TestCase')
    ->expect('Tests\Unit')
    ->toBeClasses()
    ->toExtend('Tests\TestCase');
