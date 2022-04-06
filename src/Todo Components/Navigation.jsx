export default function Navigation({ currentUser }) {
  const navigateToSign = (e) => {
    localStorage.setItem("authenticated", "false");
    window.location.pathname = "/";
  };
  return (
    <div className="flex justify-between items-end mw7 mb2 center">
      {currentUser && (
        <div className="flex items-center">
          <p className="ma0 mr1 b f3  user-icon flex justify-center items-center">
            {currentUser.slice(0, 1).toUpperCase()}
          </p>
          <p className="f4 code ml2">
            {currentUser[0].toUpperCase() + currentUser.slice(1)}
          </p>
        </div>
      )}
      <button
        onClick={navigateToSign}
        className="mt3 button-reset pv2 ph3 pointer dib sign-out-btn"
      >
        Sign Out
      </button>
    </div>
  );
}
