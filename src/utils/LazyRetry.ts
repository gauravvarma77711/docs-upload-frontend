import React, { lazy } from "react";
import { setItem, getItem } from "./localStorage";

const lazyWithRetry = (componentImport: Function) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      getItem("force-refreshed") || "false"
    );

    try {
      const component = await componentImport();

      setItem("force-refreshed", "false");

      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        setItem("force-refreshed", "true");
        return window.location.reload();
      }
      throw error;
    }
});

export default lazyWithRetry