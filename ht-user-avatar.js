"use strict";
import { LitElement, html } from "@polymer/lit-element";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-tooltip";
import "ht-image";
class HTUserAvatar extends LitElement {
  render({ data, size, verifiedSize }) {
    return html`
      <style>
        :host {
          display: block;
          position:relative;
          box-sizing:border-box;
        }

        #container {
          width:100%;
          position:relative;
        }

        ht-image {
          overflow:hidden;
          border-radius:50%;
          width:${size}px;
          height:${size}px;
        }

        iron-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          border-radius: 50%;
          background: #fff;
          color: var(--accent-color);
          width:${verifiedSize}px;
          height:${verifiedSize}px;
        }

        [hidden] {
          display: none;
        }
      </style>
      <iron-iconset-svg size="24" name="ht-user-avatar">
        <svg>
          <defs>
            <g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
          </defs>
        </svg>
      </iron-iconset-svg>
      <div id="container">
        <a href="/user/${data.nickname}">
          <ht-image placeholder=${data.photoURL} image=${
      data.photoURL
    }></ht-image>
          <iron-icon icon="ht-user-avatar:check-circle" hidden?=${!data.verified}></iron-icon>
          <paper-tooltip position="right" animation-delay="0" offset="4" hidden?=${!data.verified}>Проверенный пользователь</paper-tooltip>
        </a>
      </div>
`;
  }

  static get is() {
    return "ht-user-avatar";
  }

  static get properties() {
    return {
      data: Object,
      size: Number,
      verifiedSize: Number
    };
  }

  constructor() {
    super();
    this.data = {};
    this.size = 42;
    this.verifiedSize = 16;
  }
}

customElements.define(HTUserAvatar.is, HTUserAvatar);
