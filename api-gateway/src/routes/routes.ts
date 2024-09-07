export const ROUTES = [
    {
        url: '/api/auth/',
        auth: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000, 
            max: 10
        },
        proxy: {
            target: "http://localhost:4002",
            changeOrigin: true,
        }
    },
    {
        url: '/api/user/',
        auth: true,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:4002",
            changeOrigin: true
        }
    },
    {
        url: '/api/products',
        auth: false,
        rateLimit: {
            windowMs: 30 * 60 * 1000,
            max: 20
        },
        proxy: {
            target: "http://localhost:4000",
            changeOrigin: true,
        }
    },
    {
        url: '/api/product',
        auth: true,
        rateLimit: {
            windowMs: 30 * 60 * 1000,
            max: 20
        },
        proxy: {
            target: "http://localhost:4000",
            changeOrigin: true,
        }
    },
    {

        url: '/api/wishlist',
        auth: true,
        rateLimit: {
            windowMs: 10 * 60 * 1000,
            max: 20
        },
        proxy: {
            target: "http://localhost:4004",
            changeOrigin: true,
        }
    }
];
