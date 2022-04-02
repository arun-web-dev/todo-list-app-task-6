export default function Navigation(props) {
  const { navigationHandler } = props;
  const navigateToSign = (e) => {
    navigationHandler(true);
  };
  return (
    <div className="flex justify-end mw7 mb2 center">
      <button
        onClick={navigateToSign}
        className="mt3 button-reset pv2 ph3 pointer dib sign-out-btn"
      >
        Sign Out
      </button>
    </div>
  );
}
