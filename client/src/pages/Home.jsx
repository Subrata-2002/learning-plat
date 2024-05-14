import React, { useEffect, useState } from 'react'
import "./Home.scss";
import { Link } from "react-router-dom";
import axios from 'axios';
import { InlineMath } from 'react-katex';
import newRequest from '../utils/newRequest';
import Latex from 'react-latex-next';

const Home = () => {


    const [questions, setQuestions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await newRequest.get('/getqstn'); // Replace with your API endpoint
                setQuestions(response.data);
                console.log("mydata is ", response.data)

            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleSearch = async (e) => {
        setSearchQuery(e.target.value);
        try {
            const response = await newRequest.get(`/search?q=${e.target.value}`);
            console.log(response.data);
            setQuestions(response.data);
        } catch (error) {
            console.error('Error searching questions:', error);
        }
    };

    return (
        <div className="first">

            <div className='home'>

                <div className="header">
                    <input type="text" placeholder="Search..." className="search-bar" value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Link to="/courses" style={{ marginRight: "60px", color: "white" }}>Add Question</Link>
                </div>

                <table className="table" >
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Author</th>
                            <th>Topic</th>
                        </tr>
                    </thead>
                    <tbody>

                        {questions.map((question) => (
                            <tr key={question._id}>
                                <td><Latex>{question.qstnname}</Latex></td>
                                <td>{question.author}</td>
                                <td>{question.topic.join(', ')}</td>
                            </tr>
                        ))}

                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home



