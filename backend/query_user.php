<?php
$db = new PDO('sqlite:database/database.sqlite');
$result = $db->query('SELECT id, matricule, email, role FROM utilisateur WHERE id=2');
$user = $result->fetch(PDO::FETCH_ASSOC);
echo json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
