import "../App.css";
import { usePocketBase } from "../context/usePocketBase";


function Home() {
  const { pb, syncUserState, user } = usePocketBase();

  async function handleLogoutClick(e) {
    e.preventDefault();

    pb.authStore.clear();
    syncUserState(pb.authStore);
  }

  return (
    <>
      <h1>Welcome!</h1>
      <p>Hello, <strong>{user?.username}</strong>. You are currently logged in!</p>
      <div>
        <img src="src/assets/lotr-party-gif.webp" alt="Lord of the Rings Party"></img>
      </div>
      <div>
        <button onClick={handleLogoutClick}>Logout</button>
      </div>
      <p className="notes">
        Thanks for viewing!
      </p>
    </>
  );
}

export default Home;
