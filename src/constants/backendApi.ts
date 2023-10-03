export const BACKEND_API =
    import.meta.env.NODE_ENV === 'production'
        ? 'http://dma-alb-1252925442.ap-southeast-1.elb.amazonaws.com'
        : 'http://localhost:3001';
