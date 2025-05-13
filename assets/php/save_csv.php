<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csvData = $_POST['csvData'];
    $filePath = 'assets/doc/horarios/tempHorario.csv';

    if (file_put_contents($filePath, $csvData) !== false) {
        echo 'CSV file saved successfully';
    } else {
        echo 'Error saving CSV file';
    }
} else {
    echo 'Invalid request method';
}
?>
