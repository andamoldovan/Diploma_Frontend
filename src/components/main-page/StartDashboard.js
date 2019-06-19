import React, {useState, useEffect} from 'react';
import {Box} from 'grommet'
import {getStartDashboardArticles} from "../api";
import StartArticle from './StartArticle';

const StartDashboard = () => {
    const [articles, setArticles] = useState();

    useEffect(() => {
        getStartDashboardArticles().then(res => {
            setArticles(res)
        });
    }, []);

    let arr = [];
    if(articles !=null && articles.length > 0){
        articles.map(element => {
             arr.push(<StartArticle image={element.urlToImage} title={element.title} url={element.url}/>);
        })
    }

  return(
      <Box>
          <Box className={"main-page-box first-row-box"}>
              {arr[0]}
          </Box>
          <Box className={"main-page-box first-row-box second-column"}>
              {arr[4]}
          </Box>
          <Box className={"main-page-box first-row-box third-column"}>
              {arr[7]}
          </Box>
          <Box className={"main-page-box first-row-box forth-column"}>
              {arr[12]}
          </Box>
          <Box className={"main-page-box second-row-box"}>
              {arr[2]}
          </Box>
          <Box className={"main-page-box second-row-box second-column"}>
              {arr[5]}
          </Box>
          <Box className={"main-page-box second-row-box third-column"}>
              {arr[11]}
          </Box>
          <Box className={"main-page-box second-row-box forth-column"}>
              {arr[15]}
          </Box>
          <Box className={"main-page-box third-row-box"}>
              {arr[3]}
          </Box>
          <Box className={"main-page-box third-row-box second-column"}>
              {arr[1]}
          </Box>
          <Box className={"main-page-box third-row-box third-column"}>
              {arr[9]}
          </Box>
          <Box className={"main-page-box third-row-box forth-column"}>
              {arr[8]}
          </Box>
          <Box className={"main-page-box forth-row-box"}>
              {arr[13]}
          </Box>
          <Box className={"main-page-box forth-row-box second-column"}>
              {arr[6]}
          </Box>
          <Box className={"main-page-box forth-row-box third-column"}>
              {arr[14]}
          </Box>
          <Box className={"main-page-box forth-row-box forth-column"}>
              {arr[10]}
          </Box>
      </Box>
  );
};

export default StartDashboard;
