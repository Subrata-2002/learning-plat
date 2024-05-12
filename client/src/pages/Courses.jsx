import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Courses.scss"
import MyText from './MyText.jsx';
import { InlineMath } from 'react-katex';
import { Link } from 'react-router-dom';
import newRequest from '../utils/newRequest.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Courses = () => {

    const [goals, setGoals] = useState([]);
    const [selectedGoals, setSelectedGoals] = useState([]);

    const [course, setCourse] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);

    const [topic, setTopic] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);

    const [topicWeightages, setTopicWeightages] = useState({});

    const [textboxContent, setTextboxContent] = useState([]);

    const [hintEquations, setHintEquations] = useState([]);
    const [solutions, setSolutions] = useState([]);

    const [questionText, setQuestionText] = useState('');
    const [questionEquations, setQuestionEquations] = useState([]);


    useEffect(() => {
       
        const fetchGoals = async () => {
            try {
                const response = await newRequest.get('/unique-goals'); 
                setGoals(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        // Call the fetchGoals function when the component mounts
        fetchGoals();
    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    // Function to receive the equations from MyText component
    const receiveQuestionEquationsFromMyText = (equations) => {
        setQuestionEquations(equations);
    };

    // Function to receive equations for hints from MyText component
    const receiveHintEquationsFromMyText = (equations) => {
        setHintEquations(equations);
    };

    const receiveSolutionsFromMyText = (equations) => {
        setSolutions(equations);
    }

    const handleGoalChange = async (e, setFunction) => {
        const optionValues = Array.from(e.target.selectedOptions, option => option.value);
        setFunction(prevOptions => [...prevOptions, ...optionValues]);

        try {
            const response = await newRequest.get(`/coursesByGoal?goalNames=${optionValues.join('&goalNames=')}`);

            const coursesToAdd = response.data.courseNames.map(courseName => ({ goal: optionValues[0], name: courseName })); // Add goal info to courses
            // console.log(prevCourses => [...prevCourses, ...response.data.courseNames]);
            setCourse(prevCourses => [...prevCourses, ...coursesToAdd]); // Store the courses
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    const handleCourseChange = async (e, setFunction) => {
        const optionValues = Array.from(e.target.selectedOptions, option => option.value);
        setFunction(prevOptions => [...prevOptions, ...optionValues]);

        try {
           
            const response = await newRequest.get(`/topicByCourse?courseNames=${optionValues.join('&courseNames=')}`);
            console.log("response is " + response.data.topics);

            const topicsToAdd = response.data.topicNames.map(topicName => ({ course: optionValues[0], name: topicName }));
            console.log("topic are" + topicsToAdd);

            setTopic(prevTopics => [...prevTopics, ...topicsToAdd]); // Store topics
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };
    const handleRemoveOption = (optionValue, setFunction) => {
        console.log('Selected Goals:', selectedGoals);
        console.log('Courses:', course);

        if (selectedGoals.includes(optionValue) || selectedCourses.includes(optionValue)) {
           
            setFunction(prevOptions => prevOptions.filter(option => option !== optionValue));

           
            setCourse(prevCourses => prevCourses.filter(course => course.goal !== optionValue));
            setTopic(prevTopics => prevTopics.filter(topic => topic.course !== optionValue));

        } else {
            
            setFunction(prevOptions => prevOptions.filter(option => option !== optionValue));
        }

        setTopicWeightages(prevState => {
            const newState = { ...prevState };
            delete newState[optionValue];
            return newState;
        });
    };

    const handleTopicChange = async (e, setFunction) => {
        const optionValues = Array.from(e.target.selectedOptions, option => option.value);
        setFunction(prevOptions => [...prevOptions, ...optionValues]);


    };

    const handleWeightageChange = (e, topic) => {
        const { value } = e.target;
        setTopicWeightages(prevState => ({
            ...prevState,
            [topic]: value
        }));
    };


    const [options, setOptions] = useState([]);

    const addOption = () => {
        setOptions([...options, '']);
        setTextboxContent([...textboxContent, '']);
    };

    const handleInputChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);

        const newTextboxContent = [...textboxContent];
        newTextboxContent[index] = value;
        setTextboxContent(newTextboxContent);
    };

    const deleteOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);

        const newTextboxContent = [...textboxContent];
        newTextboxContent.splice(index, 1);
        setTextboxContent(newTextboxContent);
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        // console.log('Question Text:', questionText); // Lo
        // console.log("eqtn is " + questionEquations);
        // console.log("selected topic is" + selectedTopics);
        // console.log("topic is " + topic)
        try {
            await newRequest.post('/questions', { qstnname: questionEquations.join(' '), topic: selectedTopics.join(' ') });
            // console.log('Question saved successfully!');
        
                navigate("/");
             
        } catch (error) {
            console.error('Error saving question:', error);
        }
    };
    return (
        <div className='first'>
            <form onSubmit={handleSubmit}>

                <div className="crs-cn">
                    <div className="header">

                        <button className='upbtn'><Link to="/"><span style={{ color: "white" }}> Back</span></Link></button>
                        <button className='upbtn' type="button" ><span style={{ justifyContent: "center", alignItems: "center" }}>Edit Question</span>
                        </button>
                        <button className='upbtn' type="submit" >save</button>
                    </div>
                    <div className="content">
                        <div className="sidebar">

                            <div className="left" style={{ width: "700px" }}>

                                <div className="firsthalf" >

                                    <div className="leftfirst">
                                        <div className="cont1">

                                            <p>Goals</p>
                                            <select name="optn" id="" className='optn' onChange={(e) => handleGoalChange(e, setSelectedGoals)}>

                                                <option>select</option>
                                                {goals.map((goal, index) => (
                                                    <option key={index} value={goal}>{goal}</option>
                                                ))}

                                            </select>

                                            {selectedGoals.map((option, index) => (
                                                <div key={index} className="selected-option">
                                                    <p className='makewdth'>{option}</p>
                                                    <button type="button" onClick={() => handleRemoveOption(option, setSelectedGoals)}>x</button>
                                                </div>
                                            ))}
                                        </div>


                                        <div className="cont2">
                                            <p>Courses</p>
                                            <select name="optn" id="" className='optn' onChange={(e) => handleCourseChange(e, setSelectedCourses)}>
                                                <option>select</option>

                                                {course.map((course, index) => (
                                                    <option key={index} value={course.name}>{course.name}</option>
                                                ))}
                                            </select>
                                            {selectedCourses.map((option, index) => (
                                                <div key={index} className="selected-option">
                                                    <p>{option}</p>
                                                    <button type="button" onClick={() => handleRemoveOption(option, setSelectedCourses)}>x</button>
                                                </div>
                                            ))}
                                        </div>



                                    </div>

                                    <div className="rightfirst">
                                        <div className="cont1">

                                            <p>Topic</p>
                                            <select name="optn" id="" className='optn' onChange={(e) => handleTopicChange(e, setSelectedTopics)}>
                                            <option>select</option>

                                                {topic.map((mtopic, index) => (

                                                    <option key={index} value={mtopic.name}>{mtopic.name}</option>
                                                ))}


                                            </select>
                                            {selectedTopics.map((option, index) => (
                                                <div key={index} className="selected-option">
                                                    <p>{option}</p>
                                                    <button type="button" onClick={() => handleRemoveOption(option, setSelectedTopics)}>x</button>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <p>Wheatage</p>
                                            <div style={{marginTop:"34px"}}>

                                            {selectedTopics.map((topic, index) => (
                                                <div key={index} className="selected-option" >
                                                    <p>{topic}</p>
                                                    <input
                                                        placeholder='Enter wheatage'
                                                        type="text"
                                                        style={{ backgroundColor: "white", color: "black", width: "100px", borderRadius: "4px" }}
                                                        value={topicWeightages[topic] || ''}
                                                        onChange={(e) => handleWeightageChange(e, topic)}
                                                    />

                                                </div>
                                            ))}
                                            </div>
                                        </div>

                                    </div>

                                    <div className='thirdpart' >

                                        <div className="cont1">
                                            <p>Difficulty Level</p>
                                            <select name="optn" id="" className='optn' >

                                                <option value="1">1</option>

                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>

                                        </div>

                                        <div className="cont2">
                                            <p>Question Type</p>
                                            <select name="optn" id="" className='optn' >

                                                <option value="MCQ">MCQ</option>

                                                <option value="SAQ">SAQ</option>
                                                <option value="MSQ">MSQ</option>

                                            </select>

                                        </div>
                                    </div>

                                    <p>Question</p>
                                    <div >
                                        <MyText sendEquationsToParent={receiveQuestionEquationsFromMyText} />
                                    </div>

                                    <p>Option and answer</p>
                                    <div>
                                        <button onClick={addOption} style={{ background: "green" }} type="button">Add</button>
                                        <div style={{ display: "flex", gap: "14px" }}>
                                            {options.map((value, index) => (
                                                <div key={index}>
                                                    <input type="checkbox" name="" id="" />

                                                    <input
                                                        type="text"
                                                        style={{ backgroundColor: "white", color: "black", width: "90px", borderRadius: "6px" }}
                                                        value={value}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                    />
                                                    <button type='button' onClick={() => deleteOption(index)} className='mybtn' >
                                                        x
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                    <p>Hint</p>
                                    <div >
                                        <MyText sendEquationsToParent={receiveHintEquationsFromMyText} />
                                    </div>

                                    <p>Solution</p>
                                    <div style={{ marginBottom: "100px" }}>
                                        <MyText sendEquationsToParent={receiveSolutionsFromMyText} />
                                    </div>

                                </div>

                            </div>


                        </div>
                        <div className="main-content" style={{ color: "black" }}>
                            {/* Add your main content here */} <h2>Questions</h2>
                            {questionEquations.map((equation, index) => (
                                <div key={index}>
                                    <InlineMath>{equation}</InlineMath>
                                </div>
                            ))}

                            <div>

                                <ol>

                                    {textboxContent.map((content, index) => (
                                        <li key={index} style={{ color: "red" }}>
                                            <input type="checkbox" name="" id="" />{content}</li>
                                    ))}

                                </ol>

                            </div>


                            {hintEquations.map((eqtn, index) => (
                                <><h2>Hint</h2><div key={index}>
                                    <InlineMath>{eqtn}</InlineMath>
                                </div></>
                            ))}

                            {solutions.map((soln, index) => (
                                <><h2>Solutions</h2><div key={index}>
                                    <InlineMath>{soln}</InlineMath>
                                </div></>
                            ))}
                        </div>


                    </div>
                </div>
            </form>

        </div>
    )
}

export default Courses
