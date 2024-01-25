import { AiOutlineClose } from "react-icons/ai";
import './CodeBlock.css'
import CodeEditor from '@uiw/react-textarea-code-editor';
import useBoundStore from "../../states/boundStore";

const CodeBlock = () => {
    const { id, parent } = useBoundStore(state => state.activeFile);
    const filesRelated = useBoundStore(state => state.files[parent]);
    const file = filesRelated.find(file => file.id === id);

    return (
        <div className="code-editor-container">
            <div className="tab">
                <p>{file.name}.{file.extension}</p>
                <span className="icon cross">
                    <AiOutlineClose />
                </span>
            </div>
            <div style={{ padding: '0 2rem' }}>
                <CodeEditor
                    data-color-mode="dark"
                    style={{ backgroundColor: 'var(--display-bg)', fontSize: '1.2rem', borderTop: 'solid 1px var(--base-color)' }}
                    value={file.content}
                    language={file.extension}
                    placeholder="Start typing..."
                />
            </div>
        </div>
    )
}

export default CodeBlock