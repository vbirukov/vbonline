<?
{ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'vbirukov@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Сообщение с vbonline'; //Заголовок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['contact'].' '.$_POST['surname'].'</p>
                        <p>Сообщение: '.$_POST['msgtxt'].'</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: астрология онлайн\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>
