import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import "../scss/pages/markdown.scss";

SyntaxHighlighter.registerLanguage('markdown', markdown);

const MarkdownSyntax = ({ markdown }) => {
    return (
        <div>
            <SyntaxHighlighter
                lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                wrapLines={true}
                showLineNumbers={true}
                children={String(markdown).replace(/\n$/, '')}
                style={atomDark}
                language="markdown"
                PreTag="div"
                className="highlighter"
            />
        </div>
    );
};


export default MarkdownSyntax;