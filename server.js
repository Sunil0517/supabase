const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');


const server = express();
server.use(cors())
server.use(express.json());

const prisma = new PrismaClient();

//create user post method
server.post('/users', async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

//get all users
server.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
})

//get user data by id
server.get('/users/:id', async (req, res) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
})

//update user
server.patch('/users/:id', async (req, res) => {
  try{
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.status(200).json(updatedUser);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
})

//delete user
server.delete('/users/:id', async (req, res) => {
  try{
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(deletedUser);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
})

//create post in tweets table from user id
server.post('/tweet/:id', async (req, res) => {
  try{
    const id = req.body.userId;
    //find id in users table
    const user = await prisma.User.findUnique({
      where: {
        id: id,
      }
    });
    if(!user){
      res.status(404).json({ error: 'User does not exist.' });
    }
    const newTweet = await prisma.tweet.create({
      data: {
        userId: req.params.id,
        content: req.body.content,
        location: req.body.location,
      },
    });
    res.status(201).json(newTweet);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create tweet.' });
  }
})

//get all tweets
server.get('/tweets', async (req, res) => {
  try {
    const tweets = await prisma.tweet.findMany();
    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve tweets.' });
  }
})

//get tweet by id
server.get('/tweets/:id', async (req, res) => {
  try{
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(tweet);
  }
  catch(error){
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve tweet.' });
  }
})


server.listen(3004, () => {
  console.log('Server started on port 3004');
});
