import React, { useState } from 'react';
import 'katex/dist/katex.min.css'; // Import Katex styles
import { InlineMath } from 'react-katex';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const TextEditor = () => {
    const [text, setText] = useState('');

    const handleChange = (newText) => {
        setText(newText);
    };


    return (
        <div>

            <div className="text-editor">
                <ReactQuill
                    theme="snow" // Specify theme ('snow' is a built-in theme)
                    value={text}
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
                />

            </div>
            <div style={{ color: "black" }}>
                <InlineMath>{text}</InlineMath>
            </div>
        </div>

    );
};

export default TextEditor;
