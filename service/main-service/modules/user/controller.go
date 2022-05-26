package user

import (
	"fmt"
	"question-service/models"
	"question-service/modules/auth"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetProfile(c *gin.Context) {
    authorization_header := c.Request.Header["Authorization"]

    if len(authorization_header) == 0  {
        c.String(401, "Unauthorized")
        return
    }

    bearer_token := strings.Split(authorization_header[0], " ")

    if len(bearer_token) != 2 {
        c.String(401, "Missing Token")
        return
    }

    token := bearer_token[1]

    user_claim, err_token := auth.GetUserClaimBasedOnToken(token)

    if err_token != nil {
        c.String(402, err_token.Error())
        return
    }

    var user models.User
    
    models.DB.Find(&user, user_claim.ID)

    c.JSON(200, user)
}

func GetSurveys(c *gin.Context) {
    authorization_header := c.Request.Header["Authorization"]

    if len(authorization_header) == 0  {
        c.String(401, "Unauthorized")
        return
    }

    bearer_token := strings.Split(authorization_header[0], " ")

    if len(bearer_token) != 2 {
        c.String(401, "Missing Token")
        return
    }

    token := bearer_token[1]

    user_claim, err_token := auth.GetUserClaimBasedOnToken(token)

    if err_token != nil {
        c.String(402, err_token.Error())
        return
    }

    var survey []models.Survey

    fmt.Println(user_claim.ID)

    res := models.DB.Debug().Where(&models.Survey{OwnerId:user_claim.ID}).Find(&survey)

    if res.Error != nil {
        c.String(500, res.Error.Error())
        return
    }

    c.JSON(200, survey)
}
