const supportDefaults = {
    'txt': `Test Content`,
    'html': `<div class="Center">
    <h1>NAME OF SITE</h1>
    </div>`,
    'css': `html {
        background-color: #e2e2e2;
        margin: 0;
        padding: 0;
    }`,
    'js': `const str = 'The quick brown fox jumps over the lazy dog.';
        const words = str.split(' ');
        console.log(words[3]);`,
    'jsx': `class ProductCategoryRow extends React.Component {
        render() {
            const category = this.props.category;
            return (
            <tr>
                <th colSpan="2">
                {category}
                </th>
            </tr>
            );
        }
        }`
};

export const checkContentSupport = (format) => {
    if (supportDefaults[format]) {
        return true;
    } else {
        false;
    }
};

const getDefaultContent = (format) => {
    let content;
    if (checkContentSupport(format)) {
        content = supportDefaults[format];
    } else {
        content = `start adding content...`;
    }
    return content;
}

export default getDefaultContent;