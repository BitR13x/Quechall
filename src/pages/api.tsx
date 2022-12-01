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
import { Container } from "@mui/system";

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

const APIPage = () => {
    let markdown = `
# API endpoints for custom passwords
API which will hold your encrypted passwords.
### POST /api/custom/generate-passwd \n\n
curl example:
~~~bash
curl -X POST HOST/api/custom/generate-passwd -H "Content-Type: application/json" \\\n
 -H 'Cookie: jid=yourJID; accessToken=yourAcessToken' \\\n
 -d '{ "length": "", "name": "" }'
~~~
If you don't provide anything, length will be default 16 and name will be random generated uuid. \n\n
Response:
~~~json
{
   "message": "Success! || Error!", 
   "name": "name || uuid", 
   "content": "content"
}
~~~

### POST /api/custom/getPasswdByName/:name \n\n
curl example:
~~~bash
curl -X POST HOST/api/custom/getPasswdByName/$YourPasswordName -H "Content-Type: application/json" \\\n
 -H 'Cookie: jid=yourJID; accessToken=yourAcessToken'
~~~

Response:
~~~json
{
   "message": "Success! || Error!", 
   "password": "password || null"
}
~~~

### POST /api/custom/get-passwds \n\n
curl example:
~~~bash
curl -X POST HOST/api/custom/get-passwds -H "Content-Type: application/json" \\\n
 -H 'Cookie: jid=yourJID; accessToken=yourAcessToken' \\\n
 -d '{ "count": "HowMany"}'
~~~
If you won't specify "count", it will return everything. \n\n
Response:
~~~json
{
   "message": "Success! || Error!", 
   "passwords": "passwords || null"
}
~~~


### POST /api/custom/create-passwd 

curl example:
~~~bash
curl -X POST HOST/api/custom/create-passwd -H "Content-Type: application/json" \\\n
 -H 'Cookie: jid=yourJID; accessToken=yourAcessToken' \\\n
 -d '{ "name": "", "content": ""}'
~~~
If you won't specify "name" or "content", it will give you error with status 401 and message. \n\n
Response:
~~~json
{
   "message": "Success! || Error!", 
   "password": "password || null"
}
~~~

### POST /api/custom/delete-passwd/:id \n\n

curl example:
~~~bash
curl -X POST HOST/api/custom/delete-passwd/$PasswordID -H "Content-Type: application/json" \\\n
 -H 'Cookie: jid=yourJID; accessToken=yourAcessToken'
~~~
\n\n
Response:
~~~json
{
   "message": "Success! || Error!", 
   "deleted": "id || undefined"
}
~~~`

    return (
        <Container>
            <div className="ApiDocs">
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children)}
                                    style={oneDark}
                                    language={match[1]}
                                    PreTag="div"
                                    wrapLines={true}

                                    // lineProps={{ style: {} }}
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                >{markdown}</ReactMarkdown>
            </div>
        </Container>
    )
}

export default APIPage;