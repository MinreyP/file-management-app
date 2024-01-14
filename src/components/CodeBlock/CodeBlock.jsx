import { AiOutlineClose } from "react-icons/ai";
import './CodeBlock.css'
import { useState } from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeBlock = () => {
    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    return (
        <div className="code-editor-container">
            <div className="tab">
                <p>Index.html</p>
                <span className="icon cross">
                    <AiOutlineClose />
                </span>
            </div>
            <CodeEditor
                data-color-mode="dark"
                style={{ paddingLeft: '1.5rem', backgroundColor: 'var(--display-bg)', fontSize: '1.2rem', borderTop: 'solid 1px var(--base-color)' }}
                value={code}
                language="js"
                placeholder="Please enter JS code."
                onChange={(evn) => setCode(evn.target.value)}
            />
        </div>
    )
}

export default CodeBlock