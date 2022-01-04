import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "antd";
import { RiSearchLine } from "react-icons/ri";

const HeaderSearch = (props) => {
  const [autocompleteState, setAutocompleteState] = useState({});

  function linkHandleClick() {
    autocompleteState.query = "";
    props.setSearchHeader(false);
  }

  return (
    <div>
      <Input
        {...props.inputFocusProp}
        placeholder="Search..."
        prefix={
          <RiSearchLine className="site-form-item-icon da-text-color-black-80 da-text-color-dark-20" />
        }
      />

      <div className="da-header-search-result">
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              items.length > 0 && (
                <ul key={index}>
                  {items.map(
                    (item, index) =>
                      index < 4 && (
                        <li key={index} className="da-font-weight-500">
                          <Link to={item.url} onClick={linkHandleClick}>
                            {item.title}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )
            );
          })}
      </div>
    </div>
  );
};

export default HeaderSearch;
