import StyledLink from './StyledLink';
import Header from './Header';
import Footer from './Footer';

const Resources = () => {
    return (
        <>
            <Header />
            <div>Resources</div>
            <div>
                 <a href="https://forvo.com/">Forvo</a> 
                 <h2>Find downloadable soundfiles of native speakers in hundreds of languages</h2>
            </div>
            <div>
                 <a href="https://www.wiktionary.org/">Wiktionary.org</a> 
                 <h2>Entries include phonetical spellings, grammatical info and images. Very helpful for building vocabulary decks.</h2>
            </div>
            <div>
                 <a href="https://rhinospike.com/">Rhinospike</a> 
                 <h2>Fun community of language learners. Submit a ticket requesting a pronunciation or translation while helping others on their language learning journey.</h2>
            </div>
            <Footer />
        </>
    );
}

export default Resources;