package auth

import (
	"encoding/base64"
	"fmt"
	"os"
	"question-service/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/argon2"
)

func Login(c *gin.Context) {
    var body_payload LoginPayload

    err := c.ShouldBindJSON(&body_payload)

    if err != nil {
        c.String(400, "Missing payload")
        return
    }

    var user models.User

    models.DB.Where("email = ?", body_payload.Email).First(&user)

    salt := os.Getenv("PASSWORD_SALT");
    hashed_input_password := 
        base64.RawStdEncoding.EncodeToString(
            argon2.IDKey([]byte(body_payload.Password), []byte(salt), 1, 64*1024, 4, 32),
        )

    if hashed_input_password != user.Password {
        fmt.Println("HASH")
        fmt.Println(hashed_input_password)
        fmt.Println("USERPASS")
        fmt.Println(user.Password)
        fmt.Println(user.Email)
        fmt.Println(user.FirstName)
        fmt.Println(user)

        c.String(400, "Invalid Password")
        return
    }

    authToken := GetJWTUserToken(UserClaim {
        ID: user.ID,
        Email: user.Email,
    })

    
    c.JSON(200, AuthToken{
        Token: authToken,
    })
}

func Register(c *gin.Context) {
    var body_payload RegisterPayload
    
    err := c.ShouldBindJSON(&body_payload)

    if err != nil {
        c.String(400, "Missing payload")
        return
    }

    salt := os.Getenv("PASSWORD_SALT");

    hashed_password := argon2.IDKey([]byte(body_payload.Password), []byte(salt), 1, 64*1024, 4, 32)

    user := models.User {
        FirstName: body_payload.FirstName,
        SecondName: body_payload.SecondName,
        Email: body_payload.Email,
        Password: base64.RawStdEncoding.EncodeToString(hashed_password),
    } 

    result := models.DB.Create(&user)

    if result.Error != nil {
        c.String(500, "Error inserting user")
        return
    }

    authToken := GetJWTUserToken(UserClaim {
        ID: user.ID,
        Email: user.Email,
    })

    c.JSON(200, AuthToken{Token: authToken})
}
