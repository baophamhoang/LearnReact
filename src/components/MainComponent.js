import About from "./AboutComponent/";
import DishDetail from './DishdetailComponent/';
import Menu from './MenuComponent/';
import Contact from "./ContactComponent/";
import Home from "./HomeComponent/";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Route,  useParams, useLocation} from 'react-router-dom'
import {  useDispatch } from 'react-redux'
import { useEffect } from "react";
import { fetchDishes, fetchPromos, fetchComments, fetchLeaders } from "../redux/actions";
import SlideRoutes from 'react-slide-routes'
import  { x_master_key, x_bin_meta } from '../shared/requestHeaders';
const url = 'https://api.jsonbin.io/v3/b/623dfa657caf5d678371f921/'
function getAPI(){
  fetch(url, {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        "X-Master-Key" : x_master_key,
        'X-Bin-Meta' :  x_bin_meta
    },
    credentials: "same-origin"
})
.then( r=> r.json())
.then( r => console.log(r))
}

// import BreadcrumbComponent from "./BreadcrumbComponent";
function Main(){
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
        dispatch(fetchDishes());
        dispatch(fetchComments());
        dispatch(fetchPromos());
        dispatch(fetchLeaders());
        // getAPI();
    },[])
    useEffect(()=>{
        console.log('re-renderred');
    })

    function DishWithId(){
        const {dishId} = useParams();
        console.log(dishId);
        return(
            <DishDetail 
                selectedDishId={dishId}
            />
        )
    }

    return (
        <div className="App">
            <Header/>
                {/* {location.pathname!=='/'?<BreadcrumbComponent></BreadcrumbComponent>:null} */}
            {/* <TransitionGroup > */}
                {/* <CSSTransition classNames="page" timeout={300} key={location.pathname}> */}

                    <SlideRoutes animation='slide' duration={500} location={location}>
                        <Route path='/' element={<Home/>} />
                        <Route exact path='/menu' element={<Menu/>} />
                        <Route path='/menu/:dishId' element={<DishWithId />} />
                        <Route path='/contactus' element={<Contact/>} />
                        <Route path='/aboutus' element={<About />} />
                        <Route path="*" element={<Home/>}/>
                    </SlideRoutes>

                {/* </CSSTransition> */}
            {/* </TransitionGroup> */}
            <Footer/>
        </div>
    )
}
export default Main;