// Imports
import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Helmet from 'react-helmet'

// UI imports
import Typography from 'ui/Typography'
import Button from 'ui/Button'
import './style.css'

// App imports
import params from 'setup/config/params'
import Body from 'modules/common/Body'
import Header from 'modules/common/Header'
import { routes } from 'setup/routes'
import { logout, clearApplicationCache } from 'modules/user/api/actions/query'

// Component
const Profile = ({ history }) => {
  // state
  const { user } = useStoreState(state => state.user.auth)

  // actions
  const authReset = useStoreActions(actions => actions.user.authReset)
  const messageShow = useStoreActions(actions => actions.common.messageShow)

  const onLogout = () => {
    let check = window.confirm('Are you sure you want to logout?')

    if(check) {
      authReset()

      logout()

      messageShow({ success: true, message: 'You have been logged out successfully.' })

      history.push(routes.userLogin.path)
    }
  }

  const onClearApplicationCache = () => {
    let check = window.confirm('Are you sure you want to clear application cache?')

    if(check) {
      clearApplicationCache()

      messageShow({ success: true, message: 'Application cache has been cleared successfully.' })
    }
  }

  return (
    <Body>
      {/* meta */}
      <Helmet>
        <title>{ `Profile · ${ params.site.name }` }</title>
      </Helmet>

      {/* header */}
      <Header />

      {/* content */}
      <div className='user-profile animation fade-in'>
        <Typography size='h2' variant='secondary'>Profile</Typography>

        {
          user && user.name &&
          <Typography size='h4' className='mt-3'>{ user.name } · { user.email }</Typography>
        }

        <div className='actions'>
          <Button title='Clear Application Cache' iconLeft='sync' variant='outlined' size='s' onClick={onClearApplicationCache} />

          <Button title='Logout' iconRight='exit_to_app' variant='outlined' size='s' onClick={onLogout} className='ml-3'/>
        </div>
      </div>
    </Body>
  )
}

export default Profile
