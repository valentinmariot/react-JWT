<?php

class CookieHelper
{
    public static function setCookie(string $token, string $username): void
    {
        setcookie('hetic_token', $token, time() + (3600 * 24 * 365), '/', 'localhost', false, false);
        setcookie('hetic_username', $username, time() + (3600 * 24 * 365), '/', 'localhost', false, false);
    }
}
