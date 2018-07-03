const months = {'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December'}

export const getRecommendedAtDate = createdAt => {
  const dateSplit = createdAt.slice(0, 10).split('-');
  const recommendedAt = `${months[dateSplit[1]]} ${dateSplit[2]}, ${dateSplit[0]}`;
  return recommendedAt
}

export const icons = {
  books: {
    name: 'book',
    type: 'font-awesome'
  },
  movies: {
    name: 'movie'
  },
  tvshows: {
    name: 'tv'
  },
  podcasts: {
    name: 'podcast',
    type: 'font-awesome'
  }
}
