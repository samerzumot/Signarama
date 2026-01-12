# Shopify Theme Integration Guide

This repository is optimized for use as a custom Shopify theme. Follow these steps to import your custom Signarama website into your Shopify store.

## Option 1: Shopify GitHub Integration (Recommended)

Shopify can track a GitHub repository and automatically update your theme whenever you push changes.

1.  **Push this code to GitHub**: Create a new repository and push the contents of this folder.
2.  **Connect to Shopify**:
    *   In your Shopify Admin, go to **Online Store > Themes**.
    *   Click **Add theme > Connect from GitHub**.
    *   Log in to GitHub and select the repository.
    *   Select the root of the repository as the theme path (Shopify will find the `theme/` directory).
3.  **Vite Build Assets**:
    *   Before pushing, ensure you run `npm run build`.
    *   The compiled assets in the `dist/` folder should be copied into the `theme/assets` directory to be served by Shopify.

## Option 2: Manual Upload

1.  **Zip the `theme` folder**: Compress the contents of the `theme/` directory into a `.zip` file.
2.  **Upload to Shopify**:
    *   Go to **Online Store > Themes**.
    *   Click **Add theme > Upload zip file**.

## Assets Mapping

To ensure the custom JavaScript and CSS work within Shopify, the `theme.liquid` layout file should be updated to reference Shopify's asset URL filter:

```liquid
{{ 'main.js' | asset_url | script_tag }}
{{ 'style.css' | asset_url | stylesheet_tag }}
```

The product logic in `src/data.js` has already been updated to use your real Shopify CDN image links.
