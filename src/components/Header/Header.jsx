import React, { useState, useRef, useEffect, useCallback } from "react";
import navNames from "../../assets/data/navNames";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import useWindowWidth from "../../hooks/useWindowWidth";

const Header = () => {
  const [isDataShouldBeShown, setIsDataShouldBeShown] = useState(false);
  const [isBurgerShouldBeShown, setIsBurgerShouldBeShow] = useState(false);
  const [activeNavElem, setActiveNavElem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const { width } = useWindowWidth();

  const toScrollRef = useRef(null);
  const headerRef = useRef(null);

  const MOBILE_WIDTH = 700;

  const showDataClickCallback = useCallback(
    (index, ref) => {
      if (activeNavElem === index) {
        setIsDataShouldBeShown(false);
        setActiveNavElem(null);
        headerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        setIsDataShouldBeShown(true);
        setActiveNavElem(index);
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    },
    [activeNavElem]
  );

  const burgerClickCallback = useCallback(() => {
    if (isBurgerShouldBeShown) {
      setIsBurgerShouldBeShow(false);
      setIsDataShouldBeShown(false);
      setActiveNavElem(null);
    } else {
      setIsBurgerShouldBeShow(true);
    }
  }, [isBurgerShouldBeShown]);

  useEffect(() => {
    if (width <= MOBILE_WIDTH) {
      setIsMobile(true);
      setActiveNavElem(null);
    } else setIsMobile(false);
  }, [width]);

  return (
    <header
      ref={headerRef}
      className="header"
      onMouseLeave={() => {
        !isMobile && setIsDataShouldBeShown(false);
      }}
    >
      {isMobile && (
        <>
          <input
            checked={isBurgerShouldBeShown}
            className="burger"
            id="burger"
            type="checkbox"
            readOnly
          />

          <label onClick={() => burgerClickCallback()} htmlFor="burger">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </>
      )}

      <nav>
        <ul className={!isMobile ? "header-ul not_mobile" : "header-ul mobile"}>
          {navNames.map((liText, index) => (
            <li
              className={
                isDataShouldBeShown && index === activeNavElem
                  ? "header-li active-li"
                  : "header-li"
              }
              ref={toScrollRef}
              key={"header-li" + index}
              onMouseMove={() => {
                if (!isMobile) {
                  setIsDataShouldBeShown(true);
                  setActiveNavElem(index);
                }
              }}
            >
              <div key={"header-li--item" + index} className="header-li--item">
                <>
                  <p>
                    <a href={"#" + index}>{liText}</a>
                  </p>
                  {isMobile && (
                    <>
                      <input
                        checked={
                          index === activeNavElem ? isDataShouldBeShown : false
                        }
                        className="checkbox"
                        id={"checkbox" + index}
                        type="checkbox"
                        readOnly
                      />
                      <label
                        onClick={() => {
                          showDataClickCallback(index, toScrollRef);
                        }}
                        htmlFor={"checkbox" + index}
                        className="show_sub"
                      ></label>
                    </>
                  )}
                </>
              </div>
              {!isMobile ? (
                index === activeNavElem && (
                  <DropdownMenu
                    key={"dropdown" + index}
                    index={activeNavElem}
                    isMobile={isMobile}
                  />
                )
              ) : (
                <DropdownMenu
                  key={"dropdown" + index}
                  index={index}
                  isDataShouldBeShown={isDataShouldBeShown}
                  isMobile={isMobile}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
