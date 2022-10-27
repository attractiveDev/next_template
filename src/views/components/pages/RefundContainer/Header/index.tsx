import React, { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import { Router, useRouter } from "next/router";

import * as anchor from '@project-serum/anchor';
import * as web3 from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useAnchorWallet,
  useWallet
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css'); // Default styles that can be overridden by your app
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import {
  WalletDialogProvider,
  WalletDialogButton,
} from "@solana/wallet-adapter-material-ui";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import ImageWrapper from 'src/views/components/base/ImageWrapper';
import DiscordIcon from 'src/views/components/base/SvgIcons/DiscordIcon';
import TwitterIcon from 'src/views/components/base/SvgIcons/TwitterIcon';
import MagicEdenIcon from 'src/views/components/base/SvgIcons/MagicEdenIcon';
import WalletIcon from 'src/views/components/base/SvgIcons/WalletIcon';

import handleImageError from 'src/@utils/handleImageError';

interface HeaderProps {
  children?: any
}

const Header = (props: HeaderProps) => {
  const linkRouter = useRouter();

  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isActive = (url: string) => {
    //used pathname before news category page.
    return linkRouter.asPath.includes(url);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    (async () => {

    })()
  }, []);

  return (
    <AppBar
      sx={{
        boxShadow: `none`,
        background: `url('/images/background.svg')`,
        backgroundPosition: `center`,
        backgroundSize: `contain`,
        backgroundRepeat: `repeat`,
        zIndex: 9
      }}
    >
      <Toolbar>
        <Container
          maxWidth={`lg`}
        >
          <Stack
            direction={`row`}
            alignItems={`center`}
            justifyContent={`space-between`}
            sx={{
              py: {
                ss: 1,
                sm: 2
              }
            }}
          >
            <Stack
              direction={`row`}
              alignItems={`center`}
              justifyContent={`space-between`}
            >
              <Box
                component={`img`}
                src={`/images/logo.svg`}
                onError={handleImageError}
                sx={{
                  width: {
                    ss: 76,
                    ts: 84,
                    sm: 108,
                    md: 116,
                    td: 128
                  },
                  height: `auto`,
                  '&:hover': {
                    cursor: `pointer`
                  }
                }}
                onClick={() => {
                  linkRouter.push(`/home`)
                }}
              />
            </Stack>

            <Stack
              direction={`row`}
              alignItems={`center`}
              justifyContent={`space-between`}
              spacing={{
                ss: 0,
                xs: 1,
                sm: 3
              }}
            >
              <IconButton aria-label="delete" sx={{ display: { ss: `none`, sm: `inline-flex` } }}>
                <DiscordIcon />
              </IconButton>

              <IconButton aria-label="delete" sx={{ display: { ss: `none`, sm: `inline-flex` } }}>
                <TwitterIcon />
              </IconButton>

              <IconButton aria-label="delete" sx={{ display: { ss: `none`, sm: `inline-flex` } }}>
                <MagicEdenIcon />
              </IconButton>

              <WalletMultiButton
                startIcon={
                  <WalletIcon sx={{ width: 24, height: 24 }} />
                }
                className={`wallet-button`}
              />

              <Box>
                <IconButton edge="end" aria-label="menu"
                  sx={{
                    display: {
                      sm: `none`
                    },
                    color: theme => theme.palette.common.black
                  }}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    handleMenu(event)
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    '& .MuiList-root': {
                      background: theme => theme.palette.background.default
                    }

                  }}
                >
                  <MenuItem
                    sx={{
                      background: theme => theme.palette.background.default
                    }}
                  >
                    <WalletMultiButton
                      startIcon={
                        <WalletIcon sx={{ width: 24, height: 24 }} />
                      }
                      className={`mobile-wallet-button`}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <IconButton aria-label="delete">
                      <DiscordIcon />
                    </IconButton>

                    <Typography
                      variant={`subtitle2`}
                      sx={{ color: theme => theme.palette.common.black }}
                    >
                      Discord
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <IconButton aria-label="delete" >
                      <TwitterIcon />
                    </IconButton>
                    <Typography
                      variant={`subtitle2`}
                      sx={{ color: theme => theme.palette.common.black }}
                    >
                      Twitter
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <IconButton aria-label="delete">
                      <MagicEdenIcon />
                    </IconButton>
                    <Typography
                      variant={`subtitle2`}
                      sx={{ color: theme => theme.palette.common.black }}
                    >
                      Magic Eden
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
