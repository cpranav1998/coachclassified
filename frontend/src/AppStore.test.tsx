import React from 'react'
import { render } from '@testing-library/react'
import {Coach, CoachesStore, Client, ClientsStore, Review, ReviewsStore} from './AppStore'

test('tests add coach', async () => {
    let store = CoachesStore.create({
        coaches: []
    })
    await store.fetchCoachList()
    let original_num = store.numCoaches
    let coach_data = {
        "name": "test",
        "sport": "WL",
        "email": "test@gmail.com",
        "description": "test",
        "website": "test.com"
    }
    console.log(JSON.stringify(coach_data))
    await store.addCoach(coach_data)
    await store.fetchCoachList()
    let new_num = store.numCoaches
    console.log(store.coaches)
    expect(new_num-original_num).toBe(1)
})

test('tests add client', async () => {
  let store = ClientsStore.create({
    clients: []
  })
  await store.fetchClientList()
  let original_num = store.numClients
  let client_data = {
    "name": "test",
    "email": "test@gmail.com",
    "description": "test",
  }
  await store.addClient(client_data)
  await store.fetchClientList()
  let new_num = store.numClients
  expect(new_num-original_num).toBe(1)
})

test('tests add review', async () => {
  let store = ReviewsStore.create({
    reviews: []
  })
  await store.fetchReviewList()
  let original_num = store.numReviews
  let review_data = {
    "review": "test",
    "rating": 5,
    "coach_id": "1",
    "client_id": "1"
  }
  await store.addReview(review_data)
  await store.fetchReviewList()
  let new_num = store.numReviews
  expect(new_num-original_num).toBe(1)
})

test('tests update coach', async () => {
    let x = 46
    let store = CoachesStore.create({
        coaches: []
    })
    await store.fetchCoachList()
    let original_num = store.numCoaches
    let coach_data = {
        "id": x,
        "sport": "PL",
        "email": "test@gmail.com",
        "description": "test",
        "website": "test.com"
    }
    console.log(JSON.stringify(coach_data))
    await store.updateCoach(coach_data)
    await store.fetchCoachList()
    let new_num = store.numCoaches
    console.log(store.coaches)
    expect(store.getCoachById(x)!.sport).toBe("PL")
})

test('tests update client', async () => {
  let x = 10
  let store = ClientsStore.create({
    clients: []
  })
  await store.fetchClientList()
  let original_num = store.numClients
  let client_data = {
    "id": x,
    "name": "test2",
    "email": "test@gmail.com",
    "description": "test",
  }
  await store.updateClient(client_data)
  await store.fetchClientList()
  let new_num = store.numClients
  expect(store.getClientById(x)!.name).toBe("test2")
})

test('tests update review', async () => {
  let x = 21
  let store = ReviewsStore.create({
    reviews: []
  })
  await store.fetchReviewList()
  let original_num = store.numReviews
  let review_data = {
    "id": x,
    "review": "test3",
    "rating": 4,
    "coach_id": "1",
    "client_id": "1"
  }
  await store.updateReview(review_data)
  await store.fetchReviewList()
  let new_num = store.numReviews
  expect(store.getReviewById(x)!.review).toBe("test3")
})
