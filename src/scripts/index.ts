import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

const rampContainer = document.querySelector('#ramp-node');
const cryptoAssetSelect = document.querySelector('#crypto-select') as HTMLSelectElement;
const fiatValueInput = document.querySelector('#eur-value') as HTMLInputElement;

const buttons = {
  overlay: {
    desktop: document.querySelector('#launch-desktop'),
    mobile: document.querySelector('#launch-mobile'),
  },
  hosted: {
    desktop: document.querySelector('#launch-desktop-new-tab'),
    mobile: document.querySelector('#launch-mobile-new-tab'),
  },
  embedded: {
    desktop: document.querySelector('#launch-desktop-selected-element'),
    mobile: document.querySelector('#launch-mobile-selected-element'),
  },
};

const basicRampConfig = {
  hostAppName: 'Demo app',
  hostLogoUrl: 'https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg',
  enabledFlows: ['ONRAMP','OFFRAMP'],
  url: 'https://app.demo.ramp.network',
  hostApiKey: 'j4z5gn7eh7uvbdgpd7c7wgkq4msuqrgs4xq4jutv',
  fiatCurrency: 'EUR',
};

function attachListeners(): void {
  buttons.overlay.desktop?.addEventListener('click', () => launchOverlayMode('desktop'));
  buttons.overlay.mobile?.addEventListener('click', () => launchOverlayMode('mobile'));

  buttons.hosted.desktop?.addEventListener('click', () => launchHostedMode('hosted-desktop'));
  buttons.hosted.mobile?.addEventListener('click', () => launchHostedMode('hosted-mobile'));

  buttons.embedded.desktop?.addEventListener('click', () => launchEmbeddedMode('embedded-desktop', rampContainer as HTMLElement));
  buttons.embedded.mobile?.addEventListener('click', () => launchEmbeddedMode('embedded-mobile', rampContainer as HTMLElement));
}

function launchOverlayMode(mode: 'desktop' | 'mobile'): RampInstantSDK {
  return new RampInstantSDK({
    ...basicRampConfig,
    defaultAsset:  cryptoAssetSelect?.value ?? undefined,
    fiatValue: fiatValueInput.value,
    variant: mode,
  }).show();
}

function launchHostedMode(mode: 'hosted-desktop' | 'hosted-mobile'): RampInstantSDK {
  return new RampInstantSDK({
    ...basicRampConfig,
    defaultAsset:  cryptoAssetSelect?.value ?? undefined,
    fiatValue: fiatValueInput.value,
    variant: mode,
  }).show();
}

function launchEmbeddedMode(mode: 'embedded-desktop' | 'embedded-mobile', node: HTMLElement): RampInstantSDK {
  removeAllChildNodes(node);

  return new RampInstantSDK({
    ...basicRampConfig,
    defaultAsset:  cryptoAssetSelect?.value ?? undefined,
    fiatValue: fiatValueInput.value,
    variant: mode,
    containerNode: node,
  }).show();
}

function removeAllChildNodes(parent: Element) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

attachListeners();
