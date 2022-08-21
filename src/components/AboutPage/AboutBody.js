import React from 'react'
import PropTypes from 'prop-types'

const AboutBody = props => {
  return (
    <div className="about_body">
        <h2 className='center' style={{marginBottom:'1rem'}}>. . .</h2>
        <p className='center' style={{fontSize:'24px',}}>
            "You're an artist when you say your are and you're a good artist when you make somebody else experience or feel something deep or unexpected."
        </p>
        <p className='center' style={{fontSize:'20px', fontStyle:'italic'}}>
            - Someone
        </p>
        <h2 className='center' style={{marginBottom:'1rem'}}>. . .</h2>
        <hr/>

        <h2 style={{marginTop:'20px'}}>Currently I'm...</h2>
        <p >
        🔨 building a startup -> OU Buy / Sell
        </p>
        <p>
        🎓 entering my last year of college at OU studying CS (Bachelors degrees)
        </p>
        <p>
        💸 freelancing as a Social Media Growth Manager for <a href="#">Black Sheep Foods</a>
        </p>
        <hr/>
        
        <h2 style={{marginTop:'20px'}}>Previously I've...</h2>
        <p >
        🚀 founded Cardboard Express (grocery delivery business) 
        </p>
        <p>
        👨🏾‍💻 worked as a WordPress developer for Powerhouse Associates, LLC
        </p>
        <p>
        📈 grown a couple TikTok accounts · 60k follows · 12M+ views
        </p>
        <ul>
            <li>
                <a href="#">My TikTok</a>
            </li>
            <li>
                <a href="#">1st Client's TikTok</a>
            </li>
            <li>
                <a href="#">2nd Client's TikTok</a>
            </li>
        </ul>
        <hr/>

        <h2 style={{marginTop:'20px'}}>Programming Skills</h2>
        <p className='center'>
            I consider myself a self-taught programmer...🧠
        </p>
        <ul>
            <li>
                <a href="#">Next.js</a>
                "("
                <a href="#">TypeScript version</a>
                ")"
            </li>
            <li>
                <a href="#">Create React App</a>
                "("
                <a href="#">TypeScript version</a>
                ")"
            </li>
            <li>
                <a href="#">Remix</a>
            </li>
            <li>
                <a href="#">Gatsby</a>
            </li>
            <li>
                <a href="#">Preact</a>
            </li>
            <li>
                <a href="#">CDN</a>
            </li>
            <li>
                <a href="#">Plain server-side</a>
            </li>
            <li>
                <a href="#">Tailwind CSS</a>
            </li>
            <li>
                <a href="#">Vite.js</a>
            </li>
            <li>
                <a href="#">Use styled-components as style engine</a>
                "("
                <a href="#">TypeScript version</a>
                ")"
            </li>
        </ul>
        <hr />
        
        <h2 style={{marginTop:'20px'}}>Writing 📝</h2>
        <p className='center'>
            I write about technology, business, and social media. <br /><small>Check out my <a href="#">Substack</a></small>
        </p>
        <p >
        🔨 building a startup -> OU Buy / Sell
        </p>
        <p>
        🎓 entering my last year of college at OU studying CS (Bachelors degrees)
        </p>
        <p>
        💸 freelancing as a Social Media Growth Manager for <a href="#">Black Sheep Foods</a>
        </p>
        <hr/>

        <h2 style={{marginTop:'20px'}}>Timeline</h2>
        <p className='center'>
            I think it's valuable to document the past...
        </p>
        <h3>2022</h3>
        <ul>
            <li>
                January - I became the co-chair for the OpenAPI Initiative (OAI) business governing group (OAI).
            </li>
        </ul>
        <h3>2021</h3>
        <ul>
            <li>
                December - I presented on API management to the United Nations Enviornmental Programme.
            </li>
            <li>
                November - I become a technical advisor to the OpenTravel Alliance.
            </li>
            <li>
                August - I launched Postman's partner program.
            </li>
        </ul>
        <h3>2020</h3>
        <ul>
            <li>
                October - Interviewed by Marsh Gardiner at the API Specifications Conference (ASC) as part of a fireside chat.
            </li>
            <li>
                September - Joined Postman as their Chief Evangelist.
            </li>
            <li>
                January - Joined F5 Networks as their API architect.
            </li>
        </ul>
        <h3>2019</h3>
        <ul>
            <li>
                November - Launched API Commons at Defrag Conference in Colorado
            </li>
        </ul>
    </div>
  )
}

AboutBody.propTypes = {}

export default AboutBody