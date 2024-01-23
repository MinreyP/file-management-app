import { AiOutlineClose } from "react-icons/ai";
import './CodeBlock.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import useBoundStore from "../../states/boundStore";

const CodeBlock = () => {
    const activeFile = useBoundStore(state => state.activeFile);

    return (
        <div className="code-editor-container">
            <div className="tab">
                <p>{activeFile.name}.{activeFile.extension}</p>
                <span className="icon cross">
                    <AiOutlineClose />
                </span>
            </div>
            <CodeEditor
                data-color-mode="dark"
                style={{ backgroundColor: 'var(--display-bg)', fontSize: '1.2rem', borderTop: 'solid 1px var(--base-color)' }}
                value={activeFile.content}
                language={activeFile.extension}
                placeholder="Start typing..."
            />
        </div>
    )
}

export default CodeBlock