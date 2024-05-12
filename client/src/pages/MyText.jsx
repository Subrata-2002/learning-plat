import React, { useState } from 'react';
import 'katex/dist/katex.min.css'; // Import Katex styles
// import { InlineMath } from 'react-katex';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const MyText = ({ sendEquationsToParent }) => {
    const [equations, setEquations] = useState([]);

    const handleChange = (newText) => {
        // Extract equations from the text
        const newEquations = newText.split(/\n|<p>|<\/p>/).filter((equation) => equation.trim().length > 0);
        setEquations(newEquations);
        // Call the function to send equations to parent component
        sendEquationsToParent(newEquations);
    };
    return (
        <div>

            <div className="text-editor" >
                <ReactQuill
                    theme="snow" // Specify theme ('snow' is a built-in theme)
                    
                    onChange={handleChange}
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            ['link', 'image'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['clean']
                        ]
                    }}
                    placeholder="Write question..."
                    preserveWhitespace={true}
                />

            </div>
            {/* <div style={{ color: "black" }}>
            {equations.map((equation, index) => (
                    <div key={index}>
                        <InlineMath>{equation}</InlineMath>
                    </div>
                ))}
            </div> */}
        </div>

    );
};

export default MyText;
