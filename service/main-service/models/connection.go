package models

import (
	"context"
	"errors"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *gorm.DB
var MongoClient *mongo.Client

func connectGormDB() {
    env_err := godotenv.Load()

	if env_err != nil {
        panic(env_err) 
    }

    db_string := os.Getenv("DB_STRING")

    db, err := gorm.Open(mysql.Open(db_string), &gorm.Config{})
    if err != nil {
        panic("Failed to connect to database!")
    }

    DB = db
    DB.AutoMigrate(&User{})
    DB.AutoMigrate(&Survey{})

    if err = DB.AutoMigrate(&SurveyGender{}) ; err == nil && DB.Migrator().HasTable(&SurveyGender{}) {
        if err := DB.First(&SurveyGender{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
            DB.Create([]SurveyGender{
                {Name: "Male"},
                {Name: "Female"},
            })
        }
    }

    if err = DB.AutoMigrate(&SurveyAudience{}) ; err == nil && DB.Migrator().HasTable(&SurveyAudience{}) {
        if err := DB.First(&SurveyAudience{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
            DB.Create([]SurveyAudience{
                {Name: "Student"},
                {Name: "Worker"},
            })
        }
    }

    if err = DB.AutoMigrate(&SurveyCategory{}); err == nil && DB.Migrator().HasTable(&SurveyCategory{}) {
        if err := DB.First(&SurveyCategory{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
            DB.Create([]SurveyCategory{
                {Name: "Category 1"},
                {Name: "Category 2"},
                {Name: "Category 3"},
            })
        }
    }
}

func connectMongoDB() {
    uri := os.Getenv("MONGODB_URI")

	if uri == "" {
        panic("No mongodb uri")
	}

    client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}

	// defer func() {
	// 	if err := client.Disconnect(context.TODO()); err != nil {
	// 		panic(err)
	// 	}
	// }()

	// coll := client.Database("sample_mflix").Collection("movies")
	// title := "Back to the Future"
	// var result bson.M
	// err = coll.FindOne(context.TODO(), bson.D{{"title", title}}).Decode(&result)
	// if err == mongo.ErrNoDocuments {
	// 	fmt.Printf("No document was found with the title %s\n", title)
	// 	return
	// }
	// if err != nil {
	// 	panic(err)
	// }
	// jsonData, err := json.MarshalIndent(result, "", "    ")
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Printf("%s\n", jsonData)  

    MongoClient = client
}

func ConnectDatabase() {
    connectGormDB()
    connectMongoDB()
}
