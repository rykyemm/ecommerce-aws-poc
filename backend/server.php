<?php
/**
 * Router for PHP built-in server
 */

// This is a simple router for the PHP built-in server
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// If the file exists, serve it directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Otherwise, include the index.php file
include_once __DIR__ . '/index.php'; 