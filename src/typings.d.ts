/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* Fix for echarts ES module compatibility */
declare module 'echarts' {
  const echarts: any;
  export default echarts;
}
