import { firebase, googleAuthProvider } from '../firebase/firebase';

// to login, first we click the button 'login' in LoginPage that dispatches 'startLogin'
// that changes the login state in Firebase
// then in app.js we have this firebase.auth().onAuthStateChanged( (user) => {
// and this dispatches login which dispatches an action (to keep the uid of the user connected)
// so I could wonder: why do we dispatch login from onAuthStateChanged and not from startLogin ?
// we do this to make sure that the redux store is up to date on first access to the page
// onAuthStateChanged is called even on first access to the page, so this can set up the store correctly
// if we dispatched login from startLogin, the store would not be up to date on the first access... only adter a user clicked login or logout

export const login = (uid) => ({
  type:'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const logout = () => ({
  type:'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}