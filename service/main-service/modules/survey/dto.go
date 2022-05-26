package survey

type CreateSurveyPayload struct {
  Title         string              `json:"title" binding:"required"`
  Description   string              `json:"description" binding:"required"`
  Category      []uint              `json:"category" binding:"required"`
  Audience      []uint              `json:"audience" binding:"required"`
  Gender        []uint              `json:"gender" binding:"required"`
}
