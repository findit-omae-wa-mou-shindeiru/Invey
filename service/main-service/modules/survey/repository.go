package survey

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"question-service/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateQuestion(body []byte) (string, error) {
        var jsonData bson.M  

        if e := json.Unmarshal(body, &jsonData); e != nil {
            fmt.Println("Json unmarshall not succeed")
            return "", e
        }

        c_question := models.MongoClient.Database("invey").Collection("question")

        result, err := c_question.InsertOne(context.TODO(), jsonData)

        if jsonData["question"] == nil {
            return "", errors.New("No question in payload") 
        }

        if err != nil {
            return "", err
        }

        var id string

        if oid, ok := result.InsertedID.(primitive.ObjectID); ok {
            id = oid.Hex()
        } else {
            return "", errors.New("Doesn't return id")
        }

        return id, nil
}
