package survey

import (
	"bytes"
	"context"
	"encoding/json"
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

// TODO: use reward point to create survey
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
        return
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
        return
    }

    if err_audience.Error != nil {
        c.String(400, err_audience.Error.Error()) 
        return
    }

    if err_category.Error != nil {
        c.String(400, err_category.Error.Error()) 
        return
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
        return
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

    var survey models.Survey

    // TODO: Use to get survey reward point then increment user reward point
    models.DB.First(&survey, id)

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

// TODO: update survey
func UpdateSurvey(c *gin.Context) {
    survey_id, err := strconv.ParseUint(c.Param("surveyId"), 10, 64) 

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    var survey models.Survey

    // WARN: something off about the error, it updates just fine without it
    models.DB.First(&survey, survey_id)

    var update_payload SurveyUpdatePayload
    
    c.ShouldBind(&update_payload)
    
    if update_payload.Title != nil {
        survey.Title = *update_payload.Title
    }
    
    if update_payload.Description != nil {
        survey.Description = *update_payload.Description
    }
    
    // WARN: something off about the error, it updates just fine without it
    models.DB.Save(&survey)
    
    if update_payload.AudienceId != nil {
        var audiences []models.SurveyAudience
    
        for _, a := range *update_payload.AudienceId {
            audiences = append(audiences, models.SurveyAudience{ID: a})
        }
    
        models.DB.Model(&survey).Association("Audience").Replace(audiences)
    }
    
    if update_payload.GenderId != nil {
        var gender []models.SurveyGender
    
        for _, a := range *update_payload.GenderId {
            gender = append(gender, models.SurveyGender{ID: a})
        }
    
        models.DB.Model(&survey).Association("Gender").Replace(gender)
    }
    
    if update_payload.CategoryId != nil {
        var category []models.SurveyCategory
    
        for _, a := range *update_payload.CategoryId {
            category = append(category, models.SurveyCategory{ID: a})
        }
    
        models.DB.Model(&survey).Association("Category").Replace(category)
    }
    
    c.JSON(200,survey)
}

func GetAnswerCountBySurveyId(c *gin.Context) {
    survey_id, err := strconv.ParseUint(c.Param("surveyId"), 10, 64) 

    coll := models.MongoClient.Database("invey").Collection("answer")

    filter := bson.D{{"survey_id", survey_id}}

    count, err := coll.CountDocuments(context.TODO(), filter)
    if err != nil {
        c.String(400, err.Error())
    }

    c.JSON(200, bson.M{"count": count})
}

func UpdateQuestion(c *gin.Context) {
    body_byte, _ := ioutil.ReadAll(c.Request.Body)

    c.Request.Body = ioutil.NopCloser(bytes.NewBuffer(body_byte))

    question_id := c.Param("questionId")

    id, err := primitive.ObjectIDFromHex(question_id)

    if err != nil {
        c.String(400, err.Error())
        return
    }

    filter := bson.D{{"_id", id}}

    var jsonData []bson.M  

    if e := json.Unmarshal(body_byte, &jsonData); e != nil {
        c.JSON(400, e.Error())
        return
    }

    collection := models.MongoClient.Database("invey").Collection("question")

    result, err := collection.ReplaceOne(context.TODO(), filter, bson.M{"question":jsonData})

    if err != nil {
        c.JSON(400, err.Error())
        return
    }

    c.JSON(200, result)
}
