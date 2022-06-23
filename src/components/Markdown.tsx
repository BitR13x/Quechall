import React from "react";
import "../scss/pages/markdown.scss";

import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);


const Markdown = ({ markdown, checked }) => {
    return (
        <div className={ checked ? "MarkdownApp editorSmallWidth" : "MarkdownApp editorBigWidth"}>
            { markdown ? <ReactMarkdown
                components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                    <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={oneDark}
                        className="highlighter"
                        language={match[1]}
                        PreTag="div"
                        {...props}
                    />
                    ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                    )
                }
                }}
           >{markdown}</ReactMarkdown> :
            <div>
                Markdown document will be generated here.
            </div>
           }
        </div>
    );
};

export default Markdown;