import { useEffect, useState } from "react";
import axios from "axios";

export default function useAppData() {

  //baseURL for requests
  // axios.defaults.baseURL = 'http://localhost:8001';

  const [state, setState] = useState({
    isLoggedIn: false,
    user: {},
  });

  const setDay = day => setState({ ...state, day });

  //make requests for each data
  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers")
  //   ])
  //     .then((all) => {
  //       setState(prev => ({
  //         ...prev,
  //         days: all[0].data,
  //         appointments: all[1].data,
  //         interviewers: all[2].data
  //       }));
  //     });

  // }, [])

  const updateSpots = function (state, appointments, id) {

    const updatedDays = [...state.days].map(a => { return { ...a } });

    //takes in id only for cancel interview
    if (id) {
      updatedDays.map((updated) =>
        updated.appointments.includes(id) ? updated.spots++ : updated.spots
      )
    } else {
      //else it will be for booking
      for (const day of updatedDays) {
        let spots = 0;
        if (appointments) {
          for (const aptID of day.appointments) {
            if (!appointments[aptID].interview) {
              spots++;
            }
          }
          updatedDays.map((updated) =>
            updated === day ? updated.spots = spots : day
          )
        }
      }
    }

    return updatedDays
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (axios.put(`/api/appointments/${id}`, appointment)
    ).then(() => {
      const days = updateSpots(state, appointments);
      setState({ ...state, appointments, days });
    })
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, false, id)
        setState({ ...state, days });
      })
  }

  // componentDidMount() {
  //   this.loginStatus()
  // }

  // function handleLogin(data) {
  //   this.setState({
  //     isLoggedIn: true, 
  //     user:data.user,
  //   })
  // }

  // function handleLogout() {
  //   this.setState({
  //   isLoggedIn: false,
  //   user: {},
  //   })
  // }

  // function loginStatus() {
  //   axios.get('/logged_in', 
  //  {withCredentials: true})    
  //   .then(response => {
  //     if (response.data.logged_in) {
  //       this.handleLogin(response.data)
  //     } else {
  //       this.handleLogout()
  //     }
  //   })
  //   .catch(error => console.log('api errors:', error))
  // };

  return { state, setDay, bookInterview, cancelInterview}
}