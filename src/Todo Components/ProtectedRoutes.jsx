import { Navigate, Route } from "react-router-dom";

export default function ProtectedRoutes({
  component: Component,
  ...restofProps
}) {
  const isAuthenticated = localStorage.getItem("authenticated");
  console.log("this", isAuthenticated);
  return (
    <Route
      {...restofProps}
      element={(props) => {
        isAuthenticated ? (
          <>
            <Component {...props} />{" "}
          </>
        ) : (
          <Navigate to="/signin" />
        );
      }}
    />
  );
}
