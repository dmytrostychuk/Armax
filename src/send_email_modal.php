<?php
file_put_contents('log.txt', print_r($_POST, true), FILE_APPEND);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contact = trim($_POST['contact']);

    if (strlen($contact) < 6) {
        echo "Введене значення повинно містити мінімум 6 символів.";
        exit;
    }

    $to1 = 'first_email@example.com';
    $to2 = 'second_email@example.com';
    $subject = 'Зворотній зв\'язок';
    $message = "Контактна інформація: $contact";
    $headers = 'From: webmaster@example.com' . "\r\n" .
               'Reply-To: webmaster@example.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to1, $subject, $message, $headers) && mail($to2, $subject, $message, $headers)) {
        echo "Повідомлення успішно надіслано!";
    } else {
        echo "Сталася помилка при відправці повідомлення.";
    }
} else {
    echo "Запит не є POST.";
}
?>
