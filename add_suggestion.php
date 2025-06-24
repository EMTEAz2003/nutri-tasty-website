<?php
// פרטי חיבור למסד
$servername = "sql113.byethost10.com";
$username = "b10_39138924";
$password = "213659089";
$dbname = "b10_39138924_healthy_food";

// יצירת חיבור
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("שגיאה בחיבור: " . $conn->connect_error);
}

// קבלת נתוני הטופס
$name = $_POST['name'];
$email = $_POST['email'];
$dish_name = $_POST['dish_name'];
$suggestion = $_POST['suggestion'];
$created_at = date("Y-m-d");

// הכנה והכנסת הנתונים
$sql = "INSERT INTO menu_suggestions (name, email, dish_name, suggestion, created_at)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $name, $email, $dish_name, $suggestion, $created_at);

if ($stmt->execute()) {
    echo "<meta charset='UTF-8'>";
    echo "<h2 style='color:#047857'>ההצעה נוספה בהצלחה!</h2>";
    echo "<a href='suggestions.html'>חזרה לטופס הצעות</a>";
} else {
    echo "<meta charset='UTF-8'>";
    echo "<h2 style='color:red'>שגיאה: {$stmt->error}</h2>";
    echo "<a href='suggestions.html'>נסה שוב</a>";
}
$stmt->close();
$conn->close();
?>
