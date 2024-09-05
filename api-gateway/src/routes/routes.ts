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
        url: '/api/order/create',
        auth: true,
        rateLimit: {
            windowMs: 10 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:4002",
            changeOrigin: true,
            pathRewrite: {
                '^/api/order/create': '/order'
            },
        }
    },

    // {
    //     url: '/api/order',
    //     auth: true, 
    //     rateLimit: {
    //         windowMs: 10 * 60 * 1000,  
    //         max: 5  /
    //     },
    //     proxy: {
    //         target: "http://localhost:4002",
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/api/order/list': '/list'  
    //         },
    //     }
    // },
    {
        url: '/api/getProducts',
        auth: false,
        rateLimit: {
            windowMs: 30 * 60 * 1000,
            max: 20
        },
        proxy: {
            target: "http://localhost:4001",
            changeOrigin: true,
            pathRewrite: {
                '^/api/product': '/products'
            },
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
            target: "http://localhost:4001",
            changeOrigin: true,
            pathRewrite: {
                '^/api/product': '/product'
            },
        }
    }
];
