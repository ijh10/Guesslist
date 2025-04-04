import { useEffect, useState } from "react";
const APIBASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const Cohort = "2412Izzy";
const API = `${APIBASE}/${Cohort}`;
console.log("API", API);

export default function App() {
  const [guests, setGuests] = useState([]);
  // when the app first loads there is no selected guest so we set it to null, the state for the selected guest
  const [guestSelected, setGuestSelected] = useState(null);

  // whent he app first starts no guest is selected
  useEffect(() => {
    const getGuests = async () => {
      const res = await fetch(`${API}/guests`);
      const resJson = await res.json();
      console.log(resJson);
      // updating the guests state to be the list of guests returned from the API
      setGuests(resJson.data);
    };
    getGuests();
    //make sure that we only call the useEffect once at the start of the app
  }, []);
  // render guests is going to loop over all of the guests in the array and return HTML for each guest.
  const renderGuests = () => {
    // map takes the array in and transforms every element in the array into someting new
    return guests.map((guest) => {
      // use the state to update the app content
      return (
        <li key={guest.id} onClick={() => setGuestSelected(guest)}>
          <p>{guest.name} </p>
          <p>{guest.email} </p>
        </li>
      );
      // the key is just to keep track of items on the list
    });
  };

  const displayGuestInfo = () => {
    if (guestSelected) {
      return (
        <div>
          <p>{guestSelected?.name}</p>
          <p>{guestSelected?.email}</p>
          <p>{guestSelected?.bio}</p>
          <p>{guestSelected?.job}</p>
          <p>{guestSelected?.phone}</p>
          <button onClick={() => setGuestSelected(null)}>Back</button>
        </div>
      );
    } else {
      return <ul>{renderGuests()}</ul>;
    }
  };

  return (
    <div>{displayGuestInfo()}</div>
    //? = no guest selected/will not error out
  );
}
