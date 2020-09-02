import React from "react";
import dataOnNavItems from "../../assets/data/dataOnNavItems";
import { useState } from "react";
import { useCallback } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";

const DropdownMenu = ({ activeNavElem, isMobile, index }) => {
  const [isSubDataShouldBeShown, setIsSubDataShouldBeShown] = useState(false);
  const [activeSubNavElem, setActiveSubNavElem] = useState(null);

  const toScrollRef = useRef(null);

  const clickCallback = useCallback(
    (liElemIndex, ref) => {
      if (activeSubNavElem === liElemIndex) {
        setActiveSubNavElem(null);
        setIsSubDataShouldBeShown(false);
      } else {
        setActiveSubNavElem(liElemIndex);
        setIsSubDataShouldBeShown(true);
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
    [activeSubNavElem]
  );

  useLayoutEffect(() => {
    setIsSubDataShouldBeShown(false);
    setActiveSubNavElem(null);
  }, [activeNavElem]);

  return (
    <div className={isMobile ? "data_on_hover_mobile" : "data_on_hover"}>
      <ul>
        {dataOnNavItems[index].map((liElem, liElemIndex) => (
          <li
            key={"dropdown_li" + index + liElemIndex}
            className="data_on_hover-li"
          >
            {!Array.isArray(liElem) ? (
              <p className="data_on_hover-p--bold">
                <a href={"#" + index + liElemIndex}>{liElem}</a>
              </p>
            ) : (
              liElem.map((subLiElem, subLiElemIndex) => (
                <React.Fragment key={"fragment" + index + subLiElemIndex}>
                  {subLiElemIndex === 0 && (
                    <p className="data_on_hover-p--bold">
                      <a href={"#" + index + liElemIndex}>{subLiElem}</a>
                    </p>
                  )}
                  {subLiElemIndex === 0 && isMobile && (
                    <>
                      <input
                        checked={
                          liElemIndex === activeSubNavElem
                            ? isSubDataShouldBeShown
                            : false
                        }
                        className="checkbox"
                        id={"checkbox" + liElemIndex + subLiElemIndex}
                        type="checkbox"
                        readOnly
                      />
                      <label
                        ref={toScrollRef}
                        onClick={() => {
                          clickCallback(liElemIndex, toScrollRef);
                        }}
                        htmlFor={"checkbox" + liElemIndex + subLiElemIndex}
                        className="show_sub"
                      ></label>
                    </>
                  )}
                  <p className="data_on_hover-p">
                    <a href={"#" + index + liElemIndex + subLiElemIndex}>
                      {subLiElem}
                    </a>
                  </p>
                </React.Fragment>
              ))
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
