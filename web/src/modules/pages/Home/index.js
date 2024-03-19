// Imports
import React from 'react'
import { Link } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import Helmet from 'react-helmet'

// UI imports
import Typography from 'ui/Typography'
import Button from 'ui/Button'
import './style.css'

// App imports
import { URL_WEB } from 'setup/config/env'
import params from 'setup/config/params'
import { routes } from 'setup/routes'
import Body from 'modules/common/Body'
import Header from 'modules/common/Header'

// Component
const Home = () => {
  // state
  const { isAuthenticated } = useStoreState(state => state.user.auth)

  // render
  return (
    <Body>
      {/* meta */}
      <Helmet>
        <title>{ `${ params.site.name } - ${ params.site.description }` }</title>
      </Helmet>

      {/* header */}
      <Header />

      {/* content */}
      <div className='pages-home animation fade-in'>
        <img src={URL_WEB + '/images/logo.svg'} className='logo animation grow-in' alt='logo' />

        <Typography size='h2' variant='secondary' className='mb-3'>Welcome to {params.site.name }</Typography>

        {
          isAuthenticated
            ? <Link to={routes.userWorkspace.path}>
                <Button
                  title='Open Editor'
                  iconRight='arrow_forward'
                  size='l'
                />
              </Link>
            : <Link to={routes.userRegister.path}>
                <Button
                  title='Get Started'
                  iconRight='arrow_forward'
                  size='l'
                />
              </Link>
        }
      </div>
    </Body>
  )
}

export default Home
