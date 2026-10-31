import { Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Home from "./pages/Home";
import DestinationsListing from "./pages/DestinationsListing";
import DestinationDetail from "./pages/DestinationDetail";
import HotelsListing from "./pages/HotelsListing";
import HotelDetail from "./pages/HotelDetail";
import FlightsSearch from "./pages/FlightsSearch";
import FlightsResults from "./pages/FlightsResults";
import FlightBooking from "./pages/FlightBooking";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<DestinationsListing />} />
        <Route path="destinations/:slug" element={<DestinationDetail />} />
        <Route path="hotels" element={<HotelsListing />} />
        <Route path="hotels/:slug" element={<HotelDetail />} />
        <Route path="flights" element={<FlightsSearch />} />
        <Route path="flights/results" element={<FlightsResults />} />
        <Route path="flights/book" element={<FlightBooking />} />
        <Route path="booking/:slug" element={<Booking />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
