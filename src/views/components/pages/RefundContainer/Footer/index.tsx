import React, { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface FooterProps {
  children: React.ReactNode
}

const Footer = (props: FooterProps) => {
  const linkRouter = useRouter();
  const isActive = (url: string) => {
    return linkRouter.asPath.includes(url);
  };

  React.useEffect(() => {
    (async () => {

    })()
  }, []);

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        top: 'auto',
        bottom: 0,
        background: theme => `${theme.palette.neutral.paper}`,
        py: 1.5,
        boxShadow: `none`,
        zIndex: 9
      }}
    >
      <Toolbar sx={{ minHeight: `auto !important` }}>
        <Typography
          variant={`body1`}
          sx={{
            color: theme => theme.palette.common.white,
            fontFamily: `Roboto`,
            mx: `auto`
          }}
        >
          Copyright Ⓒ{new Date().getFullYear} Thre3. All Rights Reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
