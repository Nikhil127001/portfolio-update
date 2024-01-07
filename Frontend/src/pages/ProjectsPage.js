import React from 'react'
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  return (

    <div className='projectsBody' >
      <div style={{margin: '10px'}}>
            <Link to={"/projectItemsWeb"}><img style={{ borderRadius: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4)'}} src="/images/Website.png" class="img-fluid" alt="'Nothing to Preview'" /></Link>
          </div>
          <div  style={{ margin: '10px'}}>
            <Link to={"/projectItemsApp"} >
              <img style={{ borderRadius: '20px',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4)'}} src="/images/Mobile.jpg" class="img-fluid" alt="'Nothing to Preview'" />
            </Link>
          </div>
    </div>

  )
}

export default ProjectsPage