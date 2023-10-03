export const BACKEND_API =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:3001'
        : 'http://dma-alb-1252925442.ap-southeast-1.elb.amazonaws.com';
