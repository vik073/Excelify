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
import { isDevelopment } from 'setup/helpers/utils'
import params from 'setup/config/params'
import { routes } from 'setup/routes'
import AuthCheck from 'modules/auth/AuthCheck'
import Body from 'modules/common/Body'
import Header from 'modules/common/Header'
import { register } from 'modules/user/api/actions/mutation'

// Component
const Register = ({ history }) => {
  // state
  const [isSubmitting, isSubmittingToggle] = useState(false)
  const [user, setUser] = useState({
    name: isDevelopment() ? 'User' : '',
    email: isDevelopment() ? 'user@mmxx.com' : '',
    password: isDevelopment() ? '123456' : ''
  })

  // actions
  const messageShow = useStoreActions(actions => actions.common.messageShow)

  // submit form
  const onSubmit = async (event) => {
    event.preventDefault()

    isSubmittingToggle(true)

    try {
      const { data } =await register(user)

      isSubmittingToggle(false)

      messageShow({ success: data.success, message: data.message })

      if(data.success) {
        history.push(routes.userLogin.path)
      }
    } catch (e) {
      messageShow({ success: false, message: 'There was some error. Please try again' })

      isSubmittingToggle(false)
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
        <title>{ `Register · ${ params.site.name }` }</title>
      </Helmet>

      {/* header */}
      <Header />

      {/* content */}
      <div className='user-register animation grow-in'>
        <div className='form'>
          <Typography size='h2' variant='secondary' className='text-light'>Register</Typography>

          <form onSubmit={onSubmit} className='mt-3'>
            <Text
              label='Name'
              name='name'
              placeholder='Enter your name'
              value={user.name}
              onChange={onChange}
              required
              autoFocus
            />

            <Text
              label='Email'
              name='email'
              placeholder='Enter your email'
              value={user.email}
              onChange={onChange}
              required
            />

            <Text
              label='Password'
              name='password'
              type='password'
              placeholder='Enter your password'
              value={user.password}
              onChange={onChange}
              required
            />

            <div className='buttons'>
              <Button
                type='submit'
                title='Register'
                iconLeft='check'
                isLoading={isSubmitting}
                disabled={isSubmitting}
              />

              <Link to={routes.userLogin.path}>
                <Button
                  title='Login'
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

export default Register
