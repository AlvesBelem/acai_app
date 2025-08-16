"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";



export function AosInit() {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });

        AOS.refresh();

        window.addEventListener("load", () => {
            AOS.refresh();
        });
    }, [])

    return null;
}