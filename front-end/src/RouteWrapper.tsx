import React from 'react'
import { RouteProps as ReactRouterProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom'
import { useAuth } from './context/Auth';

interface RouteProps extends ReactRouterProps {
    isPrivate?: boolean
    component: React.ComponentType
}

const RouteWrapper: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
    const { user } = useAuth()
    const temUser = Object.keys(user).length === 0

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !temUser ? (
                    <Component />
                ) : (
                        <Redirect to={{
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: { from: location }
                        }} />
                    )
            }}
        />
    )
}

export default RouteWrapper;