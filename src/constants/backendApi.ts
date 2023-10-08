export const BACKEND_API = import.meta.env.PROD
    ? 'http://dma-alb-1252925442.ap-southeast-1.elb.amazonaws.com'
    : 'http://localhost:3001';
