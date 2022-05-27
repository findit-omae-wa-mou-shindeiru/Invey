package main

import (
	"fmt"
	"os"
	"question-service/middlewares"
	"question-service/models"
	"question-service/modules/auth"
	"question-service/modules/survey"
	"question-service/modules/user"

	"github.com/gin-gonic/gin"
)


func main() {
    models.ConnectDatabase();

    r := gin.Default()

    r.Use(middlewares.CORSMiddleware())

    r.POST("/auth/login", auth.Login)
    r.POST("/auth/register", auth.Register)
    r.GET("/survey-filters", survey.GetFilters)
    r.POST("/survey", survey.CreateSurvey)
    r.PUT("/survey/:surveyId", survey.UpdateSurvey)
    r.POST("/survey-answer/:surveyId", survey.CreateAnswerToSurvey)
    r.GET("/survey-answer/:surveyId", survey.GetSurveyAnswerBySurveyId)
    r.GET("/survey-answer-count/:surveyId", survey.GetAnswerCountBySurveyId)
    r.POST("/survey/filters", survey.GetSurveys)
    r.GET("/survey-question/:id", survey.GetSurveyQuestionBySurveyId)
    r.PUT("/survey-question/:questionId", survey.UpdateQuestion)
    r.GET("/survey/:id", survey.GetSurveyById)
    r.GET("/user/profile", user.GetProfile)
    r.PUT("/user/profile", user.UpdateProfile)
    r.GET("/user/surveys", user.GetSurveys)

    port := os.Getenv("PORT")

    fmt.Println("Running server on 3000")
    r.Run(":" + port)
}
