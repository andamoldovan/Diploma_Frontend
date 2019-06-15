import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Box,  Button} from 'grommet';
import AscendButton from './AscendButton';
import BasicSearch from './BasicSearch';
import UserProfile from '../../user-profile/UserProfile';
import {setDomainPage} from "../../../actions/appActions";
import AdvancedSearchButton from './AdvancedSearchButton';


const Header = (props) => {

    return(
        <Box className={"headlines-menu-bar"} direction={"row"}>
            <AscendButton/>
            <Box id={"dashboard-tab-main-box"} direction={"row"}>
                <Button className={'domain-button'} label={"Headlines"} color={"light-3"} onClick={() => props.setDomainPage('headlines')}/>
                <Button className={'domain-button'} label={"Business"} color={"light-3"} onClick={() => props.setDomainPage('business')}/>
                <Button className={'domain-button'} label={"Entertainment"} color={"light-3"} onClick={() => props.setDomainPage('entertainment')}/>
                <Button className={'domain-button'} label={"General"} color={"light-3"} onClick={() => props.setDomainPage('general')}/>
                <Button className={'domain-button'} label={"Health"} color={"light-3"} onClick={() => props.setDomainPage('health')}/>
                <Button className={'domain-button'} label={"Science"} color={"light-3"} onClick={() => props.setDomainPage('science')}/>
                <Button className={'domain-button'} label={"Sport"} color={"light-3"} onClick={() => props.setDomainPage('sports')}/>
                <Button className={'domain-button'} label={"Technology"} color={"light-3"} onClick={() => props.setDomainPage('technology')}/>
                <Button className={'domain-button'} label={"Made For You"} color={"light-6"} onClick={() => props.setDomainPage('made-for-you')}/>
            </Box>
            <Box>
                <BasicSearch />
            </Box>
            <Box>
                <UserProfile />
            </Box>
            <Box>
                <AdvancedSearchButton />
            </Box>
        </Box>
    );
};

const mapDispatchToProps = (dispatch) => {
    return{
        setDomainPage: (domain) => {dispatch(setDomainPage(domain))}
    }
};

export default connect(null, mapDispatchToProps)(Header);