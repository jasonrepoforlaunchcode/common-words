import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import data from '../data/initLanguageData.json';

const Home = () => {
    return (
        <>
            <Header />
            <Main languageData={data}/>
            <Footer />
        </>
        
        
    );
}

export default Home;