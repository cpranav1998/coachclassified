import { types, cast, flow } from 'mobx-state-tree'
import axios from 'axios'

interface CoachData {
    name?: string,
    sport?: string,
    email?: string,
    description?: string,
    website?: string
}

interface ClientData {
    name?: string,
    email?: string,
    description?: string,
}

interface ReviewData {
    review?: string,
    rating?: number,
    coach_id?: string,
    client_id?: string
}

const Coach = types.model('Coach', {  // A: define a model
    id: types.number,
    name: types.string,
    sport: types.string,
    email: types.string,
    description: types.string,
    website: types.string
}).actions(self => ({    // B: define actions
}))

const CoachesStore = types.model('CoachesStore', {
    coaches: types.array(Coach)
}).views(self => ({  // A: define computed properties
    get numCoaches () {
        return self.coaches.length
    },
    getCoachById (coachId: number) {
        return self.coaches.find(coach => coach.id === coachId)
    }
})).actions(self => ({
    fetchCoachList: flow(function * fetchCoachList () {
        try {
            const response = yield fetch('http://127.0.0.1:5000/get_coaches', {method:"GET"})
            const responseBody = yield response.json();
            console.log(responseBody)
            self.coaches = cast(responseBody.coaches)
        }
        catch(error) {
            console.log(error);
        }
    }),
    addCoach: flow(function * addCoach (coach: CoachData) { // B: define asynchronous actions
        console.log(JSON.stringify(coach))
        try {
            const response = yield fetch('http://127.0.0.1:5000/add_coach', {
                method:"POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(coach)
            })
            const responseBody = yield response.json();
            console.log(responseBody)
        }
        catch(error) {
            console.log(error);
        }
    }),
    updateCoach: flow(function * updateCoach (coach: CoachData) { // B: define asynchronous actions
        console.log(JSON.stringify(coach))
        try {
            const response = yield fetch('http://127.0.0.1:5000/update_coach', {
                method:"POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(coach)
            })
            const responseBody = yield response.json();
            console.log(responseBody)
        }
        catch(error) {
            console.log(error);
        }
    })
}))

const Client = types.model('Client', {  // A: define a model
    id: types.number,
    name: types.string,
    email: types.string,
    description: types.string
}).actions(self => ({    // B: define actions
}))

const ClientsStore = types.model('ClientsStore', {
    clients: types.array(Client)
}).views(self => ({  // A: define computed properties
    get numClients () {
        return self.clients.length
    },
    getClientById (clientId: number) {
        return self.clients.find(client => client.id === clientId)
    }
})).actions(self => ({
    fetchClientList: flow(function * fetchClientList () {
        try {
            const response = yield fetch('http://127.0.0.1:5000/get_clients', {method:"GET"})
            const responseBody = yield response.json();
            console.log(responseBody)
            self.clients = cast(responseBody.clients)
        }
        catch(error) {
            console.log(error);
        }
    }),
    addClient: flow(function * addClient (client: ClientData) { // B: define asynchronous actions
        console.log(JSON.stringify(client))
        try {
            const response = yield fetch('http://127.0.0.1:5000/add_client', {
                method:"POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(client)
            })
            const responseBody = yield response.json();
            console.log(responseBody)
        }
        catch(error) {
            console.log(error);
        }
    }),
    updateClient: flow(function * updateClient (client: ClientData) { // B: define asynchronous actions
        console.log(JSON.stringify(client))
        try {
            const response = yield fetch('http://127.0.0.1:5000/update_client', {
                method:"POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(client)
            })
            const responseBody = yield response.json();
            console.log(responseBody)
        }
        catch(error) {
            console.log(error);
        }
    })
}))

const Review = types.model('Review', {  // A: define a model
    id: types.number,
    review: types.string,
    rating: types.integer,
    coach_id: types.number,
    client_id: types.number
}).actions(self => ({    // B: define actions
}))

const ReviewsStore = types.model('ReviewsStore', {
    reviews: types.array(Review)
}).views(self => ({  // A: define computed properties
    get numReviews () {
        return self.reviews.length
    },
    getReviewById (reviewId: number) {
        return self.reviews.find(review => review.id === reviewId)
    },
    getReviewsForCoach (coachId: number) {
        return self.reviews.filter(review => review.coach_id === coachId)
    }
})).actions(self => ({
    fetchReviewList: flow(function * fetchReviewList () {
        try {
            const response = yield fetch('http://127.0.0.1:5000/get_reviews', {method:"GET"})
            const responseBody = yield response.json();
            console.log(responseBody)
            self.reviews = cast(responseBody.reviews)
        }
        catch(error) {
            console.log(error);
        }
    }),
    addReview: flow(function * addReview (review: ReviewData) { // B: define asynchronous actions
        console.log(JSON.stringify(review))
        try {
            const response = yield fetch('http://127.0.0.1:5000/add_review', {
                method:"POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(review)
            })
            const responseBody = yield response.json();
            console.log(responseBody)
        }
        catch(error) {
            console.log(error);
        }
    }),
    updateReview: flow(function * updateReview (review: ReviewData) { // B: define asynchronous actions
        console.log(JSON.stringify(review))
        try {
            const response = yield fetch('http://127.0.0.1:5000/update_review', {
                method:"POST", 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(review)
            })
            const responseBody = yield response.json();
            console.log(responseBody)
        }
        catch(error) {
            console.log(error);
        }
    })
}))


export {Coach, CoachesStore, Client, ClientsStore, Review, ReviewsStore}

