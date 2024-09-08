type Suggestions = {
    name: string,
    destination_description: string,
    accessibility: string
}

type TravelInfo = {
    start_date: string,
    end_date: string,
    budget: string,
    city: string,
    state: string,
    country: string,
    destination_suggestions: Suggestions[]
}