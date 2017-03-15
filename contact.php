<?php
/**
 * EDIT THE VALUES BELOW THIS LINE TO ADJUST THE CONFIGURATION
 * EACH OPTION HAS A COMMENT ABOVE IT WITH A DESCRIPTION
 */
/**
 * Specify the email address to which all mail messages are sent.
 * The script will try to use PHP's mail() function,
 * so if it is not properly configured it will fail silently (no error).
 */
$mailTo     = 'dbukatyy@mail.ru';

/**
 * Set the message that will be shown on success
 */
$successMsg = 'Ваше сообщение отправлено, мы скоро Вам перезвоним!';

/**
 * Set the message that will be shown if not all fields are filled
 */
$fillMsg    = 'Заполните, пожалуйста, все поля!';

/**
 * Set the message that will be shown on error
 */
$errorMsg   = 'Хмммм, ошибочка вышла.... Простите!';

/**
 * DO NOT EDIT ANYTHING BELOW THIS LINE, UNLESS YOU'RE SURE WHAT YOU'RE DOING
 */
$title   = 'order';
?>
<?php
if(
    !isset($_POST['name']) ||
    !isset($_POST['phone']) ||
    !isset($_POST['message']) ||
    !isset($_POST['email']) ||
    empty($_POST['name']) ||
	empty($_POST['phone']) ||
    empty($_POST['email']) ||
    empty($_POST['message']) 
) {
  
    echo  $fillMsg;
} else {

    ?>
    <?php
	$msg = "Имя: ".$_POST['name']."\r\n";
	$msg .= "Телефон: ".$_POST['phone']."\r\n";
	$msg .= "Сообщение: ".$_POST['message']."\r\n";
    $msg .= "Email: ".$_POST['email']."\r\n";

    $success = @mail($mailTo, $title, $msg, 'From: ' . $_POST['name'] . '<' . $_POST['email'] . '>');
    if ($success) {
  
        echo  $successMsg;
    } 
		else {
       
            echo  $errorMsg;
    }
}