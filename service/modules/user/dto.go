package user

type UserUpdatePayload struct {
  FirstName     *string     `json:"firstname"`
  SecondName    *string     `json:"secondname"`
  Email         *string     `json:"email"`
  Password      *string     `json:"-"`
  Bio           *string     `json:"bio"`
  GenderID      *uint       `json:"gender_id"`
  PositionId    *uint       `json:"position_id"`
  PhotoURL      *string     `json:"photo_url"`
}

type PointPayload struct {
    Point       int    `json:"point" binding:"required"`
}
