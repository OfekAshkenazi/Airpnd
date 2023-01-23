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
        "_id": utilService.makeId(),
        "txt": "Very helpful hosts. Cooked traditional... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, magni? Fugiat, in odit quia quae obcaecati natus deserunt veritatis, quasi similique sed voluptas repudiandae nisi. Officia nemo quidem iure totam!",
        "rate": 4.7,
        "by": {
          "_id": "u102",
          "fullname": "natali23",
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4NjIbgcUNdTJTH82D5eGI0pOJ4g06db-g1w&usqp=CAU"
        },
        "date": "september 2021"
      },
      {
        "_id": utilService.makeId(),
        "txt": "Such a beautiful place... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, magni? Fugiat, in odit quia quae obcaecati natus deserunt veritatis, quasi similique sed voluptas repudiandae nisi. Officia nemo quidem iure totam!",
        "rate": 4.9,
        "by": {
          "_id": "u102",
          "fullname": "jinxi",
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXkEaKGdTvRr6BqxgHo5fD2sMJF5SX02BzAg&usqp=CAU"
        },
        "date": "august 2018"
      },
      {
        "_id": utilService.makeId(),
        "txt": "Omg im so in love in this place... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, magni? Fugiat, in odit quia quae obcaecati natus deserunt veritatis, quasi similique sed voluptas repudiandae nisi. Officia nemo quidem iure totam!",
        "rate": 4.3,
        "by": {
          "_id": "u102",
          "fullname": "ofek",
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2EC6kTpqfJGDt_v216tBF48TaLcfbQW-vLw&usqp=CAU"
        },
        "date": "june 2015"
      },
      {
        "_id": utilService.makeId(),
        "txt": "Amzing pool was there all day 😎 ... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, magni? Fugiat, in odit quia quae obcaecati natus deserunt veritatis, quasi similique sed voluptas repudiandae nisi. Officia nemo quidem iure totam!",
        "rate": 4.75,
        "by": {
          "_id": "u102",
          "fullname": "mr bill",
          "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRidqR9Jj4w8oA6ztOgc4KAlt1seDpc3clokQ&usqp=CAU"
        },
        "date": "November 2020"
      },
    ]
    storageService.saveToStorage('review', reviews)
    return reviews
  }
} 