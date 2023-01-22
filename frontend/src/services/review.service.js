import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'


export const reviewService = {
  add,
  query,
  remove
}
_createReviews()

function query(filterBy) {
  // &sort=anaAref
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.stayId}`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId, rate }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    rate,
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

function _createReviews() {
  let reviews = storageService.loadFromStorage('review')
  if (!reviews) {
    reviews = [
      {
        "id": utilService.makeId(),
        "txt": "Very helpful hosts. Cooked traditional...",
        "rate": 4.7,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "../user-img/baby.jpg"
        }
      },
      {
        "id": utilService.makeId(),
        "txt": "Such a beautiful place",
        "rate": 4.9,
        "by": {
          "_id": "u102",
          "fullname": "user2",
          "imgUrl": "../user-img/baby.jpg"
        }
      },
    ]
    storageService.saveToStorage('review', reviews)
    return reviews
  }
} 