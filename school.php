<?php
require_once __DIR__ . '/php/boot.php';
?>
<?php
$sql = $_COOKIE["request"];
$result = pdo()->prepare($sql);
$result->execute();
$arr = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $arr[] = [
        'title' => $row['short_name'],
        'city' => $row['uni_city'],
        'subtitle' => $row['uni_name'],
        'direction' => $row['direction'],
        'description' => $row['uni_description'],
        'format' => $row['form'],
        'citizen' => $row['url'],
        'latitude' => $row['latitude'],
        'longitude' => $row['longitude'],
        'rang' => $row['uni_level']
    ];
}

$myJSON = json_encode($arr);
?>

<script>
    const myArray = <?php echo $myJSON; ?>;
    localStorage.setItem("result", JSON.stringify(myArray));
    console.log(myArray);
    //Max это код для получения результата, его вставь туда где нужен результат
    result = JSON.parse(localStorage.getItem('result'));
    localStorage.removeItem('result');
</script>

<?php
// setcookie ("request", "", time() - 3600);
?>
