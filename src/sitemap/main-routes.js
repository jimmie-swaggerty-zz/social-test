import FeedFrame from "../components/feed/FeedFrame"
import ProfilePage from "../components/profile/ProfilePage"

const MainRoutes = [
    { index: true, path: '/', element: <FeedFrame/> },
    { path: '/:userName', element: <ProfilePage/> },
]
export default MainRoutes