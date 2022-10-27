import React, { Fragment, useEffect, useRef, useState } from "react";

import Link from 'next/link';
import { useRouter } from 'next/router';

import Countdown, { zeroPad } from 'react-countdown';

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
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";

import RoadMap from 'src/views/components/pages/RefundContainer/Roadmap';
import WalletIcon from 'src/views/components/base/SvgIcons/WalletIcon';
import RedArrow from 'src/views/components/base/SvgIcons/RedArrow';
import FireArrowIcon from 'src/views/components/base/SvgIcons/FireArrowIcon';
import CheckIcon from 'src/views/components/base/SvgIcons/CheckIcon';
import handleImageError from 'src/@utils/handleImageError';

const renderer = ({ hours, minutes, seconds, completed }) => {
 return (
  <Stack
   direction={`row`}
   alignItems={`center`}
   justifyContent={`center`}
   sx={{
    width: `auto`,
    mx: `auto`
   }}
  >
   <Grid
    container
    direction={`row`}
    alignItems={`center`}
    justifyContent={`center`}
    sx={{
     zIndex: 7
    }}
   >
    <Grid
     item
     ss={3.5}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`h2`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      {zeroPad(hours)}
     </Typography>
    </Grid>

    <Grid
     item
     ss={0.75}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`h2`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      :
     </Typography>
    </Grid>

    <Grid
     item
     ss={3.5}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`h2`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      {zeroPad(minutes)}
     </Typography>
    </Grid>

    <Grid
     item
     ss={0.75}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`h2`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      :
     </Typography>
    </Grid>

    <Grid
     item
     ss={3.5}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`h2`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      {zeroPad(seconds)}
     </Typography>
    </Grid>

    <Grid
     item
     ss={3.5}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`subtitle1`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      Hrs.
     </Typography>
    </Grid>

    <Grid
     item
     ss={0.75}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`subtitle1`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >

     </Typography>
    </Grid>

    <Grid
     item
     ss={3.5}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`subtitle1`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      Mins.
     </Typography>
    </Grid>

    <Grid
     item
     ss={0.75}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`subtitle1`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >

     </Typography>
    </Grid>

    <Grid
     item
     ss={3.5}
     sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}
    >
     <Typography
      variant={`subtitle1`}
      sx={{
       fontFamily: `Gilmer`
      }}
     >
      Secs.
     </Typography>
    </Grid>
   </Grid>
  </Stack>
 )
};

