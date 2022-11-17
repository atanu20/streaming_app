// module.exports = {
//   reactStrictMode: true,
//   images: { domains: ['cdn.pixabay.com', 'rukminim1.flixcart.com'] },
//   env: {},
// };
// "eslint": "7.32.0",
// "eslint-config-next": "12.0.1"
// "eslint": "8.18.0",
//     "eslint-config-next": "12.1.6"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ['images.unsplash.com', 'openweathermap.org'],
  },
};
