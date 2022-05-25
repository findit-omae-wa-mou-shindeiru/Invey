package questionservice

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
	"gorm.io/driver/mysql"
)

func main() {
    env_err := godotenv.Load()
	if env_err != nil {
        panic(env_err) 
    }
	
    db_string := os.Getenv("DB_STRING")

    r := gin.Default()
    _, err := gorm.Open(mysql.Open(db_string), &gorm.Config{})
	
    if err != nil {
        panic(err)
    }
	//
	// r.POST("/robot", robot.CreateRobot);
	// r.GET("/robot", robot.GetAllRobots);
	//     r.POST("/hmi-data", hmiData.CreateData);
	//     r.GET("/hmi-data/:username", hmiData.GetByUsername);
    r.Run(":3000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
