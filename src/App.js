// import logo from './logo.svg';

import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';

import alanBtn from "@alan-ai/alan-sdk-web";
import logo from './logo.jpg';
// import "./App.css";


import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles.js';

const alanKey =
  '0bf46c01ea764430d63711f3f4b33fd62e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          // console.log(articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        //  else if (command === 'instructions') {
        //   setIsOpen(true);
        // } 
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(articles.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        {/* <img src='' className={classes.alanLogo} alt="logo" /> */}
        <img src={logo} className={classes.alanLogo} alt="logo" ></img>
  
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      
    </div>
  );
};

export default App;
