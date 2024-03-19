// Imports
import React from 'react'
import Helmet from 'react-helmet'

// UI imports
import Typography from 'ui/Typography'
import './style.css'

// App imports
import params from 'setup/config/params'
import Body from 'modules/common/Body'
import Header from 'modules/common/Header'

// Component
const Learn = () => {
  return (
    <Body>
      {/* meta */}
      <Helmet>
        <title>{ `Learn - ${ params.site.name }` }</title>
      </Helmet>

      {/* header */}
      <Header />

      {/* content */}
      <div className='pages-learn animation fade-in'>
        <Typography size='h2' variant='secondary'>Learn { params.site.name }</Typography>

        <Typography size='h4' className='mt-3'>{ params.site.description }</Typography>
      </div>
    </Body>
  )
}

export default Learn
