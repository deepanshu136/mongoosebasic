const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema);
// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' });

// amadeus.save()
//     .then(savedMovie => {
//         console.log('Saved movie:', savedMovie);
//     })
//     .catch(error => {
//         console.error('Error saving movie:', error);
//     });
Movie.insertMany([
    {title: 'Amadeus', year: 1986, score: 9.2, rating: 'R'},
    {title: 'Marvel', year: 1989, score: 9.0, rating: 'R'},
    {title: 'Swarg', year: 1985, score: 8.2, rating: 'PG'},
    {title: '13Hour', year: 1984, score: 7.0, rating: 'R'},
    {title: 'Wanted', year: 1982, score: 9.5, rating: 'PG'},
    {title: 'Rambo', year: 1686, score: 5.2, rating: 'PG-13'}
    
])
   .then(data=>{
    console.log("It works");
    console.log(data);
   })
   .catch(error=>{
    console.log("Errorr occured")
    console.log(error);
   })