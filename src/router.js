import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorContext from "./helper/context_error";
import SuccessContext from './helper/context_success';

import LandingPage from "./page/landing_page";
import SplashScreen from "../src/component/landing_page/splashscreen";
import PersonalProfile from "./page/personalProfile";
import Home from "./page/home";
import Signin from "./page/sign_in";
import Signup from "./page/sign_up";

function Router() {
  const [success_message, setsuccess_message] = useState("");
  const value_success = { success_message, setsuccess_message };
  const [error_message, seterror_message] = useState("");
  const value_error = { error_message, seterror_message };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ErrorContext.Provider value={value_error}>
      <SuccessContext.Provider value={value_success}>
        <BrowserRouter>
          <Routes>
            {isLoading ? (
              <Route path="/" element={<SplashScreen />} />
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/personal-profile" element={<PersonalProfile />} />
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </SuccessContext.Provider>
    </ErrorContext.Provider>
  );
}

export default Router;