"use strict";
import { LitElement, html, css } from "lit-element";
import "@polymer/iron-iconset-svg";
import "@polymer/iron-icon";
import "@polymer/paper-tooltip";
import "@01ht/ht-image";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTUserAvatar extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      css`
        #container {
          width: 100%;
          position: relative;
        }

        a {
          outline: none;
        }

        ht-image {
          overflow: hidden;
          border-radius: 50%;
        }

        #verified {
          display: flex;
          position: absolute;
          bottom: 0;
          right: 0;
        }

        iron-icon {
          border-radius: 50%;
          background: #fff;
          color: var(--accent-color);
        }

        [hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const { data, size, verifiedSize } = this;
    return html`
      <iron-iconset-svg size="24" name="ht-user-avatar">
        <svg>
          <defs>
            <g id="check-circle"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g>
          </defs>
        </svg>
      </iron-iconset-svg>
      <div id="container" style="width:${size}px;height:${size}px">
        <a href="/${data.isOrg ? "organization" : "user"}/${data.nameInURL}/${
      data.isOrg ? `${data.organizationNumber}` : `${data.userNumber}`
    }">
      <ht-image placeholder="${
        window.appConfig.cloudinary.url
      }/c_scale,f_auto,h_32,w_32/v${data.avatar.version}/${
      data.avatar.public_id
    }.${data.avatar.format}" image="${
      window.appConfig.cloudinary.url
    }/c_scale,f_auto,h_${size * 2},w_${size * 2}/v${data.avatar.version}/${
      data.avatar.public_id
    }.${
      data.avatar.format
    }" style="${`width: ${size}px;height:${size}px;`}" .altText=${
      data.displayName
    }></ht-image>
          <div id="verified">
            <iron-icon icon="ht-user-avatar:check-circle" ?hidden="${!data.verified}" style="${`width: ${verifiedSize}px;height:${verifiedSize}px;`}"></iron-icon>
          <paper-tooltip position="right" animation-delay="0" offset="4" ?hidden="${!data.verified}">Проверенный пользователь</paper-tooltip>
          </div>
        </a>
      </div>
`;
  }

  static get properties() {
    return {
      data: { type: Object },
      size: { type: Number },
      verifiedSize: { type: Number }
    };
  }

  constructor() {
    super();
    this.data = {};
    this.size = 42;
    this.verifiedSize = 16;
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has("data")) {
      if (this.data.uid === undefined) return false;
    }
    return true;
  }
}

customElements.define("ht-user-avatar", HTUserAvatar);
