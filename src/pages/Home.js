import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import Highlights from '../components/Highlights';
import Footer from '../components/Footer';
//cour
export default function Home() {
	const data = {
		image: "https://i.ibb.co/y41N0PP/fashion-meets-aesthetics.png", 
		destination: "/products",

	  };
	return (
		<>
			<Banner data ={data} />
			<FeaturedProducts/>
			< br/>
			< br/>
			< br/>
			< br/>
			<Highlights/>
			<Footer/>
			
		</>
	)
}
