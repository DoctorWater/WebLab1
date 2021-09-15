<?php
session_start();
$time_on = microtime(true);
$actualX = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
$r = floatval(htmlspecialchars($_GET["R"]));
$x = floatval(htmlspecialchars($_GET["X"]));
$y = floatval(htmlspecialchars($_GET["Y"]));

