import React from 'react'
import './About.css'

const About: React.FC = () => {
    return (
        <section className='about-section-container'>
            <div className="project-description">
                <h2>What's Menu?</h2>
                <p>Have you ever been hungry, but not exactly sure what you're craving? With Cravr, you can figure out what you're craving in seconds by answering a series of questions. Fill out the form, submit, and see beautifully curated recipe recommendations based on your search.</p>
            </div>
            <h3>Team</h3>
            <div className="profiles">
                <article className="team-profile">
                    <h4>Ashish Singh</h4>
                </article>
                <article className="team-profile">
                    <h4>Deepak Sharma</h4>
                </article>
                <article className="team-profile">
                    <h4>Mukul Agarwal</h4>
                </article>
                <article className="team-profile">
                    <h4>Satyam Sharma</h4>
                </article>
            </div>
        </section>
    )
}

export default About;