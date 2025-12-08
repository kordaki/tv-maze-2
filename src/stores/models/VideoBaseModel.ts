export class BaseModel {
  static getRating = (rating: { average: number } | null) => {
    if (!rating || !rating.average) {
      return null
    }
    return rating.average
  }
}
