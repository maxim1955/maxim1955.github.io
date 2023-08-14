<?php

require_once __DIR__ . '/boot.php';

// $stmt = pdo()->prepare("SELECT * FROM `partners` WHERE `partner_email` = :partner_email");
// $stmt->execute(['partner_email' => $_POST['partner_email']]);
// if ($stmt->rowCount() > 0) {
//     flash('Эта почта уже занята.');
//     header('Location: /');
//     die;
// }

// $photo = $_POST['photo'];
// $path = 'upload/'; // директория для загрузки
// $ext = array_pop(explode('.', $_FILES['photo']['name'])); // расширение
// $new_name = time() . '.' . $ext; // новое имя с расширением
// $full_path = $path . $new_name; // полный путь с новым именем и расширением
$uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/photos/';
$pathInfo = pathinfo($_FILES['photo']['name']);
$ext = $pathInfo['extension' ] ?? "";
$path = 'photos/';
$newFilename = time() . "." . $ext;
$full_path = $path . $newFilename;

if(!move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $newFilename))
    $full_path = "";

$stmt = pdo()->prepare("INSERT INTO `partners` (`partner_name`, `partner_org`, `partner_email`, `partner_phone`, `expo_description`, `photo`) 
        VALUES (:partner_name, :partner_org, :partner_email, :partner_phone, :expo_description, :photo)");
$stmt->execute([
    'partner_name' => $_POST['partner_name'],
    'partner_org' => $_POST['partner_org'],
    'partner_email' => $_POST['partner_email'],
    'partner_phone' => $_POST['partner_phone'],
    'expo_description' => $_POST['expo_description'],
    'photo' => $full_path,
]);



header('Location: ../thanks/thanks.html');