<?php

require_once __DIR__.'/boot.php';

$stmt = pdo()->prepare("SELECT * FROM `partners` WHERE `partner_email` = :partner_email");
$stmt->execute(['partner_email' => $_POST['partner_email']]);
if ($stmt->rowCount() > 0) {
    flash('Эта почта уже занята.');
    header('Location: /');
    die;
}

$stmt = pdo()->prepare("INSERT INTO `partners` (`partner_name`, `partner_email`) VALUES (:partner_name, :partner_email)");
$stmt->execute([
    'partner_name' => $_POST['partner_name'],
    'partner_email' => $_POST['partner_email'],
]);

header('Location: ../index.html');
