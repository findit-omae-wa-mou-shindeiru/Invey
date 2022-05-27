package models

import "gorm.io/gorm"

// TODO: add reward point
type User struct {
  gorm.Model
  ID            uint    `gorm:"primaryKey" json:"id"`
  FirstName     string  `json:"firstname" binding:"required"`
  SecondName    string  `json:"secondname" binding:"required"`
  Email         string  `json:"email" binding:"required"`
  Password      string  `json:"-" binding:"required"`
  Surveys       []Survey `gorm:"foreignKey:OwnerId;"  json:"surveys"`
}
