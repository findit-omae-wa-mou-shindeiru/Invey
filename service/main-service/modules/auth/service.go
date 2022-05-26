package auth

import (
	"os"

	"github.com/golang-jwt/jwt"
)

// TODO: make return error
func GetJWTUserToken(claim UserClaim) (string, error) {
    signingKey := os.Getenv("SIGN_KEY")

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)
	ss, err := token.SignedString([]byte(signingKey))

    if err != nil {
        return "", err
    }

    return ss, nil
}

func GetUserClaimBasedOnToken(token_input string) (*UserClaim, error) {
    signingKey := os.Getenv("SIGN_KEY")

    token, err := jwt.ParseWithClaims(token_input, &UserClaim{}, func (token *jwt.Token) (interface{}, error) {
        return []byte(signingKey), nil
    })

    if claims, ok := token.Claims.(*UserClaim); ok && token.Valid {
        return claims, nil
    } else {
        return nil, err
    }
}
