import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Button, FormField, TextInput, Grommet, Heading} from "grommet";
import {FormNext, FormLock} from "grommet-icons";
import {registerNewUser} from "../../actions/appActions";
import Notification from '../Notification';

const myTheme = {
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    }
};



const Register = (props) =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [notification, setNotification] = useState(false);
    const [notificationMsg, setNotificationMsg] = useState(false);

    let samePasswordMsg = '';
    (password !== confirmPassword) ? samePasswordMsg = "Passwords do not match!" : samePasswordMsg = '';

    const handleRegisterUser = () => {
        if(firstName === '' || lastName === '' || username === '' || email === '' || password === ''){
            setNotification(true);
            setNotificationMsg("Please complete all the fields!");
            setTimeout(() => {
                setNotification(false);
            }, 1500);
        }else{
            if(password === confirmPassword){
                const newUser = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "username":  username,
                    "email": email,
                    "password": password,
                    "preferences": [],
                    "readArticles": 0,
                    "favoriteArticles": [],
                    "emailSchedule": "",
                    "articleRatings": {}
                };
                props.setRegisterNewUser(newUser);
                window.location = "http://localhost:3000/register/preferences";
            }else{
                setNotification(true);
                setNotificationMsg("Passwords do not match!");
                setTimeout(() => {
                    setNotification(false);
                }, 1500);
            }
        }

    };

    return(
        <Box id={'registration-box'} direction={'column'}>
            <Grommet theme={myTheme}>
                <Heading alignSelf={'center'} level={1} margin={{left: '40%'}}> Register </Heading>
                <FormField label={'First Name'}>
                    <TextInput value={firstName} onChange={event => setFirstName(event.target.value)} />
                </FormField>
                <FormField label={'Last Name'}>
                    <TextInput value={lastName} onChange={event => setLastName(event.target.value)} />
                </FormField>
                <FormField label={'Username'}>
                    <TextInput value={username} onChange={event => setUsername(event.target.value)} />
                </FormField>
                <FormField label={'Email'}>
                    <TextInput value={email} onChange={event => setEmail(event.target.value)} />
                </FormField>
                <FormField label={'Password'} error={samePasswordMsg}>
                    <Box direction={"row"}>
                        <TextInput id={"register-password-text"} type={passwordType} value={password} onChange={event => setPassword(event.target.value)} />
                        <FormLock onClick={() => {
                            (passwordType === 'password') ? setPasswordType('text') : setPasswordType('password');
                        }}/>
                    </Box>
                </FormField>
                <FormField label={'Confirm Password'} error={samePasswordMsg}>
                    <TextInput type={"password"} value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}/>
                </FormField>
                <Box>
                    <Button id={'register-first-button'} label={"Next"} icon={<FormNext color={'black'}/>} onClick={handleRegisterUser}/>
                </Box>
                {notification && <Notification message={notificationMsg} onClose={() => setNotification(false)}/>}
            </Grommet>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        registerNewUser: state.app.registerNewUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRegisterNewUser : (user) => {dispatch(registerNewUser(user))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);