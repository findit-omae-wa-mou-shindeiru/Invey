package survey

import (
	"bytes"
	"context"
	"io/ioutil"
	"question-service/models"
	"question-service/modules/auth"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/thoas/go-funk"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateSurvey(c *gin.Context) {
    body_byte, _ := ioutil.ReadAll(c.Request.Body)

    c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(body_byte))
    
    var payload CreateSurveyPayload

    if err := c.ShouldBindBodyWith(&payload, binding.JSON); err != nil {
        c.String(400, "Bad payload")
        return
    }

    categories := 
        funk.Map(payload.Category, func(id uint) models.SurveyCategory {
            return models.SurveyCategory{
                ID: id,
            }
        }).([]models.SurveyCategory)

    audience := 
        funk.Map(payload.Audience, func(id uint) models.SurveyAudience {
            return models.SurveyAudience{
                ID: id,
            }
        }).([]models.SurveyAudience)

    gender := 
        funk.Map(payload.Gender, func(id uint) models.SurveyGender {
            return models.SurveyGender{
                ID: id,
            }
        }).([]models.SurveyGender)

    question_id, err := CreateQuestion(body_byte)

    if err != nil {
        c.String(400, err.Error())
        return
    }

    authorization_header := c.Request.Header["Authorization"]

    if len(authorization_header) == 0  {
        c.String(401, "Unauthorized")
        return
    }

    bearer_token := strings.Split(authorization_header[0], " ")

    if len(bearer_token) != 2 {
        c.String(401, "Missing Token")
    }

    token := bearer_token[1]

    user_claim, err_token := auth.GetUserClaimBasedOnToken(token)

    if err_token != nil {
        c.String(400, err_token.Error())
        return
    }

    survey := models.Survey {
        Title: payload.Title,
        Description: payload.Description,
        QuestionsId: question_id,
        Category: categories, 
        Audience: audience,
        Gender: gender,
        OwnerId: user_claim.ID,
    }

    result := models.DB.Create(&survey)

    if result.Error != nil {
        c.String(500, "Error inserting survey")
        return
    }

    c.JSON(200, survey)
}

func GetFilters(c *gin.Context) {
    var gender []models.SurveyGender
    var audience []models.SurveyAudience
    var category []models.SurveyCategory

    err_gender := models.DB.Find(&gender)
    err_audience := models.DB.Find(&audience)
    err_category := models.DB.Find(&category)

    if err_gender.Error != nil {
        c.String(400, err_gender.Error.Error()) 
    }

    if err_audience.Error != nil {
        c.String(400, err_audience.Error.Error()) 
    }

    if err_category.Error != nil {
        c.String(400, err_category.Error.Error()) 
    }

    c.JSON(200, gin.H {
        "gender": gender,
        "audience": audience,
        "category": category,
    })
}

func GetSurveys(c *gin.Context) {
    var filter SurveyFilter

    err := c.ShouldBindJSON(&filter)

    if err != nil {
        c.String(400, "Missing payload")
        return
    }

    var survey []models.Survey

    res := models.DB.Preload("Category")

    if len(filter.CategoryId) != 0 {
        res = res.Where("surveys.id IN (SELECT survey_id FROM survey_category WHERE survey_category_id IN ?)", filter.CategoryId)
    }

    res = res.Preload("Audience")
    if len(filter.AudienceId) != 0 {
        res = res.Where("surveys.id IN (SELECT survey_id FROM survey_audience WHERE survey_audience_id IN ?)", filter.AudienceId)
    }
        
    res = res.Preload("Gender")
    if len(filter.GenderId) != 0 {
        res = res.Where("surveys.id IN (SELECT survey_id FROM survey_gender WHERE survey_gender_id IN ?)", filter.GenderId)
    }
        
    res = res.Find(&survey)

    if res.Error != nil {
        c.JSON(500, res.Error.Error())
    }

    c.JSON(200, survey)
}

func GetSurveyById(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 64) 

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    var survey models.Survey

    models.DB.
    Preload("Category").
    Preload("Audience").
    Preload("Gender").
    First(&survey, id)
    
    c.JSON(200, survey)
}


func GetSurveyQuestionBySurveyId(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 64) 

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    var survey models.Survey

    models.DB.First(&survey, id)

	coll := models.MongoClient.Database("invey").Collection("question")

	var result bson.M

    objectId, err := primitive.ObjectIDFromHex(survey.QuestionsId)

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    err = coll.FindOne(context.TODO(), bson.M{"_id": objectId}).Decode(&result)

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    c.JSON(200, result)
}

func CreateAnswerToSurvey(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("surveyId"), 10, 64) 
    body_byte, _ := ioutil.ReadAll(c.Request.Body)

    if err != nil {
        c.String(400, err.Error())
        return
    }

    _, err = CreateAnswer(id, body_byte)

    if err != nil {
        c.String(400, err.Error())
        return
    }

    c.String(200, "Successfully created answer")
}


func GetSurveyAnswerBySurveyId(c *gin.Context) {
    survey_id, err := strconv.ParseUint(c.Param("surveyId"), 10, 64) 

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

	coll := models.MongoClient.Database("invey").Collection("answer")

    cursor, err := coll.Find(context.TODO(), bson.D{{"survey_id", bson.D{ { "$eq", survey_id} }}})
    
    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    var result []bson.M

    err = cursor.All(context.TODO(), &result)

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    c.JSON(200, result)
}
