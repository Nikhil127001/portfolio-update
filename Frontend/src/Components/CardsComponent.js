import React from 'react'

const CardsComponent = (props) => {
    const { projects } = props;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', }}  >
            <div style={{ display: 'flex', width: '100%',  flexDirection: 'row', overflow: 'scroll' }}>
              
                    {projects.map((project, idx) =>
                     (
                        <a target="_blank" href={project.githubLink}>
                            <div key={idx}class="card  mb-3 mx-5 github_cards" style={{ boxSizing: "border-box", width: "320px", fontFamily: "'Fugaz One', cursive", border: "1px solid #ff6b08", backgroundColor: "white", height : '200px', overflow: 'hidden' }}>
                        <div     class="card-body" style={{ color: "black" }}>
                            <h3 class="card-title">{project.title}</h3>
                            <p class="card-text">{project.frontendDiscription}</p>
                        </div>
                        </div>
                        </a>
                    ))}
                </div>
        </div>
    )
}

export default CardsComponent