<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $contact = trim($_POST['contact']);

    // Валідація контактних даних
    if (empty($contact) || strlen($contact) < 6) {
        echo 'Недійсний номер телефону або електронна адреса.';
        exit;
    }

    // Змінні для листа
    $to = 'fenderchord@gmail.com, armax.km@gmail.com'; // Два отримувачі через кому
    $subject = 'Новий запит від користувача';
    $message = "Контактна інформація: $contact";
    $headers = "From: no-reply@domain.com\r\n";

    // Відправка листа
    if (mail($to, $subject, $message, $headers)) {
        echo 'Лист успішно відправлено!';
    } else {
        echo 'Помилка при відправці листа.';
    }
} else {
    echo 'Неправильний метод запиту.';
}
?>
