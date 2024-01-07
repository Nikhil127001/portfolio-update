import React from 'react'

const SkillsComponent = (props) => {
    const {skillData} = props
    return (
        <div className='container '>
            {skillData && skillData.map((item,idx) => (
                <div key={idx} className='row  '>
                <div className='col-md-3'>
                    <div className='row align-items-center'>
                        <div className='col-md-4'>
                    <img src={item.imageUrl} alt='No Preview' style={{
                    height
                        : "60px", width: "60px"
                }} /></div>
                <div className='col-md-8'>
                <h3>{item.name}</h3>
                </div>
                </div>
                </div>
                <div className='col-md-9'>
                <div className="progress mt-5 "    role="progressbar" aria-label="Basic example" aria-valuenow={item.progress} aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar  ProgressBar"  style={{width: `${item.progress}%`}}><b>{item.progress}%</b></div>
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    )
}

export default SkillsComponent