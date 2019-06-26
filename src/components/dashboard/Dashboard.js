import React from 'react';
import {connect} from "react-redux";
import {Box} from 'grommet';
import Header from './header/Header';
import TopHeadlines from './top-headlines/TopHeadlines';
import DomainDashboard from './top-headlines/DomainHeadlines';
import MadeForYou from './top-headlines/MadeForYou';
import Recommendations from './top-headlines/Recommendations';
import {setDomainPage} from "../../actions/appActions";


const Dashboard = (props) => {

    let renderedPage = null;
    if(props.domainPage === 'headlines') {
        renderedPage = <TopHeadlines />
    }else if(props.domainPage === 'made-for-you'){
        renderedPage = <MadeForYou />;
        setDomainPage('x');
    }else if(props.domainPage === 'recommendations'){
        renderedPage = <Recommendations user={props.currentUser}/>;
        setDomainPage('x');
    }else {
        renderedPage = <DomainDashboard chosenDomain={props.domainPage} />
    }

    return(
        <Box>
            <Box>
                <Header/>
            </Box>
            <Box>
                {renderedPage}
            </Box>
        </Box>
    );
};


const mapStateToProps = (state) => {
    return {
        domainPage: state.app.domainPage,
        currentUser: state.app.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setDomainPage: (domain) => {dispatch(setDomainPage(domain))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);