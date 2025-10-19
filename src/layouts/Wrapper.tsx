/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AOS from "aos";

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {

    useEffect(() => {
        AOS.init();
    }, [])

    return <>
        {children}
        <ToastContainer position="top-center" />
    </>;
}

export default Wrapper
