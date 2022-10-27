import React, { Fragment } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MagicEdenWhiteIcon from 'src/views/components/base/SvgIcons/MagicEdenWhiteIcon';

import handleImageError from 'src/@utils/handleImageError';

interface Props {
  children?: React.ReactNode
}

const NoNfts = (props: Props) => {
  const linkRouter = useRouter();
  const isActive = (url: string) => {
    return linkRouter.asPath.includes(url);
  };

  React.useEffect(() => {
    (async () => {

    })()
  }, []);

  return (
    <Stack
      direction={`column`}
      alignItems={`center`}
      justifyContent={`space-between`}
      sx={{
        pb: {
          ss: 28,
          sm: 22
        }
      }}
    >
      <Typography
        variant={`h4`}
        sx={{
          fontFamily: `Gotham`,
          color: theme => theme.palette.common.black,
          textAlign: `center`
        }}
      >
        No NFTs in your wallet
      </Typography>

      <Box
        component={`img`}
        src={`/images/assets/sunset.svg`}
        sx={{
          mx: `auto`,
          width: {
            ss: `100%`,
            sm: `360px`,
            tg: `444px`
          }
        }}
        onError={handleImageError}
      />

      <Typography
        variant={`h4`}
        sx={{
          fontFamily: `Gotham`,
          color: theme => theme.palette.common.black,
          textAlign: `center`,
          fontWeight: 700
        }}
      >
        BRIGHTEN UP YOUR DAY <br />
        BUY ONE TODAY
      </Typography>

      <Button
        sx={{
          display: `flex`,
          alignItems: `center`,
          height: {
            ss: 48,
            sm: 64
          },
          background: theme => theme.palette.neutral.contrast,
          boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
          borderRadius: `16px`,
          py: 0,
          px: 4,
          mt: 8,
          color: theme => theme.palette.common.white,
          '&:disabled': {
            background: theme => theme.palette.neutral.grey
          },
          '&:hover': {
            background: theme => theme.palette.neutral.contrast,
            opacity: 0.9
          }
        }}
      >
        <Typography
          variant={`subtitle2`}
          sx={{
            fontFamily: `Gilmer`,
            fontWeight: `bold`
          }}
        >
          BUY NOW FROM&nbsp;
        </Typography>
        <MagicEdenWhiteIcon
          sx={{
            width: 38,
            height: 38,
            mt: 0.5
          }}
        />
      </Button>
    </Stack>
  );
};

export default NoNfts;
