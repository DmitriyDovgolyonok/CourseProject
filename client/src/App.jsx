import 'bootstrap/dist/css/bootstrap.min.css'
import Body from 'components/body/Body'
import Header from 'components/header/Header'
import AdminOnly from 'components/helpers/AdminOnly'
import AuthenticatedOnly from 'components/helpers/AuthenticatedOnly'
import UnauthenticatedOnly from 'components/helpers/UnauthenticatedOnly'
import WaitWhileLoading from 'components/helpers/WaitWhileLoading'
import Search from 'pages/search/Search'
import {
    pathAdmin, pathCollection, pathHome, pathNewCollection, pathProfile, pathSearch, pathSignIn,
    pathSignUp, pathByTag
} from 'paths'
import { AuthenticationProvider } from 'providers/AuthenticationProvider'
import { SocketProvider } from 'providers/SocketProvider'
import { lazy, StrictMode, Suspense } from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'utils/i18next'
import './App.scss'
import ByTag from 'pages/by-tag/ByTag'

const Admin = lazy(() => import('pages/admin/Admin'))
const Collection = lazy(() => import('pages/collection/Collection'))
const Home = lazy(() => import('pages/home/Home'))
const NewCollection = lazy(() => import('pages/new-collection/NewCollection'))
const OtherUsersProfile = lazy(() => import('pages/profile/OtherUsersProfile'))
const Profile = lazy(() => import('pages/profile/Profile'))
const SignIn = lazy(() => import('pages/sign-in/SignIn'))
const SignUp = lazy(() => import('pages/sign-up/SignUp'))

const App = () =>
    <StrictMode>
        <HelmetProvider>
            <SocketProvider>
                <AuthenticationProvider>
                        <BrowserRouter>
                            <Body>
                                <Suspense fallback={<></>}>
                                    <Header />
                                </Suspense>
                                <Suspense fallback={<></>}>
                                    <WaitWhileLoading>
                                        <Routes>
                                            <Route path={pathHome} element={<Home />} />
                                            <Route path={pathSearch} element={<Search />} />
                                            <Route path={pathByTag} element={<ByTag />} />
                                            <Route path={pathSignIn} element={
                                                <UnauthenticatedOnly>
                                                    <SignIn />
                                                </UnauthenticatedOnly>
                                            } />
                                            <Route path={pathSignUp} element={
                                                <UnauthenticatedOnly>
                                                    <SignUp />
                                                </UnauthenticatedOnly>
                                            } />
                                            <Route path={pathProfile + '/:userId'} element={<OtherUsersProfile />} />
                                            <Route path={pathCollection + '/:collectionId'} element={<Collection />} />
                                            <Route path={pathProfile} element={
                                                <AuthenticatedOnly>
                                                    <Profile />
                                                </AuthenticatedOnly>
                                            } />
                                            <Route path={pathNewCollection} element={
                                                <AuthenticatedOnly>
                                                    <NewCollection />
                                                </AuthenticatedOnly>
                                            } />
                                            <Route path={pathAdmin} element={
                                                <AdminOnly>
                                                    <Admin />
                                                </AdminOnly>
                                            } />
                                        </Routes>
                                    </WaitWhileLoading>
                                </Suspense>
                            </Body>
                        </BrowserRouter>
                </AuthenticationProvider>
            </SocketProvider>
        </HelmetProvider>
    </StrictMode>
export default App