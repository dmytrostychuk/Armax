<?php
header('Content-Type: application/json');
$response = array();

try {
    // Логування отриманих даних
    file_put_contents('log.txt', print_r($_POST, true), FILE_APPEND);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        file_put_contents('log.txt', "Received POST request\n", FILE_APPEND);

        $contact = trim($_POST['contact']);

        if (strlen($contact) < 6) {
            $response['message'] = "Введене значення повинно містити мінімум 6 символів.";
            echo json_encode($response);
            exit;
        }

        $to1 = 'fenderchord@gmail.com';
        $to2 = 'fenderchord@gmail.com';
        $subject = 'Зворотній зв\'язок';
        $message = "Контактна інформація: $contact";
        $headers = 'From: webmaster@example.com' . "\r\n" .
                   'Reply-To: webmaster@example.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        // Відправлення першого листа
        $mail1_sent = mail($to1, $subject, $message, $headers);
        file_put_contents('log.txt', "Mail 1 sent: " . ($mail1_sent ? 'yes' : 'no') . "\n", FILE_APPEND);

        // Відправлення другого листа
        $mail2_sent = mail($to2, $subject, $message, $headers);
        file_put_contents('log.txt', "Mail 2 sent: " . ($mail2_sent ? 'yes' : 'no') . "\n", FILE_APPEND);

        if ($mail1_sent && $mail2_sent) {
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
