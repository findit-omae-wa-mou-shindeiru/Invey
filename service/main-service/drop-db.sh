( mysqldump --add-drop-table --no-data -u root -p invey | grep 'DROP TABLE' ) > ./drop_all_tables.sql
sed -i '1iSET FOREIGN_KEY_CHECKS = 0;' ./drop_all_tables.sql
echo "SET FOREIGN_KEY_CHECKS = 1;" >>  ./drop_all_tables.sql
mysql -u root -p invey < ./drop_all_tables.sql
rimraf ./drop_all_tables.sql
