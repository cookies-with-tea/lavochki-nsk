package district

import "benches/internal/domain"

type DistrictOutput struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

func OutputFromDomains(domains []*domain.District) []DistrictOutput {
	output := make([]DistrictOutput, len(domains))

	for index, element := range domains {
		output[index] = DistrictOutput{
			ID:    element.ID,
			Title: element.Title,
		}
	}

	return output
}
