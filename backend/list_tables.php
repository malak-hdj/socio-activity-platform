<?php
$db = new PDO("sqlite:database/database.sqlite");
$tables = $db->query("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
echo "========== TABLES CRÉÉES ==========\n";
foreach ($tables as $table) {
    echo $table['name'] . "\n";
}
echo "===================================\n";
echo "Total: " . count($tables) . " tables\n";
