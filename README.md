# Marko + Vue Example

- Marko components are used for rendering server-side HTML and inline client-side JavaScript
- Client-side (web-only) Vue components must be registered with the framework's `Browser` object and loaded from Marko templates using `marko-web-browser-component`
- The `marko-web-browser-component` will render in-line JavaScript (server-side) that the framework's browser handler will interpret and replace with the requested Vue component
- Once the Vue instance is loaded, it will function like any other Vue component

## Creating/registering a Vue component.
Create the Vue component within the site's `browser` folder. For example, the `my-cool-carousel.vue` component:
```vue
<template>
  <div :class="blockName">
    <h3>Vue component: My cool carousel</h3>
    <image-wrapper
      v-for="image in images"
      :key="image.id"
      :src="image.src"
      :alt="image.alt"
      :caption="image.caption"
      :credit="image.credit"
      :block-name="blockName"
    />
  </div>
</template>

<script>
// once inside the container component, sub-components can be directly imported
import ImageWrapper from './my-cool-carousel/image-wrapper.vue';

export default {
  components: { ImageWrapper },

  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    blockName: 'my-cool-carousel',
  }),
};
</script>
```

Then register the component with the framework's `Browser` object, found in the `browser/index.js`
```js
import Browser from '@parameter1/base-cms-marko-web/browser';

/**
 * Dynamically import the carousel component. This ensures it will only
 * be included when needed by the page.
 */
const MyCoolCarousel = () => import(/* webpackChunkName: "my-cool-carousel" */ './my-cool-carousel.vue');

Browser.register('MyCoolCarousel', MyCoolCarousel);

export default Browser;
```

## Loading the Vue component from Marko

Once registered, the Vue component can be called/loaded in any Marko template or component using `marko-web-browser-component`. Data can be passed to the Vue component via the `props` object input parameter.

For example, in our `templates/content.marko` template
```marko
<!-- JS statements within marko files must start with a dollar sign ($) -->
$ const { id, type, pageNode } = input;

<marko-web-document>
  <@container>
    <@page>
      <marko-web-resolve-page|{ resolved: content }| node=pageNode>
        <!-- because this is rendered in node, the log will display in the _server_ terminal, not in the browser -->
        $ console.log(content);
        <h1>${content.get("name")}</h1>
        <!-- pass the content images array to the browser component -->
        <!-- this simply JSON encodes the data and passes it as a prop to the Vue component -->
        <!-- once loaded in the browser, a Vue instance will replace this element and ingest the prop data -->
        <!-- the instance now stands alone and can import it's own client-side components, perform operations, manage it's own state, etc. -->
        <!-- essentially this is the "hand-off" from the server to the client/browser -->

        $ const images = content.getAsArray("images.edges").map((edge) => edge.node);
        <marko-web-browser-component name="MyCoolCarousel" props={ images } />
        <!--
          when viewing the rendered page source, you'll notice that the `marko-web-browser-component` renders
          inline javascript with a wrapping div. the core framework code will execute this script and
          replace the wrapping div with the Vue component.
        -->
      </marko-web-resolve-page>
    </@page>
  </@container>
</marko-web-document>
```

Under the hood, the `marko-web-browser-component` is merely encoding the props and rendering some framework-specific inline JS code, as you can see in `@parameter1/base-cms-marko-web/components/browser-component.marko`:
```marko
import { randomElementId } from '@parameter1/base-cms-utils';

$ const id = randomElementId({ prefix: 'vue' });
$ const props = JSON.stringify(input.props || {});
$ const contents = `<script>CMSBrowserComponents.loadComponent('#${id}', '${input.name}', ${props});</script>`;

<div id=id>
  <if(input.renderBody)>
    <${input.renderBody} />
  </if>
  $!{contents}
</div>
```

When rendered from the server and deliverred to the browser, the code will look similar to the below. You can see this by viewing the raw page source (tip: add `pretty=true` to the query string when viewing the source. This will pretty-print the HTML):
```html
<body>
  <div class="document-container">
    <main class="page">
      <h1>It's prime time for air disc brakes, with nearly 2 in five owner-operators running them on the tractor</h1>
      <div id="vue-1616766399918-649">
        <script>
          CMSBrowserComponents.loadComponent('#vue-1616766399918-649', 'MyCoolCarousel', {
            "images": [{
              "id": "605ccdf6e2517526008b4581",
              "src": "https://img.overdriveonline.com/files/base/randallreilly/all/image/2021/03/Air_disc_brakes_market_penetration_2005_20.605ccdf6560e6.png?auto=format%2Ccompress&q=70",
              "alt": "air disc brakes market penetration 2005-2020",
              "caption": "Bendix Product Director for air brakes Keith McComsey laid out the numbers you see in the chart here, his best estimate for heavy-duty market penetration in five-year increments starting with less than a single percent of all foundation brakes in North America in 2005 to about 40% today and rising fast. Added Nicole Oreskovic: “We’ve followed Europe a bit,” where disc brakes in heavy trucks have “been standard since the early 1990s. I would say that, globally, the standard foundation brake is an air-disc brake” in heavy duty trucks.",
              "credit": null,
              "__typename": "AssetImage"
            },
              // more images here...
            ]
          });
        </script>
      </div>
    </main>
  </div>
  <script src="http://localhost:29716/livereload.js" async></script>
</body>
```

The `CMSBrowserComponents.loadComponent` function will execute and replace the HTML above with the mouted Vue component instance. You can see this by inspecting the result using your browser's dev tools. You'll notice that the rendered DOM now represents the Vue component's structure _not_ the raw HTML above:
```html
<div class="my-cool-carousel">
  <h3>Vue component: My cool carousel</h3>
  <div class="my-cool-carousel__image-wrapper">
    <img
      src="https://img.overdriveonline.com/files/base/randallreilly/all/image/2021/03/Air_disc_brakes_market_penetration_2005_20.605ccdf6560e6.png?auto=format%2Ccompress&amp;q=70"
      alt="air disc brakes market penetration 2005-2020"
      class="my-cool-carousel__image"
    >
    <p class="my-cool-carousel__caption">Bendix Product Director for air brakes Keith McComsey laid out the numbers you
      see in the chart here, his best estimate for heavy-duty market penetration in five-year increments starting with
      less than a single percent of all foundation brakes in North America in 2005 to about 40% today and rising fast.
      Added Nicole Oreskovic: “We’ve followed Europe a bit,” where disc brakes in heavy trucks have “been standard since
      the early 1990s. I would say that, globally, the standard foundation brake is an air-disc brake” in heavy duty
      trucks.
    </p>
    <!---->
  </div>
</div>
```
