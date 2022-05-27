package user

type UserUpdatePayload struct {
  FirstName     *string  `json:"firstname"`
  SecondName    *string  `json:"secondname"`
  Email         *string  `json:"email"`
  Password      *string  `json:"-"`
}
