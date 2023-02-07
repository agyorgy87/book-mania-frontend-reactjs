import '../css/Home.css';
import NavigationBar from '../components/NavigationBar.js';

const Home = () => {
    return (
        <div className="home-page">
            <div>
                <NavigationBar/>
            </div>
            <div>
                home
            </div>
        </div>
    );
}

export default Home;
