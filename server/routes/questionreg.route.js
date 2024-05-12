
import express from "express";
import Goal from '../models/goal.model.js';
import Course from '../models/course.model.js';
import Topic from '../models/topic.model.js';
import Qstn from "../models/qstn.model.js";

const router = express.Router();


router.post('/data', async (req, res) => {
    try {
        const { goalName, courseName, topicName } = req.body;

        // Create Goal
        const newGoal = new Goal({ name: goalName });
        console.log(newGoal);
        await newGoal.save();

        // Create Course
        const newCourse = new Course({ name: courseName, goalName: newGoal.name });
        console.log(newCourse);

        await newCourse.save();

        // Create Topic
        const newTopic = new Topic({ name: topicName, courseName: newCourse.name });
        console.log(newTopic);

        await newTopic.save();

        res.status(201).json({ message: 'Data created successfully' });
    } catch (error) {
        console.log("error happend")
        res.status(500).json({ error: error.message });
    }   
});


router.get('/unique-goals', async (req, res) => {
    try {
        // Query unique goal names from the database
        const uniqueGoals = await Goal.distinct('name');
        res.json(uniqueGoals);
    } catch (err) {
        console.error('Error retrieving unique goals:', err);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/coursesByGoal', async (req, res) => {
   
        try {
            const { goalNames } = req.query;
    
            // Find goals by names
            const goals = await Goal.find({ name: { $in: goalNames } });
    
            if (!goals.length) {
                return res.status(404).json({ message: 'No goals found' });
            }
    
            // Find all courses associated with the found goals
            const courses = await Course.find({ goalName: { $in: goalNames } });
    
            if (!courses.length) {
                return res.status(404).json({ message: 'No courses found for the selected goals' });
            }
    
            // Extract unique course names from the retrieved courses array
            const uniqueCourseNames = [...new Set(courses.map(course => course.name))];
    
            res.status(200).json({ goalNames, courseNames: uniqueCourseNames });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ error: 'Internal server error' });
        }
   
    
});



// router.get('/topicByCourse/:courseName', async (req, res) => {
//     try {
//         const { courseName } = req.params;

//         // Find courses by goal ID
//         const course = await Course.findOne({ name: courseName });
//         console.log(course)

//         if (!course) {
//             return res.status(404).json({ message: 'course not found' });
//         }

//         // Find all courses associated with the found course
//         const topic = await Topic.find({ courseName: course.name });
//         console.log(topic);
        
//         if(!topic){
//             return res.status(404).json({ message: 'course not found' });

//         }

//         const uniqueCourseNames = [...new Set(topic.map(topic => topic.name))];

//         res.status(200).json({ courseName, topicNames: uniqueCourseNames });

//     } catch (error) {
//         console.log("error happened");
//         res.status(500).json({ error: error.message });
//     }
// });


router.get('/topicByCourse', async (req, res) => {
    try {
        const { courseNames } = req.query;

        // Find courses by goal ID
        const courses = await Course.find({ name: {$in: courseNames} });
        console.log("course is"+courses);

        if (!courses) {
            return res.status(404).json({ message: 'course not found' });
        }

        // Find all courses associated with the found course
        const topic = await Topic.find({ courseName: {$in : courseNames} });
        console.log(topic);
        
        if(!topic){
            return res.status(404).json({ message: 'course not found' });

        }

        const uniqueCourseNames = [...new Set(topic.map(topic => topic.name))];

        res.status(200).json({ courseNames, topicNames: uniqueCourseNames });

    } catch (error) {
        console.log("error happened");
        res.status(500).json({ error: error.message });
    }
});


router.post('/questions', async (req, res) => {
    try {
      const { qstnname,topic } = req.body;
      const question = new Qstn({ qstnname ,topic});
      await question.save();
      res.status(201).send('Question saved successfully!');
    } catch (error) {
      console.error('Error saving question:', error);
      res.status(500).send('Internal Server Error');
    }
  });


  router.get("/getqstn", async(req,res)=>{
    try {
        const questions = await Qstn.find();
        // console.log(questions);
        res.json(questions);

    } catch (error) {
        console.error('Error saving question:', error);
      res.status(500).send('Internal Server Error');
    }
  })


  router.get('/search', async (req, res) => {
    try {
      const searchQuery = req.query.q; 
      const regex = new RegExp(searchQuery, 'i');
      const results = await Qstn.find({ qstnname: regex });
      res.json(results);
    } catch (error) {
      console.error('Error searching questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default router;
