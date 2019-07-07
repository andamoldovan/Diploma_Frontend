import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box} from 'grommet/components/Box';
import {FormField, TextInput, Button, Heading, Grommet} from "grommet";
import ReactTooltip from 'react-tooltip';
import '../../style/register.scss';
import {login} from "../api";
import {loggedInUser, setDomainPage} from "../../actions/appActions";
import Notification from '../Notification';

const myTheme = {
    global: {
        colors: {
            control: {'light': '#9CC2BD'},
            text: {'light': 'black'}
        },
    }
};

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState(false);


    const handleLogin = () =>{
        login(email, password).then( (data) => {
            console.log("LOGIN");
            console.log(data);
            if(data.id !== null){
                props.setLoggedInUser(data);
                props.setDomainPage('headlines');
                window.location = "http://localhost:3000/main-page"
            }else{
                setEmail(''); setPassword('');
                setNotification(true);
                setTimeout( () => {
                    setNotification(false);
                }, 2000);
            }
        })
    };

  return (
    <Box id={'login-box'} direction={'column'} fill={false}>
        <Grommet theme={myTheme}>
            <Box id={"login-page-title"} align={"center"}>
                <Heading selfAlign={"center"} level={1}> Login </Heading>
            </Box>
            <FormField label={'Username'} >
                <TextInput value={email} onChange={event => setEmail(event.target.value)} />
            </FormField>
            <FormField label={'Password'} >
                <TextInput type={"password"} value={password} onChange={event => setPassword(event.target.value)} />
            </FormField>
            <Box direction={"row"}>
                <Button id={'login-button'} label={"Login"} onClick={handleLogin}/>
                <Button id={'register-button'} label={"Register"} onClick={() => {
                    return window.location = "http://localhost:3000/register";
                }} />
            </Box>
            {notification && <Notification message={"Incorrect Username or Password!"} color={'critical'} onClose={() => setNotification(false)}/>}
        </Grommet>
    </Box>
  );
};

const mapDispatchToProps = dispatch => {
    return {
        setLoggedInUser : (user) => { dispatch(loggedInUser(user)) },
        setDomainPage: (domain) => {dispatch(setDomainPage(domain))}
    }
};

export default connect(null, mapDispatchToProps)(Login);