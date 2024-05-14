import React, { useState } from 'react';
import 'katex/dist/katex.min.css'; // Import Katex styles
// import { InlineMath } from 'react-katex';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const MyText = ({ sendEquationsToParent }) => {
    const [equations, setEquations] = useState([]);

    const handleContentChange = (newContent) => {
        setEquations(newContent);
        if (sendEquationsToParent) {
            sendEquationsToParent(newContent); // Pass the content to the parent component
        }
    };

    const modules = {
        toolbar: [
            // [{ 'size': [] }],
            ['bold', 'italic', 'underline'], // Include bold and italic buttons
            [{ 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
            ['undo', 'redo'],
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    
    return (
        <div>

            <div className="text-editor" >
                <ReactQuill
                    value={equations}
                    onChange={handleContentChange}
                    modules={modules} // Include the modules
                    formats={formats} // Include the formats
                />
            </div>
        </div>

    );
};

export default MyText;
