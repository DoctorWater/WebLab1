<?php
session_start();
$time_on = microtime(true);
$r = floatval(htmlspecialchars($_GET["R"]));
$x = floatval(htmlspecialchars($_GET["X"]));
$y = floatval(htmlspecialchars($_GET["Y"]));

function Geron($Ax, $Ay, $Bx, $By, $Cx, $Cy){
    return abs($Bx*$Cy-$Cx*$By-$Ax*$Cy+$Cx*$Ay+$Ax*$By-$Bx*$Ay);
}
$s=Geron($x,$y,0,0,$r/2,0)+Geron($x,$y,$r/2,0,0,(-1)*$r)+Geron($x,$y,0,(-1)*$r,0,0,);

;
if ((($y>=$r*(-1)) && ($x>=$r*(-1))) && (($y<=0) && ($x<=0)))
    $ans=true;
elseif (($x<=$r/2) && ($y<=0) && abs(Geron(0,0,$r/2,0,0,(-1)*$r)-$s)<=0.01)
    $ans=true;
    elseif ($x >= 0 && $y <= 0 && abs($x) <= $r && abs($y) <= $r/2)
        $ans = true;
    else
        $ans = false;


