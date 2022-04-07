import React from "react";

export default function SearchBar() {
  return (
    <div class="pa4-l">
      <form class="mw6 center pa1 br2-ns  cdn-search-form">
        <fieldset class="cf bn ma0 pa0">
          <input
            class="f6 b f5-l input-reset bn pl5 fl black-80 bg-white shadow-3 pa3 lh-solid w-100 w-75-m w-100-l cdn-search-bar"
            placeholder="Search for your favorite cdn..."
            type="text"
            name="search"
            value=""
            id="search"
          />
          <a type="submit link link-reset ">
            <i class="fa-solid fa-magnifying-glass cdn-search-icon pointer"></i>
          </a>
        </fieldset>
      </form>
    </div>
  );
}
