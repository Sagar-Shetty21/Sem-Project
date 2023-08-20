import React, {useContext, useEffect} from 'react'
import QuoteBox from '../components/home/QuoteBox';
import './home.css';
import { Link } from "react-router-dom";
import Lottie from 'lottie-react';
import studentsAnimation from '../assets/college_students_animation.json'; 
import SharedStateContext from '../context/sharedStateContext'


const Card = (props) => {
  const {data, path, onClick} = props;

  return (
      <Link to={path} className="card-box" onClick={onClick}>
          <img src={data} width="120" height="120"/>
      </Link>
  )
}

const Home = () => {

  const { setCurrentPageName } = useContext(SharedStateContext);

  useEffect(() => {
    sessionStorage.setItem('activeNavItem', 'Home');
  }, []);

  const handleNavItemClick = (item) => {
    setCurrentPageName(item);
    // Store the active navigation item in browser storage
    sessionStorage.setItem('activeNavItem', item);
  };

  return (
    <div className="home-container" >
      <div className="clg-card">
        <div className="logo-title">
          <img className="clg-logo" src="../scc-logo-nobg.png" alt="clg-logo" />
          <a href="https://www.siliconcitycollege.ac.in/" target="_blank" rel="noopener noreferrer"><span className="clg-name">SILICON CITY COLLEGE</span></a><br/>
        </div>
        <div>
          <span className="desc">(A Unit of MJ Education Trust)</span><br/>
          <span className="desc-2">An Autonomous Institution</span><br/>
          <span className="sub-desc">Re-Accredited by NAAC with 'A' Grade</span><br/>
          <span className="sub-desc-2">Recognised by UGC under section 2(f) & 12(b), Affiliated to Bengaluru North University</span><br/>
        </div>
      </div>
      <Lottie animationData={studentsAnimation} />
      <div className="cards-flex">
        <Card data="../assets/CampusNews.png" path="/campus_news" onClick={() => handleNavItemClick('Campus News')} />
        <Card data="../assets/StudyChat.png" path="/chat" onClick={() => handleNavItemClick('StudyChat')}/>
        <Card data="../assets/Notes.png" path="/notes" onClick={() => handleNavItemClick('Notes')}/>
        <Card data="../assets/Forms.png" path="/forms" onClick={() => handleNavItemClick('Forms & Surveys')}/>
        <Card data="../assets/Queries.png" path="/queries" onClick={() => handleNavItemClick('Queries')}/>
      </div>
      <hr/>
      <QuoteBox/>

    </div>
  )
}

export default Home