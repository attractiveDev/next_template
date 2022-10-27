import React, { Fragment, useEffect, useRef, useState } from "react";

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Provider as ReduxProvider } from "react-redux";
import { store, RootState } from "redux/store"
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setTheme } from "redux/slices/counterSlice";

import moment from 'moment';

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

import Alert from '@mui/material/Alert';
import { AlertColor } from '@mui/material';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import MagicEdenWhiteIcon from 'src/views/components/base/SvgIcons/MagicEdenWhiteIcon';
import handleImageError from 'src/@utils/handleImageError';

import NoNfts from 'src/views/components/pages/RefundContainer/NoNfts';

import NftItem from 'src/views/components/pages/RefundContainer/NftItem';
import NftsStatisticBar from 'src/views/components/pages/RefundContainer/NftsStatisticBar';

const Home = () => {
 const router = useRouter();

 const wallet = useWallet();
 const anchorWallet = useAnchorWallet();

 const [isShowModal, setIsShowModal] = React.useState(false);

 const [showLoading, setShowLoading] = React.useState<boolean>(false);
 // For alert message
 const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
 const [messageContent, setMessageContent] = useState<string>(``);
 const [messageSeverity, setMessageSeverity] = useState<AlertColor>(`success`);

 const showModal = () => {
  setIsShowModal(true);
 };

 const hideModal = () => {
  setIsShowModal(false);
 };

 const closeMessage = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
   return;
  }
  setMessageContent(``);
  setMessageSeverity(`success`)
  setIsShowMessage(false);
 };

 useEffect(() => {
  (async () => {
   console.log(`wallet`, wallet);
  })()
 }, [wallet]);

 useEffect(() => {
  (async () => {
   console.log(`anchorWallet`, anchorWallet);
  })()
 }, [anchorWallet]);

 return (
  <Box
   component={`section`}
   sx={{
    width: `100%`,
    position: `relative`,
   }}
  >
   <Container
    component={`section`}
    maxWidth={`lg`}
    sx={{
     px: {
      ss: `20px !important`,
      sm: `48px !important`,
      md: `64px !important`,
     }
    }}
   >
    <Stack
     direction={`row`}
     alignItems={`center`}
     justifyContent={`center`}
     sx={{
      pb: {
       ss: 4,
       sm: 4
      }
     }}
    >
     <Typography
      variant={`h2`}
      sx={{
       fontFamily: `Big Shoulders Display`
      }}
     >
      REFUND PROTOCOL
     </Typography>
    </Stack>

    <Typography
     variant={`subtitle2`}
     sx={{
      fontFamily: `Questrial`,
      mb: 2
     }}
    >
     Select your NFTs
    </Typography>

    {
     true &&
     <Grid
      container
      direction={`row`}
      alignItems={`center`}
      spacing={{
       ss: 3,
       sm: 4,
       md: 6,
       xl: 4
      }}
      sx={{
       mt: `0 !important`,
       pb: {
        ss: 20,
        sm: 18
       }
      }}
     >
      {
       new Array(27).fill(undefined).map((nft: any, index: number) => {
        return (
         <Grid
          item
          ss={12}
          xs={6}
          sm={6}
          md={4}
          xl={3}
          sl={2}
          key={index}
          sx={{
           pt: `0px !important`,
           pb: `26px !important`,
           transition: `all 0.3s`,
           '&:hover': {
            cursor: `pointer`,
            transform: `scale(1.03)`
           }
          }}
         >
          <NftItem
           isChecked={true}
           onClick={() => {

           }}
          >

          </NftItem>
         </Grid>
        )
       })
      }
     </Grid>
    }


    {
     false &&
     <NoNfts />
    }

   </Container>

   <NftsStatisticBar
    sx={{
     position: `fixed`,
     background: theme => theme.palette.background.default,
     right: 0,
     bottom: {
      ss: 46,
      md: 54
     },
     left: 0,
     zIndex: 9,
     py: 1.5
    }}
    onClick={
     () => {
      showModal();
     }
    }
    selected={3}
   >

   </NftsStatisticBar>

   <Dialog
    open={isShowModal}
    onClose={hideModal}
    sx={{
     '& .MuiPaper-root': {
      background: theme => `none`,
      borderRadius: 8,
      width: 516,
      maxHeight: `84vh`
     }
    }}
   >
    <Stack
     direction={`column`}
     alignItems={`center`}
     justifyContent={`space-between`}
     sx={{
      px: {
       ss: 2,
       sm: 4
      },
      background: theme => theme.palette.neutral.common,
      borderRadius: 8
     }}
    >
     <Box
      component={`img`}
      src={`/images/assets/rain.svg`}
      sx={{
       width: {
        ss: `64%`,
        sm: `48%`
       },
       mx: `auto`
      }}
      onError={handleImageError}
     />

     <Typography
      variant={`h4`}
      sx={{
       color: theme => theme.palette.common.black,
       fontFamily: `Gotham`,
       textAlign: `center`
      }}
     >
      You’ll be missed
     </Typography>

     <Typography
      variant={`body1`}
      sx={{
       color: theme => theme.palette.common.black,
       fontFamily: `Gotham`,
       mt: 2,
       textAlign: `center`
      }}
     >
      It’s quite unfortunate to see you leaving us!
     </Typography>

     <Typography
      variant={`body1`}
      sx={{
       color: theme => theme.palette.common.black,
       fontFamily: `Gotham`,
       textAlign: `center`
      }}
     >
      You can track your refund transaction at:
     </Typography>

     <Typography
      variant={`body1`}
      sx={{
       color: theme => theme.palette.common.black,
       fontFamily: `Gotham`,
       fontWeight: `bold`,
       mt: 3,
       textAlign: `center`
      }}
     >
      TRANSACTION ID
     </Typography>

     <Typography
      variant={`body1`}
      sx={{
       fontFamily: `Gotham`,
       mt: 2,
       color: theme => theme.palette.neutral.contrast,
       textAlign: `center`
      }}
     >
      5eNop ... rB6
     </Typography>

     <Typography
      variant={`body1`}
      sx={{
       color: theme => theme.palette.common.black,
       fontFamily: `Gotham`,
       mt: 2,
       textAlign: `center`
      }}
     >
      In case you change your mind, feel free to
      come back
     </Typography>

     <Button
      sx={{
       display: `flex`,
       alignItems: `center`,
       height: {
        ss: 36,
        sm: 48
       },
       background: theme => theme.palette.neutral.contrast,
       boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
       borderRadius: `16px`,
       py: 0,
       px: 4,
       mt: 3,
       mb: 4,
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
        fontWeight: `bold`,
        textAlign: `center`
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
   </Dialog>

   <Snackbar open={isShowMessage} autoHideDuration={5000} onClose={closeMessage} sx={{ zIndex: 9 }}>
    <Alert onClose={closeMessage} severity={messageSeverity} sx={{ width: '100%', zIndex: 9 }}>
     {messageContent}
    </Alert>
   </Snackbar>

   <Backdrop
    sx={{ color: '#000000', zIndex: 9 }}
    open={showLoading}
   >
    <CircularProgress color="inherit" />
   </Backdrop>
  </Box>
 );
}

export default Home;