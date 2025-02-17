"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [token, settoken] = useState(true);
  const navigate = useRouter();
  useEffect(() => {
    if (!token) {
      navigate.push("/login");
    } else {
      navigate.push("/test");
    }
  }, [token]);

  return <></>;
}
