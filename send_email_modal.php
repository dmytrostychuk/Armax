<?php
header('Content-Type: application/json');
$response = array();

try {
    // Логування отриманих даних
    file_put_contents('log.txt', print_r($_POST, true), FILE_APPEND);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        file_put_contents('log.txt', "Received POST request\n", FILE_APPEND);

        // Фільтрація вхідних даних для безпеки
        $contact = filter_var(trim($_POST['contact']), FILTER_SANITIZE_STRING);

        // Перевірка довжини введених даних
        if (strlen($contact) < 6) {
            $response['message'] = "Введене значення повинно містити мінімум 6 символів.";
            echo json_encode($response);
            exit;
        }

        // Надсилання повідомлення на кілька адрес
        $to = 'fenderchord@gmail.com, armax.km@gmail.com';
        $subject = 'Зворотній зв\'язок';
        $message = "Контактна інформація: $contact";
        $headers = 'From: webmaster@example.com' . "\r\n" .
                   'Reply-To: webmaster@example.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        // Відправлення листа
        $mail_sent = mail($to, $subject, $message, $headers);
        file_put_contents('log.txt', "Mail sent: " . ($mail_sent ? 'yes' : 'no') . "\n", FILE_APPEND);

        if ($mail_sent) {
            $response['message'] = "Повідомлення успішно надіслано!";
        } else {
            $response['message'] = "Сталася помилка при відправці повідомлення.";
        }
    } else {
        $response['message'] = "Запит не є POST.";
        file_put_contents('log.txt', "Request is not POST\n", FILE_APPEND);
    }
} catch (Exception $e) {
    file_put_contents('log.txt', "Error: " . $e->getMessage() . "\n", FILE_APPEND);
    $response['message'] = "Сталася помилка: " . $e->getMessage();
}

echo json_encode($response);
?>