export function Header() {
  function renderPath() {
    let currentLocation = location.pathname;
    if (currentLocation === "/posts") {
      return <h1>Create a post</h1>;
    } else if (currentLocation === "/profile") {
      return <h1>Profile page</h1>;
    }
  }

  return <header className="m-3">{renderPath()}</header>;
}
