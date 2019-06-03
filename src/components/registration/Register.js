import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Box, Button, FormField, TextInput} from "grommet";
import {FormNext, FormLock} from "grommet-icons";
import {registerNewUser} from "../../actions/appActions";


function handleRegisterUser(firstName, lastName, username, email, password, confirmPassword, props){
    console.log(firstName + " " + lastName + " " + username + " " + email + " " + password + " " + confirmPassword);

    if(password === confirmPassword){
        const newUser = {
            "firstName": firstName,
            "lastName": lastName,
            "username":  username,
            "email": email,
            "password": password,
            "preferences": []
        };
        props.setRegisterNewUser(newUser);
    }else{
        console.log("Incorrect password");
    }

    window.location = "http://localhost:3000/register/preferences";
}

const Register = (props) =>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');

    let samePasswordMsg = '';
    (password !== confirmPassword) ? samePasswordMsg = "Passwords do not match!" : samePasswordMsg = '';

    return(
        <Box id={'registration-box'} direction={'column'}>
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
                <Button id={'register-first-button'} label={"Next"} icon={<FormNext/>} onClick={() => handleRegisterUser(firstName, lastName, username, email, password, confirmPassword, props)}/>
            </Box>
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