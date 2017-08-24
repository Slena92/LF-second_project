<?php
    
    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $corpus = $_POST['corpus'];
    $flat = $_POST['flat'];
    $floor = $_POST['floor'];
    $comments = $_POST['comments'];
    $payment = $_POST['payment'];

    $call = $_POST['call'];
    $call = isset($call) ? 'НЕТ' : 'ДА';
    
    $mail_message = 'привет';

    $headers = "From: Администратор сайта <leno4ka129327@gmail.com>\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";
    
    $mail = mail('leno4ka129327@gmail.com', 'Заказ', $mail_message, $headers);

    if ($mail) {
        echo 'done';
    } else {
        echo 'error';
    };
?>