import Browser from '@parameter1/base-cms-marko-web/browser';

/**
 * Dynamically import the carousel component. This ensures it will only
 * be included when needed by the page.
 */
const MyCoolCarousel = () => import(/* webpackChunkName: "my-cool-carousel" */ './my-cool-carousel.vue');

Browser.register('MyCoolCarousel', MyCoolCarousel);

export default Browser;
