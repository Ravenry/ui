import { useMediaQuery } from "react-responsive";

const Responsive = () => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });
  const isBrowser = useMediaQuery({ minWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isMobile,
    isBrowser,
    isTabletOrMobile,
    isTabletOrMobileDevice,
    isPortrait,
    isRetina,
  };
};

export default Responsive;
