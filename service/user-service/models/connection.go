package models

import (
	"os"

	"gorm.io/gorm"
	"gorm.io/driver/mysql"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func ConnectDatabase() {
    env_err := godotenv.Load()

	if env_err != nil {
        panic(env_err) 
    }

    db_string := os.Getenv("DB_STRING")
    db, err := gorm.Open(mysql.Open(db_string), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database!")
    }

    DB = db

    DB.AutoMigrate(&User{})
}
