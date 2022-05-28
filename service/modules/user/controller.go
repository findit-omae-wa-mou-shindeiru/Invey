package user

import (
	"encoding/base64"
	"os"
	"question-service/models"
	"question-service/modules/auth"
	"strings"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/argon2"
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
        c.String(401, err_token.Error())
        return
    }

    var user models.User
    
    res := models.DB.Find(&user, user_claim.ID)

    if res.Error != nil {
        c.JSON(500, res.Error.Error())
        return 
    }

    c.JSON(200, user)
}

func UpdateProfile(c *gin.Context) {
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
    
    res := models.DB.Find(&user, user_claim.ID)
    if res.Error != nil {
        c.JSON(500, res.Error.Error())
        return
    }

    var update_payload UserUpdatePayload

    c.ShouldBind(&update_payload)

    if update_payload.Email != nil {
        user.Email = *update_payload.Email
    }
    
    if update_payload.Password != nil {
        salt := os.Getenv("PASSWORD_SALT");
    
        hashed_password := argon2.IDKey([]byte(*update_payload.Password), []byte(salt), 1, 64*1024, 4, 32)
        user.Password = base64.RawStdEncoding.EncodeToString(hashed_password)
    }
    
    if update_payload.FirstName != nil {
        user.FirstName = *update_payload.FirstName
    }
    
    if update_payload.SecondName != nil {
        user.SecondName = *update_payload.SecondName
    }

    if update_payload.Bio != nil {
        user.Bio = *update_payload.Bio
    }

    if update_payload.GenderID != nil {
        user.GenderID = *update_payload.GenderID
    }

    if update_payload.PositionId != nil {
        user.PositionId = *update_payload.PositionId
    }

    if update_payload.PhotoURL != nil {
        user.PhotoURL = *update_payload.PhotoURL
    }

    // WARN: something off about the error, it updates just fine without it
    models.DB.Save(&user)

    c.JSON(200,user)
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

    res := models.DB.Where(&models.Survey{OwnerId:user_claim.ID}).Find(&survey)

    if res.Error != nil {
        c.String(500, res.Error.Error())
        return
    }

    c.JSON(200, survey)
}

func EditRewardPoint(c *gin.Context) {
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

    var payload PointPayload

    err := c.ShouldBindJSON(&payload)

    if err != nil {
        c.String(400, err.Error())
    }

    var user models.User
    
    res := models.DB.Find(&user, user_claim.ID)

    if res.Error != nil {
        c.String(500, res.Error.Error())
        return 
    }

    user.RewardPoint += payload.Point

    models.DB.Save(&user)

    c.JSON(200, user)
}

func CountNotification(c *gin.Context) {
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
        c.String(401, err_token.Error())
        return
    }

    var count int64

    err := models.DB.Model(&models.AnswerNotification{}).
    Where("survey_owner_id = ?", user_claim.ID).
    Count(&count)

    if err.Error != nil {
        c.String(500, err.Error.Error())
    }

    c.JSON(200, gin.H {
        "total": count,
    })
}

func ReadNotification(c *gin.Context) {
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
        c.String(401, err_token.Error())
        return
    }

    var notification []models.AnswerNotification

    res := models.DB.Where(&models.AnswerNotification{SurveyOwnerId:user_claim.ID}).Find(&notification)

    if res.Error != nil {
        c.String(500, res.Error.Error())
    }

    if len(notification) != 0 {
        models.DB.Where(&models.AnswerNotification{SurveyOwnerId:user_claim.ID}).Delete(&models.AnswerNotification{})
    }

    c.JSON(200, notification)
}

func UpgradeStatus(c *gin.Context) {
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
        c.String(401, err_token.Error())
        return
    }

    var user models.User
    
    res := models.DB.Find(&user, user_claim.ID)
    if res.Error != nil {
        c.JSON(500, res.Error.Error())
        return
    }

    if user.RewardPoint < 100 {
        c.String(400, "Not enough reward point")
        return
    }

    user.RewardPoint -= 100
    user.IsPremium = true

    models.DB.Save(&user)

    c.String(200, "Succesfully upgraded")
}
