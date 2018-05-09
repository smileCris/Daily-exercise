<?php 
header("Content-type: text/html;  charset=UTF-8");
header("Access-Control-Allow-Origin:*.93html.com,*.wp.dev");
$username= $_POST["username"];
$pwd=$_POST["pwd"];
echo "用户名是:".$username."  密码是：".$pwd;

?>