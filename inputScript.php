<?php
session_start();
$time_on = microtime(true);
$r = "";
$x = "";
$y = "";
if ((isset($_GET["x"]) && is_numeric($_GET["x"])) && (isset($_GET["y"]) && is_numeric($_GET["y"])) && (isset($_GET["r"]) && is_numeric($_GET["r"]))) {
    {
        $x = $_GET["x"];
        $y = $_GET["y"];
        $r = $_GET["r"];
        date_default_timezone_set("Europe/Moscow");
        $_SESSION["time"] = date("H:i:s");
        function Geron($Ax, $Ay, $Bx, $By, $Cx, $Cy)
        {
            return abs($Bx * $Cy - $Cx * $By - $Ax * $Cy + $Cx * $Ay + $Ax * $By - $Bx * $Ay);
        }
        $s = Geron($x, $y, 0, 0, $r / 2, 0) + Geron($x, $y, $r / 2, 0, 0, (-1) * $r) + Geron($x, $y, 0, (-1) * $r, 0, 0);;
        if ((($y >= $r * (-1)) && ($x >= $r * (-1))) && (($y <= 0) && ($x <= 0)))
            $ans = "Входит";
        elseif (($x <= $r / 2) && ($y <= 0) && abs(Geron(0, 0, $r / 2, 0, 0, (-1) * $r) - $s) <= 0.01)
            $ans = true;
        elseif ($x >= 0 && $y <= 0 && abs($x) <= $r && abs($y) <= $r / 2)
            $ans = "Входит";
        else
            $ans = "Не входит";
        $time = number_format(microtime(true) - $time_on, 10, ".", "") * 1000 . 'ms';
        $result = array($x, $y, $r, $ans, $time, $_SESSION["time"]);
        if (!isset($_SESSION['results'])) {
            $_SESSION['results'] = array();
        }
        array_push($_SESSION['results'], $result);
        print_r('<tr><td>' . $x . '</td><td>' . $y . '</td><td>' . $r . '</td><td>' . $ans . '</td><td>' . $time . '</td><td>' . $_SESSION["time"] . '</td></tr>');
    }
} else{
    echo "Некорректные данные";
    http_response_code(400);
}




