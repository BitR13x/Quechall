import { Container, Divider, Typography } from '@mui/material';
import "../scss/pages/about.scss";

const About = () => (
      <div className="App">
        <Container>
            <Typography variant="h2" textAlign="center">
                What we are doing?
            </Typography>
            <div style={{textAlign: "center"}}>
                <p>We want freedom and privacy to be the number one</p>
            </div>
            <div className="giveMeSpace centerMe">
                <Divider variant="middle" sx={{maxWidth: 800, width: "100%"}} />
            </div>
            <Container className='giveMeSpace'>
                <Typography variant='subtitle1'>
                    We intended to create platform for simple password and note management without any data collection, because we are tired of continuously losing of privacy and remebering tons of passwords and notes.
                </Typography>
            </Container>
            <Container className='giveMeSpace'>
                <Typography variant='h4' color="#17a2b8">
                    #1: We respect privacy
                </Typography>
                <Typography variant='subtitle1'>
                    Most of the sites want to collect diffrent types of data for example telephone numbers, emails, location, age, gender, IP address and lot more.
                    We need only the necessary data like password and username ... nothing more.
                </Typography>
            </Container>
            <Container className='giveMeSpace'>
                <Typography variant='h4' color="#17a2b8">
                    #2: Sync with diffrent devices
                </Typography>
                <Typography variant='subtitle1'>
                    If you need sync with mobile and computer, you do not need to do something special or hard, just create password or note directly in the site and log in with your mobile or computer.
                </Typography>
            </Container>
            <Container className='giveMeSpace'>
                <Typography variant='h4' color="#17a2b8">
                    #3: Simple registration
                </Typography>
                <Typography variant='subtitle1'>
                    As it was mentioned in the introduction, you can register only with password and username. 
                </Typography>
            </Container>
            <Container className='giveMeSpace'>
                <Typography variant='h4' color="#17a2b8">
                    #4: AES encryption and Master password
                </Typography>
                <Typography variant='subtitle1'>
                    We you AES encryption for securing your data, AES is a symmetric-key algorithm, meaning the same key is used for both encryption and decryption, that means in short, only you can decrypt your data with "Master password" if you lose your "Master password" you will lose all notes and passwords that you encrypt with your "Master password".
                </Typography>
            </Container>
            <Container className='giveMeSpace'>
                <Typography variant='h4' color="#17a2b8">
                    #5: Security
                </Typography>
                <Typography variant='subtitle1'>
                    Be careful if you have strong password that does not mean you are completly safe, there are a lot of different attacks like phishing that do not need to decrypt password hash.
                    If you want to learn more about phishing simply google phishing.
                </Typography>
            </Container>
            <Container className='giveMeSpace'>
                <Typography variant='h4' color="#17a2b8">
                    #6: Creation of strong password
                </Typography>
                <Typography variant='subtitle1'>
                    1. Do not include your birth year or birth month/day in your password.
                    2. Use a combination of at least eight letters, numbers, and symbols.
                    3. Combine different unrelated words in your password or passphrase.
                    4. Do not reuse your passwords.
                </Typography>
            </Container>
        </Container>
      </div>
);

export default About;