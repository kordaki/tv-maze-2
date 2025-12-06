export class VideoListModel {
  static create(data: any): VideoListModel { // TODO: define data type
    if (!data) return {};

    const newVideoList = data.reduce((obj: any, dataItem: any) => {
      const id = dataItem._embedded.show.id;
      obj[id] = {
        id: dataItem._embedded.show.id,
        name: dataItem._embedded.show.name,
        genres: dataItem._embedded.show.genres,
        language: dataItem._embedded.show.language,
        image: dataItem._embedded.show.image,
        summary: dataItem._embedded.show.summary,
        type: dataItem._embedded.show.type,
        rating: dataItem._embedded.show.rating,
        status: dataItem._embedded.show.status,
      };
      return obj;
    }, {});
    return newVideoList;
  }
}
