"use client";

import {
  IconLogout,
  IconDashboard,
  IconGymnastics,
  IconMeat,
  IconTarget,
  IconProgress,
  IconUserCircle,
} from "@tabler/icons-react";
import classes from "../_styles/navbar.module.css";
import { NavLink } from "@mantine/core";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { usePathname } from "next/navigation";

const data = [
  { link: "/dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "/workouts", label: "Workouts", icon: IconGymnastics },
  { link: "/meals", label: "Meals", icon: IconMeat },
  { link: "/goals", label: "Goals", icon: IconTarget },
  { link: "/progress", label: "Progress", icon: IconProgress },
];

export function Navbar() {
  const pn = usePathname();

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      active={pn.includes(item.link)}
      href={item.link}
      key={item.label}
      label={item.label}
      leftSection={<item.icon className={classes.linkIcon} stroke={1.5} />}
    />
  ));

  return (
    <>
      <div className={classes.navbarMain}>{links}</div>
      <div className={classes.footer}>
        <NavLink
          href="/profile"
          className={classes.link}
          leftSection={
            <IconUserCircle className={classes.linkIcon} stroke={1.5} />
          }
          active={pn.includes("/profle")}
          label="Profle"
        ></NavLink>

        <NavLink
          component={LogoutLink}
          className={classes.link}
          leftSection={<IconLogout className={classes.linkIcon} stroke={1.5} />}
          label="Logout"
        />
      </div>
    </>
  );
}
