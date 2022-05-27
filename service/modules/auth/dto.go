package auth

import "github.com/golang-jwt/jwt"

type AuthToken struct {
    Token string `json:"token"`
}

type LoginPayload struct {
    Email string `json:"email"`
    Password string `json:"password"`
}

type RegisterPayload struct {
    FirstName string `json:"firstname" binding:"required"`
    SecondName string `json:"secondname" binding:"required"`
    Email string `json:"email" binding:"required"`
    Password string `json:"password" binding:"required"`
}

type UserClaim struct {
    ID uint `json:"id"`
    Email string `json:"email"`
    jwt.StandardClaims
}
