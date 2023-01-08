import type { NextPage } from 'next'
import Head from 'next/head'
import Main from '../components/Main'
import MainContainer from '../reusable-components/MainContainer'
import Navbar from '../components/Navbar'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dawid | Front-End Developer</title>
        <meta name="description" content="Dawid | Front-End Developer | Portfolio website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainContainer>
        <Navbar />
        <Main />
      </MainContainer>
    </div>
  )
}

export default Home
