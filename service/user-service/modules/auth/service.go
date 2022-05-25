package auth

import (
	"fmt"
	"os"

	"github.com/golang-jwt/jwt"
)

func GetJWTUserToken(claim UserClaim) string {
    signingKey := os.Getenv("SIGN_KEY")

    fmt.Println(signingKey)

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	ss, err := token.SignedString([]byte(signingKey))

    if err != nil {
        return err.Error()
    }

    return ss
}

// func GetUserClaimBasedOnToken(token string) UserClaim {
    // signingKey := os.Getenv("SIGN_KEY")

    // token, err := jwt.ParseWithClaims(token, &UserClaim{}, func (token *jwt.Token) (interface{}, error) {
    //     return []byte(signingKey), nil
    // })
    //
    // if claims, ok := token.Claims.(*MyCustomClaims); ok && token.Valid {
    //     return claims
    // } else {
    //
    // }
// }
