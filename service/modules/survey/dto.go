package survey

type CreateSurveyPayload struct {
  Title         string              `json:"title" binding:"required"`
  Description   string              `json:"description" binding:"required"`
  RewardPoint   int                 `json:"reward_point" binding:"required"`
  MaxAnswer     uint                `json:"max_answer" binding:"required"`
  Category      []uint              `json:"category" binding:"required"`
  Audience      []uint              `json:"audience" binding:"required"`
  Gender        []uint              `json:"gender" binding:"required"`
}

type SurveyFilter struct {
  CategoryId                []uint              `json:"category_id" binding:"required"`
  AudienceId                []uint              `json:"audience_id" binding:"required"`
  GenderId                  []uint              `json:"gender_id" binding:"required"`
  LowerBoundRewardPoint     *uint                `json:"lower_bound_reward_point"`
  HigherBoundRewardPoint    *uint                `json:"higher_bound_reward_point"`
}

type SurveyUpdatePayload struct {
  Title           *string              `json:"title"`
  Description     *string              `json:"description"`
  CategoryId      *[]uint              `json:"category"`
  AudienceId      *[]uint              `json:"audience"`
  GenderId        *[]uint              `json:"gender"`
}
