export function Header() {
  function renderPath() {
    let currentLocation = location.pathname;
    if (currentLocation === "/posts") {
      return <h1 className="fs-2">Create a post</h1>;
    } else if (currentLocation === "/profile") {
      return <h1 className="fs-2">Profile page</h1>;
    }
  }

  return <header className="mb-3">{renderPath()}</header>;
}
