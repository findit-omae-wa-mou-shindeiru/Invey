package main

import (
	"fmt"
	"question-service/models"
	"question-service/modules/auth"
	"question-service/modules/survey"

	"github.com/gin-gonic/gin"
)

func main() {
    models.ConnectDatabase();

    r := gin.Default()

    r.POST("/auth/login", auth.Login)
    r.POST("/auth/register", auth.Register)
    r.GET("/survey-filters", survey.GetFilters)
    r.POST("/survey", survey.CreateSurvey)
    r.POST("/survey/filters", survey.GetSurveys)
	
    fmt.Println("Running server on 3000")
    r.Run(":3000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