const Home = () => {
 const router = useRouter();

 const wallet = useWallet();
 const anchorWallet = useAnchorWallet();

 const [showLoading, setShowLoading] = React.useState<boolean>(false);
 // For alert message
 const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
 const [messageContent, setMessageContent] = useState<string>(``);
 const [messageSeverity, setMessageSeverity] = useState<AlertColor>(`success`);

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
    position: `relative`
   }}
  >
   <Container
    component={`section`}
    maxWidth={`lg`}
    sx={{
     position: `relative`
    }}
   >
    <Stack
     direction={`row`}
     alignItems={`center`}
     justifyContent={`center`}
     sx={{
      pb: {
       ss: 4,
       sm: 6,
       xl: 8,
      }
     }}
    >
     <Typography
      variant={`h2`}
      sx={{
       color: theme => theme.palette.text.primary,
       fontFamily: `Big Shoulders Display`
      }}
     >
      REFUND PROTOCOL
     </Typography>
    </Stack>

    <Container
     sx={{
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      flexDirection: `row`,
      mx: `auto`
     }}
     maxWidth={`tg`}
    >
     <Grid
      container
      direction={`row`}
      alignItems={`center`}
      justifyContent={`space-between`}
     >
      <Grid item ss={12} sm={3} sx={{ display: `flex`, flexDirection: { ss: `column`, sm: `row` }, alignItems: `center`, justifyContent: `center` }}>
       <RoadMap
        sx={{
         width: {
          ss: 184,
          xs: 216,
          sm: 176,
          tm: 186,
          md: 226,
          lg: 239,
          tg: 239,
          xl: 256
         },
         height: {
          ss: 184,
          xs: 216,
          sm: 176,
          tm: 186,
          md: 226,
          lg: 239,
          tg: 239,
          xl: 256
         }
        }}
       >
        <WalletIcon
         sx={{
          width: {
           ss: 76,
           xs: 120,
           sm: 100,
           md: 128,
           lg: 128,
           tg: 128,
           xl: 128
          },
          height: {
           ss: 76,
           xs: 120,
           sm: 120,
           md: 128,
           lg: 128,
           tg: 128,
           xl: 128
          }
         }}
        />
       </RoadMap>

       <Typography
        variant={`subtitle2`}
        sx={{
         fontFamily: `Gilmer`,
         fontWeight: `bold`,
         py: 3,
         display: {
          sm: `none`
         }
        }}
       >
        1. CONNECT WALLET
       </Typography>
      </Grid>

      <Grid item ss={12} sm={1.5} sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}>
       <RedArrow
        sx={{
         width: 128,
         height: 64,
         transform: {
          ss: `rotate(90deg)`,
          sm: `rotate(0)`
         },
         mb: {
          ss: 3
         }
        }}
       />
      </Grid>

      <Grid item ss={12} sm={3} sx={{ display: `flex`, flexDirection: { ss: `column`, sm: `row` }, alignItems: `center`, justifyContent: `center` }}>
       <RoadMap
        sx={{
         width: {
          ss: 184,
          xs: 216,
          sm: 176,
          tm: 186,
          md: 226,
          lg: 239,
          tg: 239,
          xl: 256
         },
         height: {
          ss: 184,
          xs: 216,
          sm: 176,
          tm: 186,
          md: 226,
          lg: 239,
          tg: 239,
          xl: 256
         }
        }}
       >
        <FireArrowIcon
         sx={{
          width: {
           ss: 76,
           xs: 120,
           sm: 100,
           md: 128,
           lg: 128,
           tg: 128,
           xl: 128
          },
          height: {
           ss: 76,
           xs: 120,
           sm: 120,
           md: 128,
           lg: 128,
           tg: 128,
           xl: 128
          }
         }}
        />
       </RoadMap>

       <Typography
        variant={`subtitle2`}
        sx={{
         fontFamily: `Gilmer`,
         fontWeight: `bold`,
         display: {
          sm: `none`
         },
         py: 3
        }}
       >
        2. SELECT NFTs
       </Typography>
      </Grid>

      <Grid item ss={12} sm={1.5} sx={{ display: `flex`, alignItems: `center`, justifyContent: `center` }}>
       <RedArrow
        sx={{
         width: 128,
         height: 64,
         transform: {
          ss: `rotate(90deg)`,
          sm: `rotate(0)`
         },
         mb: {
          ss: 3
         }
        }}
       />
      </Grid>

      <Grid item ss={12} sm={3} sx={{ display: `flex`, flexDirection: { ss: `column`, sm: `row` }, alignItems: `center`, justifyContent: `center` }}>
       <RoadMap
        sx={{
         width: {
          ss: 184,
          xs: 216,
          sm: 176,
          tm: 186,
          md: 226,
          lg: 239,
          tg: 239,
          xl: 256
         },
         height: {
          ss: 184,
          xs: 216,
          sm: 176,
          tm: 186,
          md: 226,
          lg: 239,
          tg: 239,
          xl: 256
         }
        }}
       >
        <CheckIcon
         sx={{
          width: {
           ss: 76,
           xs: 120,
           sm: 100,
           md: 128,
           lg: 128,
           tg: 128,
           xl: 128
          },
          height: {
           ss: 76,
           xs: 120,
           sm: 120,
           md: 128,
           lg: 128,
           tg: 128,
           xl: 128
          }
         }}
        />

       </RoadMap>
       <Typography
        variant={`subtitle2`}
        sx={{
         fontFamily: `Gilmer`,
         fontWeight: `bold`,
         display: {
          sm: `none`
         },
         py: 3
        }}
       >
        3. PROCESS REFUND
       </Typography>
      </Grid>

      <Grid item ss={3} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center`, zIndex: 7 }}>
       <Typography
        variant={`subtitle2`}
        sx={{
         mt: 4,
         fontFamily: `Gilmer`,
         fontWeight: `bold`
        }}
       >
        1. CONNECT WALLET
       </Typography>
      </Grid>

      <Grid item ss={1.5} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center` }}>

      </Grid>

      <Grid item ss={3} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center`, zIndex: 7 }}>
       <Typography
        variant={`subtitle2`}
        sx={{
         mt: 4,
         fontFamily: `Gilmer`,
         fontWeight: `bold`
        }}
       >
        2. SELECT NFTs
       </Typography>
      </Grid>

      <Grid item ss={1.5} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center` }}>

      </Grid>

      <Grid item ss={3} sx={{ display: { ss: `none`, sm: `flex` }, alignItems: `center`, justifyContent: `center`, zIndex: 7 }}>
       <Typography
        variant={`subtitle2`}
        sx={{
         mt: 4,
         fontFamily: `Gilmer`,
         fontWeight: `bold`
        }}
       >
        PROCESS REFUND
       </Typography>
      </Grid>
     </Grid>
    </Container>

    <Typography
     variant={`subtitle2`}
     sx={{
      fontFamily: `Gotham`,
      mx: `auto`,
      textAlign: `center`,
      mt: {
       ss: 4,
       md: 6
      }
     }}
    >
     TOTAL NFTs REFUNDED
    </Typography>

    <Typography
     variant={`subtitle2`}
     sx={{
      fontFamily: `Gotham`,
      mx: `auto`,
      textAlign: `center`,
      mt: 2
     }}
    >
     {`xxxx`} / {`yyyyy`}
    </Typography>

    <Stack
     direction={`row`}
     alignItems={`center`}
     justifyContent={`center`}
     sx={{
      mt: 4
     }}
    >
     <WalletMultiButton className={`large-wallet-button`} startIcon={null} />
    </Stack>

    <Stack
     direction={`row`}
     alignItems={`center`}
     justifyContent={`center`}
     sx={{
      mt: {
       ss: 3,
       sm: 6,
       md: 6
      },
      pb: {
       ss: 8,
       sm: 12,
       md: 12
      }
     }}
    >
     <Countdown
      date={Date.now() + 5000}
      zeroPadTime={2}
      renderer={renderer}
     />,
    </Stack>
   </Container>

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