<?php
$db = new PDO('sqlite:database/database.sqlite');

// Query 1: First 10 users
echo "=== First 10 Users ===\n";
$result = $db->query('SELECT id, matricule, nom, prenom, role FROM utilisateur LIMIT 10;');
$rows = $result->fetchAll(PDO::FETCH_ASSOC);
foreach ($rows as $row) {
    echo json_encode($row) . PHP_EOL;
}

// Query 2: Total count of users
echo "\n=== Total Users Count ===\n";
$result = $db->query('SELECT COUNT(*) as total_users FROM utilisateur;');
$total = $result->fetch(PDO::FETCH_ASSOC);
echo json_encode($total) . PHP_EOL;

// Query 3: Count of admin users
echo "\n=== Admin Users Count ===\n";
$result = $db->query("SELECT COUNT(*) as admin_count FROM utilisateur WHERE role='admin';");
$admin = $result->fetch(PDO::FETCH_ASSOC);
echo json_encode($admin) . PHP_EOL;
?>
