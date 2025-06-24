<?php
$servername = "sql113.byethost10.com";
$username = "b10_39138924";
$password = "213659089";
$dbname = "b10_39138924_healthy_food";

$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("שגיאת חיבור: " . $conn->connect_error);
}

// שליפת הנתונים מהטבלה
$sql = "SELECT name, email, dish_name, suggestion, created_at FROM menu_suggestions ORDER BY id DESC";
$result = $conn->query($sql);

// הצגת הטבלה
echo "<meta charset='UTF-8'>";
echo "<table border='1' dir='rtl' style='border-collapse:collapse;width:100%;background:#fff'>";
echo "<tr style='background:#e7f8f2;color:#047857;font-weight:bold'>
        <th>שם</th>
        <th>אימייל</th>
        <th>שם המנה</th>
        <th>הצעה</th>
        <th>תאריך</th>
      </tr>";
while ($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>{$row['name']}</td>
        <td>{$row['email']}</td>
        <td>{$row['dish_name']}</td>
        <td>{$row['suggestion']}</td>
        <td>{$row['created_at']}</td>
    </tr>";
}
echo "</table>";
$conn->close();
?>
