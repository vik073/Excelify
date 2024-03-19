// Imports
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import Helmet from 'react-helmet'

// UI imports
import { Text } from 'ui/Input'
import Button from 'ui/Button'
import Typography from 'ui/Typography'
import './style.css'

// App imports
import params from 'setup/config/params'
import { isDevelopment } from 'setup/helpers/utils'
import { routes } from 'setup/routes'
import AuthCheck from 'modules/auth/AuthCheck'
import Body from 'modules/common/Body'
import Header from 'modules/common/Header'
import { login, loginSetUserLocalStorage } from 'modules/user/api/actions/query'

// Component
const Login = () => {
  // state
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [user, setUser] = useState({
    email: isDevelopment() ? 'user@mmxx.com' : '',
    password: isDevelopment() ? '123456' : ''
  })

  // actions
  const authSet = useStoreActions(actions => actions.user.authSet)
  const messageShow = useStoreActions(actions => actions.common.messageShow)

  // submit form
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      const { data } = await login(user)

      isSubmittingToggle(false)

      messageShow({ success: data.success, message: data.message })

      if(data.success) {
        const token = data.data.token
        const user = data.data.user

        loginSetUserLocalStorage(token, user)

        authSet(user)
      }
    } catch (error) {
      isSubmittingToggle(false)

      messageShow({ success: false, message: 'There was some error. Please try again' })
    }
  }

  // on change input
  const onChange = event => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value})
  }

  return (
    <Body>
      {/* meta */}
      <Helmet>
        <title>{ `Login · ${ params.site.name }` }</title>
      </Helmet>

      {/* header */}
      <Header />

      {/* content */}
      <div className='user-login animation grow-in'>
        <div className='form'>
          <Typography size='h2' variant='secondary' className='text-light'>Login</Typography>

          <form onSubmit={onSubmit} className='mt-3'>
            <Text
              label='Email'
              name='email'
              placeholder='Enter your email'
              value={user.email}
              onChange={onChange}
              required
              autoFocus
            />

            <Text
              label='Password'
              name='password'
              type='password'
              placeholder='Enter your password'
              value={user.password}
              onChange={onChange}
              required
              autoFocus
            />

            <div className='buttons'>
              <Button
                type='submit'
                title='Login'
                iconRight='arrow_forward'
                isLoading={isSubmitting}
                disabled={isSubmitting}
              />

              <Link to={routes.userRegister.path}>
                <Button
                  title='Register'
                  variant='text'
                />
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* auth check */}
      <AuthCheck />
    </Body>
  )
}

export default Login
