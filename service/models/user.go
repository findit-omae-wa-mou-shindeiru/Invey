package models

import "gorm.io/gorm"

//TODO: add user status
type User struct {
  gorm.Model
  ID            uint           `gorm:"primaryKey" json:"id"`
  FirstName     string         `json:"firstname" binding:"required"`
  SecondName    string         `json:"secondname" binding:"required"`
  Email         string         `json:"email" binding:"required"`
  Password      string         `json:"-" binding:"required"`
  RewardPoint   int            `json:"reward_point" binding:"required"`
  Bio           string         `json:"bio" binding:"required"`
  GenderID      uint
  Gender        SurveyGender   `json:"gender" binding:"required"`
  PositionId    uint
  Position      SurveyAudience `json:"position" binding:"required"`
  Surveys       []Survey       `gorm:"foreignKey:OwnerId;"  json:"surveys"`
  PhotoURL      string         `json:"photo_url" binding:"required"`
}
