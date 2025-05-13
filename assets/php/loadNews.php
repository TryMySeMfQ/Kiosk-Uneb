<?php
$out =array();

foreach(glob('assets/doc/noticias/*.png') as $filename){
    $p = pathinfo($filename);
    $out[]=$p['filename'];
}

$json_data =json_encode($out);
$file_path = 'assets/json';

file_put_contents($file_path,$json_data);

?>