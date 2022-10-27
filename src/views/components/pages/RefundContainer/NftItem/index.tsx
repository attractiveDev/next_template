import React, { Fragment, CSSProperties, FC, MouseEvent, PropsWithChildren, ReactElement } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

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
import Checkbox from '@mui/material/Checkbox';
import Container from "@mui/material/Container";
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import { SxProps, Theme } from '@mui/material/styles';

import NftCheckBox from 'src/views/components/base/NftCheckBox';

import ImageWrapper from 'src/views/components/base/ImageWrapper';
import CheckedIcon from 'src/views/components/base/SvgIcons/CheckedIcon';
import UnCheckedIcon from 'src/views/components/base/SvgIcons/UnCheckedIcon';
import handleImageError from 'src/@utils/handleImageError';

interface Props {
  children?: React.ReactNode,
  sx?: SxProps<Theme>,
  isChecked?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const NftItem = (props: Props) => {
  const linkRouter = useRouter();

  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();

  const [checked, setChecked] = React.useState<boolean>(false);

  const isActive = (url: string) => {
    //used pathname before news category page.
    return linkRouter.asPath.includes(url);
  };

  React.useEffect(() => {
    (async () => {
      setChecked(props.isChecked ? true : false)
    })()
  }, []);

  return (
    <Box
      component={`div`}
      sx={{
        border: checked ? theme => `solid 8px ${theme.palette.neutral.contrast}` : theme => `solid 8px ${theme.palette.common.white}`,
        borderRadius: `10px`,
        width: '100%',
      }}
      onClick={() => {
        setChecked(!checked)
      }}
    >
      <Box
        component={`div`}
        sx={{
          background: theme => theme.palette.background.default,
          position: `relative`,
          border: theme => `solid 8px ${theme.palette.common.white}`,
          width: '100%',
          height: `100%`,
          paddingBottom: `calc(100% - 16px - 16px)`
        }}
      >
        <Box
          sx={{
            width: `100%`,
            height: `100%`,
            position: `absolute`,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <ImageWrapper
            src={`/images/mk.svg`} height={`calc(100% - 8px - 8px)`}
          />
        </Box>

        <Box
          sx={{
            position: `absolute`,
            background: theme => theme.palette.background.default,
            borderTopRightRadius: `10px`,
            width: `48%`,
            bottom: 0,
            left: 0,
            px: 0
          }}
        >
          <Typography
            variant={`subtitle2`}
            sx={{
              fontFamily: `Red Hat Display`,
              mx: `auto`,
              textAlign: `center`,
              py: 0.75
            }}
          >
            # 9999
          </Typography>
        </Box>

        <NftCheckBox
          sx={{
            position: `absolute`,
            top: 1,
            right: 1,
            mx: `auto`,
            textAlign: `center`
          }}
          isChecked={checked}
        />
      </Box>
    </Box>
  );
};

export default NftItem;
