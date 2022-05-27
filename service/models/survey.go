package models

import "gorm.io/gorm"

type Survey struct {
  gorm.Model
  ID            uint                `gorm:"primaryKey" json:"id"`
  Title         string              `json:"title" binding:"required"`
  Description   string              `json:"description" binding:"required"`
  QuestionsId   string              `json:"question_id" binding:"required"`
  OwnerId       uint                `json:"owner_id"`
  RewardPoint   int                 `json:"reward_point" binding:"required"`
  MaxAnswer     uint                `json:"max_answer" binding:"required"`
  Category      []SurveyCategory    `gorm:"many2many:survey_category" json:"category" binding:"required"`
  Audience      []SurveyAudience    `gorm:"many2many:survey_audience" json:"audience" binding:"required"`
  Gender        []SurveyGender      `gorm:"many2many:survey_gender" json:"gender" binding:"required"`
}

type SurveyCategory struct {
  gorm.Model
  ID   uint   `gorm:"primaryKey" json:"id"`
  Name string `json:"name" binding:"required"`
}

type SurveyAudience struct {
  gorm.Model
  ID   uint   `gorm:"primaryKey" json:"id"`
  Name string `json:"name" binding:"required"`
}

type SurveyGender struct {
  gorm.Model
  ID   uint   `gorm:"primaryKey" json:"id"`
  Name string `json:"name" binding:"required"`
}

type AnswerNotification struct {
  gorm.Model
  ID            uint   `gorm:"primaryKey" json:"id"`
  Payload       string `json:"payload" binding:"required"`
  FillerId      uint   `json:"filler_id" binding:"required"`
  Filler        User
  SurveyOwnerId uint   `json:"survey_owner_id" binding:"required"`
  SurveyOwner   User
}
