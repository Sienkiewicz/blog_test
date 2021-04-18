import Head from 'next/head'
import React, { FC } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import { LinearProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bar: {
      width: '100%',
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    main: {
      width: '100%',
      flexGrow: 1,
    },
  })
)

type Props = {
  children: JSX.Element | JSX.Element[]
  title: string
}

export const MainLayout: FC<Props> = ({ children, title = '' }) => {
  const isLoading = useSelector((state: RootState) => state.user.isLoading)
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Simple blog generator' />
        <meta name='keywords' content='blog about something' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <nav className={classes.bar}>
        <AppBar position='sticky'>
          <Toolbar className={classes.toolBar}>
            <Link href={'/'}>
              <a>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                  Home
                </IconButton>
              </a>
            </Link>
          </Toolbar>
        </AppBar>
        {isLoading && <LinearProgress />}
      </nav>
      <main className={classes.main}>{children}</main>
      <footer>MY FOOTER</footer>
    </div>
  )
}
