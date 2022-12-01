import { Container, Divider, Typography } from '@mui/material';
import CirclesAnimation from '../components/animation/circles';
import "../scss/pages/about.scss";

const About = () => {
    const color = "#054FFF"
    return (
        <div className="App">
            <Container className='foreGround'>
                <Typography variant="h2" textAlign="center" color={color}>
                    What are we doing?
                </Typography>
                <div style={{ textAlign: "center" }}>
                    <p>We want freedom and privacy to be a top priority.</p>
                </div>
                <div className="giveMeSpace centerMe">
                    <Divider variant="middle" sx={{ maxWidth: 800, width: "100%" }} />
                </div>
                <Container className='giveMeSpace'>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        We intended to create a platform for simple password and note management without any data collection, because we are tired of continuously losing privacy and remembering tons of passwords and notes.
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #1: We respect privacy
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        Most of the sites want to collect different types of data. For example, telephone numbers, emails, location, age, gender, IP address and a lot more.
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #2: Sync with different devices
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        If you need to sync with your mobile and computer, you do not need to do something special or hard, just create a password or note directly on the site and log in with your mobile or computer.
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #3: Simple registration
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        As was mentioned in the introduction, you can register only with your password and username.
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #4: Client-side encryption
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        We are using client-side encryption, meaning you can see in the source code how we encrypt your data and that is not everything. You can encrypt your data by yourself and send it to our endpoint.
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #5: AES encryption and Master password
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        We use AES encryption for securing your data. AES is a symmetric-key algorithm, meaning the same key is used for both encryption and decryption. That means, in short, only you can decrypt your data with your "Master password". If you lose your "Master password", you will lose all notes and passwords that you encrypted with your "Master password".
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #6: Security
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        Be careful if you have a strong password. That does not mean you are completely safe. There are a lot of different attacks like phishing that do not need to decrypt password hash.
                        If you want to learn more about phishing, simply Google "phishing".
                    </Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #7: Creation of strong password
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>1. Do not include your birth year or birth month/day in your password.</Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>2. Use a combination of at least eight letters, numbers, and symbols.</Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>3. Combine different unrelated words in your password or passphrase.</Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>4. Do not reuse your passwords.</Typography>
                </Container>
                <Container className='giveMeSpace'>
                    <Typography variant='h4' color={color}>
                        #8: Use our beta API
                    </Typography>
                    <Typography marginLeft="1vw" variant='subtitle1'>
                        You can create your password directly within our API.
                    </Typography>
                    <a href="/docs" style={{ marginLeft: "1vw" }} className="outside-link">Learn more here.</a>
                </Container>
            </Container>
            <CirclesAnimation />
        </div>
    )
};

export default About;