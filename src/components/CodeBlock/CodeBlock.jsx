import PropTypes from 'prop-types';
import { AiOutlineClose } from "react-icons/ai";
import './CodeBlock.css'
import CodeEditor from '@uiw/react-textarea-code-editor';

const CodeBlock = ({ displayFile }) => {


    return (
        <div className="code-editor-container">
            <div className="tab">
                <p>{displayFile.name}.{displayFile.extension}</p>
                <span className="icon cross">
                    <AiOutlineClose />
                </span>
            </div>
            <div style={{ padding: '0 2rem' }}>
                <CodeEditor
                    data-color-mode="dark"
                    style={{ backgroundColor: 'var(--display-bg)', fontSize: '1.2rem', borderTop: 'solid 1px var(--light-color)' }}
                    value={displayFile.content}
                    language={displayFile.extension}
                    placeholder="Start typing..."
                />
            </div>
        </div>
    )
}

CodeBlock.propTypes = {
    displayFile: PropTypes.object
}

export default CodeBlock