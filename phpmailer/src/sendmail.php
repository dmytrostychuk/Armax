<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom('armax.km@gmail.com', 'Хелоу еврібаді');
// Кому відправити
$mail->addAddress('armax.km@gmail.com');
// Тема письма
$mail->Subject = 'Заповнення форми через сайт';

// Тіло письма
$body = '<h1>Нове повідомлення!</h1>';

if (!empty($_POST['name'])) {
    $body .= '<p><strong>Ім`я:</strong> ' . $_POST['name'] . '</p>';
}
if (!empty($_POST['tel'])) {
    $body .= '<p><strong>Телефон:</strong> ' . $_POST['tel'] . '</p>';
}
if (!empty($_POST['email'])) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (!empty($_POST['message'])) {
    $body .= '<p><strong>Повідомлення:</strong> ' . $_POST['message'] . '</p>';
}

	//Прикрепить файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//путь загрузки файла
		$filePath = __DIR__ . "/files/" . $_FILES['image']['name']; 
		//грузим файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото в приложении</strong>';
			$mail->addAttachment($fileAttach);
		}
	}

$mail->Body = $body;

// Відправлення
if (!$mail->send()) {
    $message = 'Помилка';
} else {
    $message = 'Дані надіслано!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
