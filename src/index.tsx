/** @jsx jsx */

import ReactDOM from 'react-dom'
import ThemeProvider, { Reset } from './theme'
import { jsx, Layout, Box, Styled as S } from 'theme-ui'
import LoginForm from './LoginForm'
import Nav from './Nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter,
} from 'react-router-dom'

function Page({ children, header, footer }) {
  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // set this to `minHeight: '100vh'` for full viewport height
        minHeight: 256,
      }}
    >
      <header
        sx={{
          width: '100%',
        }}
      >
        {header}
      </header>
      <main
        sx={{
          width: '100%',
          flex: '1 1 auto',
        }}
      >
        {children}
      </main>
      <footer
        sx={{
          width: '100%',
        }}
      >
        {footer ? footer : 'Footer'}
      </footer>
    </div>
  )
}

function Main() {
  return (
    <Box as={'main'}>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Box>
  )
}

const Login = withRouter(props => {
  const { history } = props
  const onLogin = ({ username, password }) => {
    alert(`${username} ${password}`)
    history.push('/items')
  }
  return <LoginForm onLogin={onLogin} />
})

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Topics() {
  let match = useRouteMatch()

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  )
}

function Topic() {
  let { topicId } = useParams()
  return <h3>Requested topic ID: {topicId}</h3>
}
function App() {
  return (
    <ThemeProvider>
      <Layout sx={{ p: 3 }}>
        <Reset />
        <Router>
          <Page
            header={
              <Nav
                items={[
                  {
                    to: '/',
                    label: 'Name Of App',
                  },
                  {
                    to: '/topics',
                    label: 'Items',
                  },
                  {
                    to: '/about',
                    label: 'About',
                  },
                  {
                    to: '/login',
                    label: 'Login',
                  },
                ]}
              />
            }
          >
            <S.h1 sx={{ color: 'primary', mb: 3 }}>Hello Theme UI</S.h1>

            <Main />
          </Page>
        </Router>
      </Layout>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
